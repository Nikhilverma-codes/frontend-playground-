document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  // Load tasks from localStorage, or default to an empty array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Render initial tasks on load
  tasks.forEach((task) => renderTask(task));

  // Add Task Event Listener
  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = ""; // Clear input field
  });

  // Render Task Function
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    
    li.innerHTML = `
      <span>${task.text}</span>
      <button>delete</button>
    `;

    // Toggle complete on click (excluding the button click)
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    // Delete task button listener 
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the 'completed' toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id); // Filter out the deleted task
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  // Sync tasks array with localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});