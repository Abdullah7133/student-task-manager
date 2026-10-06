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

      li.appendChild(contentDiv);
      taskList.appendChild(li);

      // Clear inputs
      taskTitleInput.value = "";
      taskDescInput.value = "";
    }
  });
});
