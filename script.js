document.addEventListener("DOMContentLoaded", () => {
  const taskTitleInput = document.getElementById("task-title");
  const taskDescInput = document.getElementById("task-desc");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const taskSearchInput = document.getElementById("task-search");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let searchQuery = "";

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
      
      taskTitleInput.value = "";
      taskDescInput.value = "";
    }
  });

  taskSearchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderTasks();
  });

  function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  function renderTasks() {
    taskList.innerHTML = "";
    
    const filteredTasks = tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery) || 
      task.description.toLowerCase().includes(searchQuery)
    );

    filteredTasks.forEach(task => {
      const li = document.createElement("li");
      
      if (task.completed) {
        li.classList.add("completed");
      }

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("task-checkbox");
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveAndRender();
      });

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

      // Delete button logic
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveAndRender();
      });

      li.appendChild(checkbox);
      li.appendChild(textContainer);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }
});