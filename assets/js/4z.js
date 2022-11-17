const scene = document.getElementById("scene");
const innerScene = document.getElementById("inner-scene");
const commandsContainer = document.getElementById('commands');
const prompt = document.getElementById('prompt');
const commands = ["help", "about", "contact", "programs", "open", "clear"];
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
        line.innerHTML = "I'm a dev from Sweden.";
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