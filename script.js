document.addEventListener("DOMContentLoaded", () => {
  const taskTitleInput = document.getElementById("task-title");
  const taskDescInput = document.getElementById("task-desc");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  addTaskBtn.addEventListener("click", () => {
    const title = taskTitleInput.value.trim();
    const desc = taskDescInput.value.trim();

    if (title !== "") {
      const li = document.createElement("li");

      const contentDiv = document.createElement("div");
      const titleElem = document.createElement("strong");
      titleElem.textContent = title;
      contentDiv.appendChild(titleElem);

      if (desc !== "") {
        const descElem = document.createElement("p");
        descElem.textContent = desc;
        contentDiv.appendChild(descElem);
      }

      // Create a delete button for the task
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
      });

      li.appendChild(contentDiv);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);

      // Reset input fields
      taskTitleInput.value = "";
      taskDescInput.value = "";
    }
  });
});
