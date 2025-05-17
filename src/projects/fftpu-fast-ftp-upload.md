---
title: FFTPU - Fast FTP Upload for macOS
description: A tool that allows you to quickly upload files to an FTP server and get back a URL to the file.
repo: https://github.com/kaskajp/fftpu
status: Actively Maintained
date: 2025-04-18
---

FFTPU is a macOS menu bar tool that allows you to quickly upload files to an FTP server and get back a URL to the file. It's a simple tool that uses `curl` to upload files to an FTP server. It's designed to be a quick and easy way to upload files to an FTP server without having to open a browser or other application.

FFTPU should be paired with a simple web server that can serve the uploaded files, if you want to share the files with others. There are many options for this, in my case I'm using a [simple Laravel application](https://github.com/kaskajp/files).

## Features

- Upload files to an FTP server with a simple drag and drop interface
- Show a URL to the file when the upload is complete
- Copy the URL to the clipboard when the upload is complete
- App settings for the FTP server and web server details
  - FTP server URL
  - FTP username
  - FTP password
  - FTP port
  - SFTP or FTP
  - Web server URL

## Tech Stack

- Swift
- SwiftUI
- SwiftData
- curl

## AI Assistance

This application is exclusively developed with Cursor AI, using `claude-3.7-sonnet` as the model. This project page was used as the initial prompt to build the application (everything up until this point).

## Time to Build

This project was built in 2.5 hours (for the core functionality), including the time to write this project page. The challenges and solutions were added as I was building the project.

## Screenshots

![Application](/assets/images/projects/fftpu-app.jpg)

![Settings](/assets/images/projects/fftpu-settings.jpg)

## Development Process

These are the major steps I took to build the application, listing the challenges I encountered and how I solved them.

- The first prompt resulted in 4 minor issues within FTPService.swift. These were quickly resolved by just copy and pasting the issues from Xcode to the chat.
- After fixing the issues, I encountered 3 other minor issues in MenuBarView.swift. These were also quickly resolved by copy and pasting the issues from Xcode to the chat.
- The settings were misaligned in the view. This was fixed with the prompt `The settings in the settings view are misaligned` along with a screenshot of the issue. A few more messages were exchanged to get the settings looking just right.
![Settings misaligned](/assets/images/projects/fftpu-settings-misaligned.jpg)
- If the settings view was left open and the user opened other windows on top, the settings view would not get its focus back when the user clicked on the settings button again. This was tricky for the AI to understand and it got lost and started suggesting unnecessarily complex solutions that did not work. Back and forth conversations for 10 minutes or so were needed to get this to work properly.
- The drop zone was not clickable, allowing only a drag and drop interface. This was fixed with the prompt `The file drop zone should be clickable as well, to select a file without dragging and dropping.`.
- The drop zone was not accessible as the menu was hidden when clicking outside of it. I started with the prompt `I can't drag files to the drop zone, as the menu disappears when I click somewhere else, and the menu doesn't open when holding a file on top of the menu bar icon.`. This prompt led to the AI trying to implement a solution that allowed files to be dropped directly onto the menu bar icon. The application was turned into a regular window application and things started to get out of hand, at which point I decided to discard the changes and open a new chat. In the new chat, I got started with the prompt `I need to be able to drag and drop files on top of the menu bar icon. The green plus cursor should be shown while I'm holding a file on top of it.`. This led to some issues, but the AI was able to resolve them by copying and pasting the issues from Xcode.
- At this point I realized that I actually don't need the drop zone inside the popover, since I can just drag files to the menu bar icon. So I decided to remove it. But the below screenshot shows the progress before that change was made.
![Application progress](/assets/images/projects/fftpu-progress-dropzone.jpg)
- The next prompt was `Since I can now drag and drop files to the menu bar icon, I don't need the drop zone inside the app. Instead, let's add a plus button on the left side of the settings button for the browse for file functionality.`. This prompt worked well but it did add some unwanted empty space between the menu bar and the application. That was resolved with the prompt `There's too much empty space between the menu bar and the application when it's opened.`.
- FTP path was missing from the settings view. Used the prompt `The settings view is missing FTP path to decide where the uploaded files should be placed.` which it struggled a bit with, required a few more messages to fix issues that were added to the code. The issues were solved just by pasting them into the chat.
- At this point I tested the SFTP functionality for the first time and it results in it showing an obscure error with a little red warning icon. Turns out that the reason for this was that it had added the web server setting as a required field. So when left empty it wouldn't even try to connect.
![SFTP error](/assets/images/projects/fftpu-progress-uploads.jpg)
- To continue I gave it the prompt `When I try to upload a file, the file is listed with an error icon and I get these errors. {errors}` along with the screenshot above. It then added some debugging logs as well as a test connection button in the settings view. When uploading a file after this, I encountered the error `SWIFT TASK CONTINUATION MISUSE: uploadFile(localURL:uploadedFile:) leaked its continuation!`. I gave it the error and then I could continue the testing.
- At this point it things got a bit tricky. It complained that my `curl` did not support SFTP. This led to me instructing the AI to actually get rid of all the fallback logic and settings for SFTP, to simplify the code and since I don't actually need to use insecure FTP and don't want to encourage it either. Updating `curl` on your machine now became a requirement for this project. The AI did go down a rabbit hole here, starting to implement tests and some other logic that wasn't really necessary for fixing the issues. Eventually I had to discard the changes and start over with a new chat.
- New approach: Get rid of insecure FTP logic first and then add a new optional setting for setting the `curl` location. This worked a lot better, being more direct about how to work with curl helped in general. At this point to application works as expected and whatever comes next can be seen as a bonus or finetuning, but not necessary for the core functionality.

## Future Plans

This application is actively maintained. I intend to add a few more features as well as refine the UI and polish the UX, but the core functionality is complete.

See issues in the [GitHub repository](https://github.com/kaskajp/fftpu/issues).