---
title: Debian Mirror Setup Guide for Raspberry Pi 5
---

# Debian Mirror Setup Guide for Raspberry Pi 5

A step-by-step guide for hosting a Debian mirror on a Raspberry Pi 5 with Caddy.

## Install required packages
```
sudo apt update
sudo apt install debmirror rsync gnupg
```

## Create mirror directory
```
sudo mkdir -p /mnt/mirrors
sudo chown -R $USER:$USER /mnt/mirrors
```
Replace `/mnt/mirrors` with the location you want to store the data in.

## Import the Debian archive keys
These are needed to verify repository metadata.
```
sudo apt install debian-archive-keyring
```
debmirror uses GPG automatically from debian-archive-keyring.gpg.

## Import the Debian archive keys for debmirror
```
mkdir -p ~/.gnupg
chmod 700 ~/.gnupg

# Import all Debian archive keys into the trustedkeys.gpg that debmirror expects
gpg --no-default-keyring \
    --keyring ~/.gnupg/trustedkeys.gpg \
    --import /usr/share/keyrings/debian-archive-keyring.gpg

# Optional: verify that keys are there
gpg --no-default-keyring \
    --keyring ~/.gnupg/trustedkeys.gpg \
    --list-keys
```
That `debian-archive-keyring.gpg` file that we import is where Debian ships all the official archive keys.

## Create your mirror script
Create the script:
```
vi ~/sync-debian.sh
```
Paste this (this mirrors stable + testing + unstable, amd64, no source):
```
#!/bin/bash

BASE="/mnt/mirrors"

debmirror "$BASE" \
  --host=ftp.se.debian.org \
  --root=debian \
  --method=rsync \
  --dist=stable,stable-updates,testing,testing-updates,unstable \
  --section=main,contrib,non-free-firmware \
  --arch=amd64,arm64,armhf \
  --rsync-extra=none,trace \
  --getcontents \
  --progress \
  --retry=5 \
  --ignore-small-errors \
  --keyring /usr/share/keyrings/debian-archive-keyring.gpg
```
Replace `/mnt/mirrors` with your location and choose your architectures (`--arch`).

Save, then:
```
chmod +x ~/sync-debian.sh
```

### Notes
- rsync is preferred, mirrors faster and avoids HTTP issues.
- --ignore-small-errors is safe for home mirrors (Debian recommends it for partial mirrors).

## Run the initial sync (this will take hours)
```
./sync-debian.sh
```

You may see:
- “Ignoring missing Release file” → normal when syncing multiple dists.
- “Retry X/5” → debmirror being cautious.
- **Disk usage estimate**: ~400–600 GB (inaccurate if the config is changed of course).


## Add a systemd timer (instead of cron)
Create the service:
```
sudo vi /etc/systemd/system/debmirror.service
```

Paste:
```
[Unit]
Description=Sync Debian Mirror
Wants=debmirror.timer

[Service]
Type=oneshot
User=YOURUSERNAME
ExecStart=/home/YOURUSERNAME/sync-debian.sh
```
Replace YOURUSERNAME in both places.

Create timer:
```
sudo vi /etc/systemd/system/debmirror.timer
```

Paste:
```
[Unit]
Description=Daily Debian Mirror Sync

[Timer]
OnCalendar=03:30
Persistent=true

[Install]
WantedBy=timers.target
```

Enable + start:
```
sudo systemctl daemon-reload
sudo systemctl enable --now debmirror.timer
```

Check:
```
systemctl list-timers | grep debmirror
```

## Configure Caddy to serve the mirror
```
deb.example.com {
    root * /mnt/mirrors
    file_server browse
}
```

Reload:
```
sudo systemctl reload caddy
```
Caddy will automatically issue/renew HTTPS certificates.

## Test the mirror from a client machine
Edit `/etc/apt/sources.list` on a test Debian/Ubuntu machine:
```
deb https://deb.example.com stable main contrib non-free-firmware
deb https://deb.example.com testing main contrib non-free-firmware
deb https://deb.example.com unstable main contrib non-free-firmware
```

Then:
```
sudo apt update
```
If it works, you're done!

### Optional: Also mirror security updates
If you want security repos too, replace --dist=... with:
```
--dist=stable,stable-security,testing,testing-security,unstable
```

This however, is not recommended by Debian.

## Adding your mirror to the mirror list

The mirror list can be found here https://www.debian.org/mirror/ftpmirror. In order to get listed here, there are some additional things you need to do, such as syncing 4 times every 24 hours. Refer to the information on the page.