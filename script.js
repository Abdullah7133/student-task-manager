document.addEventListener("DOMContentLoaded", () => {
  const taskTitleInput = document.getElementById("task-title");
  const taskDescInput = document.getElementById("task-desc");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  // Load existing tasks from localStorage or initialize an empty array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Render tasks on initial load
  renderTasks();

  addTaskBtn.addEventListener("click", () => {
    const titleText = taskTitleInput.value.trim();
    const descText = taskDescInput.value.trim();

    if (titleText !== "") {
      const newTask = {
        id: Date.now(),
        title: titleText,
        description: descText,
        completed: false
      };
      
      tasks.push(newTask);
      saveAndRender();
      
      // Clear input fields
      taskTitleInput.value = "";
      taskDescInput.value = "";
    }
  });

  function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  function renderTasks() {
    taskList.innerHTML = "";
    
    tasks.forEach(task => {
      const li = document.createElement("li");
      
      // Apply completed class if the task is finished
      if (task.completed) {
        li.classList.add("completed");
      }

      // 1. Checkbox for completion status
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("task-checkbox");
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveAndRender();
      });

      // 2. Container for text (title and description)
      const textContainer = document.createElement("div");
      textContainer.classList.add("task-content");

      const titleEl = document.createElement("strong");
      titleEl.textContent = task.title;
      textContainer.appendChild(titleEl);

      if (task.description !== "") {
        const descEl = document.createElement("p");
        descEl.textContent = task.description;
        textContainer.appendChild(descEl);
      }

      // Append elements to list item
      li.appendChild(checkbox);
      li.appendChild(textContainer);
      taskList.appendChild(li);
    });
  }
});