// Create variable called tasks. 
// If there are no objects in our local storage, it returns an empty array and assigns it to our tasks.

window.addEventListener("load", () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const nameInput = document.querySelector("#name");
   
    const newTaskForm = document.querySelector("#new-task-form"); 
  // Creating a variable called taskInputs so we can store any inputs that come from this form into our array of tasks.
    const username = localStorage.getItem("username") || "";
    nameInput.value = username;
  
    nameInput.addEventListener("change", (e) => {
      localStorage.setItem("username", e.target.value);
    });
  // Adds a listener event, that fires when user enters their item through submit. 
    newTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const task = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime(),
      };

  // Pushes object inside of an array called tasks, which is placed in our local storage.
      tasks.push(task);
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
      e.target.reset();
  // Displays our tasks and will update determined through user change.
      DisplayTasks();
    });
  
    DisplayTasks();
  });
  
  function DisplayTasks() {
    const taskList = document.querySelector("#task-list");
    taskList.innerHTML = "";
  
    tasks.forEach((task) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
  
      const label = document.createElement("label");
      const input = document.createElement("input");
      const span = document.createElement("span");
      const content = document.createElement("div");
      const actions = document.createElement("div");
      const edit = document.createElement("button");
      const deleteButton = document.createElement("button");

  // Making check button and done button.

      input.type = "checkbox";
      input.checked = task.done;
      span.classList.add("bubble");
      if (task.category == "personal") {
        span.classList.add("personal");
      } else {
        span.classList.add("business");
      }
      // Allows full edit abilities using innerHTML. 
      content.classList.add("task-content");
      actions.classList.add("actions");
      edit.classList.add("edit");
      deleteButton.classList.add("delete");

      content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
      edit.innerHTML = "Edit";
      deleteButton.innerHTML = "Delete";
  
      label.appendChild(input);
      label.appendChild(span);
      actions.appendChild(edit);
      actions.appendChild(deleteButton);
      taskItem.appendChild(label);
      taskItem.appendChild(content);
      taskItem.appendChild(actions);
  
      taskList.appendChild(taskItem);
  // Adds tasks to local storage for display
      if (task.done) {
        taskItem.classList.add("done");
      }
  
      input.addEventListener("change", (e) => {
        task.done = e.target.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));

  // If it is true, then it will show as finished.
        if (task.done) {
          taskItem.classList.add("done");
        } else {
          taskItem.classList.remove("done");
        }
  
        DisplayTasks();
      });

  // Adds click listener to delete button 
      edit.addEventListener("click", (e) => {
        const input = content.querySelector("input");
        input.removeAttribute("readonly");
        input.focus();
        input.addEventListener("blur", (e) => {
          input.setAttribute("readonly", true);
          task.content = e.target.value;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          DisplayTasks();
        });
      });
  
      deleteButton.addEventListener("click", (e) => {
        tasks = tasks.filter((t) => t != task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        DisplayTasks();
      });
    });
  }