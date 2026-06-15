document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  // Load tasks from localStorage, or start with an empty array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Display existing tasks on load
  tasks.forEach((task) => renderTask(task));

  // Add task event listener
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

  // Function to generate and control a single task item on the UI
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
                    <span>${task.text}</span>
                    <button>delete</button>
                `;

    // Toggle completion event (Clicking the row)
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return; // Ignore if user clicked delete button

      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    // Delete task event (Clicking the delete button)
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the row click event from firing

      // FIXED: Keeps everything EXCEPT the task we want to delete
      tasks = tasks.filter((t) => t.id === task.id);

      li.remove();
      saveTasks();
    });

    // Append the newly created element to the list
    todoList.appendChild(li);
  }

  // Function to save the tasks array into browser storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
