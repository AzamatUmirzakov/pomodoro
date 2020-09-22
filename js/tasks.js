// ✅tasks✅

let addButton = document.querySelector("button.task-push");
let tasksList = document.querySelector("div.tasks-list");
let tasksButton = document.querySelector("img.tasks-button");

tasksButton.addEventListener("click", () => {
  if (tasksButton.dataset.action == "show") {
    tasksButton.dataset.action = "hide";
    document.querySelector("section.tasks").style.right = "0px";
  } else {
    tasksButton.dataset.action = "show";
    document.querySelector("section.tasks").style.right = "";
    tasksButton.src = "images/checkbox.svg";
  }
});

addButton.addEventListener("click", () => {
  let content = addButton.previousElementSibling.value;
  if (content == "") {
    return false;
  }
  let taskItem = document.createElement("div");
  taskItem.className = "task-item";
  taskItem.append(document.createElement("p"));
  taskItem.querySelector("p").innerHTML = content;
  tasksList.append(taskItem);
  let tick = document.createElement("button");
  tick.className = "task-done";
  tick.append(document.createElement("img"));
  tick.querySelector("img").src = "images/checked.svg";
  taskItem.append(tick);
  addButton.previousElementSibling.value = "";
  taskItem.style.opacity = 1;
});

addButton.previousElementSibling.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    addButton.dispatchEvent(new Event("click"));
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest("button") || e.target.tagName == "BUTTON") {
    if (e.target.closest("button").classList.contains("task-done")) {
      e.target.closest("div.task-item").classList.toggle("done");
    }
  }
});
