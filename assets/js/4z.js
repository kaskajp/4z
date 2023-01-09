const scene = document.getElementById("scene");
const innerScene = document.getElementById("inner-scene");
const commandsContainer = document.getElementById('commands');
const prompt = document.getElementById('prompt');
const commands = ["help", "about", "contact", "programs", "open", "clear", "pdfjeff"];
const programs = ["pdfjeff", "saiseislider", "donatello"];

prompt.focus();
prompt.onblur = function () {
  setTimeout(function () {
    prompt.focus();
  });
};

prompt.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let command = document.createElement("div");
        command.classList.add("command");
    let line = document.createElement("div");
        line.classList.add("line");
    line.innerHTML = "guest@4z.nu:$~ " + prompt.value;
    command.appendChild(line);

    line = document.createElement("div");
    line.classList.add("line");
    if(prompt.value === "") {
      line.innerHTML = prompt.value;
      command.appendChild(line);
    }
    else if (!commands.includes(prompt.value.split(" ")[0])) {
      line.innerHTML = prompt.value + ": Command not found. Try 'help' to get started.";
      command.appendChild(line);
    }

    switch (prompt.value.split(" ")[0]) {
      case "help":
        line.innerHTML = "Commands: " + commands.join(", ");
        command.appendChild(line);
        break;
      case "about":
        line.innerHTML = "This is just a fun little side thing. Whenever I create a tool that I need for some reason, I add it to this site so I can acccess it from anywhere. Feel free to use any of the tools on this site, but please don't abuse them.";
        command.appendChild(line);
        break;
      case "contact":
        line.innerHTML = '<a href="https://github.com/kaskajp">GitHub</a>, <a href="https://twitter.com/yonasu">@yonasu</a>';
        command.appendChild(line);
        break;
      case "programs":
        line.innerHTML = "Programs: " + programs.join(", ") + ".<br>Type open [program] to open a program.";
        command.appendChild(line);
        break;
      case "open":
        if(!prompt.value.split(" ")[1]) {
          line.innerHTML = "open: Missing argument. Type 'programs' to get a list of programs.";
          command.appendChild(line);
        } else if (!programs.includes(prompt.value.split(" ")[1])) {
          line.innerHTML = prompt.value + ": Program not found. Try 'programs' to get started.";
          command.appendChild(line);
        }

        if (prompt.value.split(" ")[1] === "pdfjeff") {
          window.open("https://github.com/kaskajp/pdfjeff", "_blank");
        } else if (prompt.value.split(" ")[1] === "saiseislider") {
          window.open("https://github.com/kaskajp/saisei-slider", "_blank");
        } else if (prompt.value.split(" ")[1] === "donatello") {
          window.open("https://github.com/kaskajp/Donatello", "_blank");
        }
        break;
      case "pdfjeff":
        if(!prompt.value.split(" ")[1]) {
          line.innerHTML = "pdfjeff: Missing argument. Type 'pdfjeff [url_to_pdf]' to generate images.";
          command.appendChild(line);
        }
        else {
          let url = prompt.value.split(" ")[1];
          post("https://4z.nu/pdfjeff/", {pdf: url}).then((data) => {
            const response = JSON.parse(data);
            const intervalProcess = setInterval(() => {
              get("https://4z.nu/pdfjeff/?id=" + response.id).then((data) => {
                console.log(data);
                const getResponse = JSON.parse(data);
                if(getResponse.status === "done") {
                  let images = getResponse.images;
                  for (let i = 0; i < images.length; i++) {
                    let img = document.createElement("img");
                    img.src = "https://4z.nu/pdfjeff/" + images[i];
                    img.classList.add("image-small");
                    command.appendChild(img);
                  }
                  commandsContainer.appendChild(command);
                  commandsContainer.scrollTop = commandsContainer.scrollHeight;
                  prompt.value = "";

                  clearInterval(intervalProcess);
                }
                else if (getResponse.status === "error") {
                  clearInterval(intervalProcess);
                }
              });
            }, 300);
          });

        }
        break;
      case "clear":
        commandsContainer.innerHTML = "";
        break;
    }

    if(prompt.value !== "clear") {
      commandsContainer.appendChild(command);
    }

    scene.scrollTop = innerScene.scrollHeight;

    prompt.value = "";
    prompt.focus();
  }
});

document.querySelectorAll(".theme-link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.className = "theme-" + el.getAttribute("data-theme");
  });
});