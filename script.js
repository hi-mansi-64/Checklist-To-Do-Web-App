const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const toggle = document.getElementById('dark-mode-toggle');
const body = document.body;

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? "checked" : ""}>
        <span>${task.text}</span>
      </div>
      <button onclick="deleteTask(${index})">X</button>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  loadTasks();
}

function toggleTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// Dark mode toggle
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});

document.addEventListener("DOMContentLoaded", loadTasks);
