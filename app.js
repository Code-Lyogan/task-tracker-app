// First, we create a variable called tasks. 
// If there are no objects in our local storage, it returns an empty array and assigns it to our tasks.

window.addEventListener("load", () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    //JSON.parse will turn our tasks inside of our local storage into a string object.

    const nameInput = document.querySelector("#name");
   
    const newTaskForm = document.querySelector("#new-task-form"); 

    const username = localStorage.getItem("username") || "";
// variable created to gather the username of app operator, logs as key value.

    nameInput.value = username;
    // sets value of username = nameInput to log into local storage
  
    nameInput.addEventListener("change", (e) => {
      localStorage.setItem("username", e.target.value);
    }); // Event Listener fires when change is made to username using event.target

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
      // turning "tasks" inside of our JSON data into a string

      e.target.reset();

  // Displays our tasks and will update determined through user change.
      DisplayTasks();
    });
  
    DisplayTasks();
  });
  
  //Below we make our function to display/create our tasks
  // and remove them as we choose.
  function DisplayTasks() {
    const taskList = document.querySelector("#task-list");
    taskList.innerHTML = "";
    //variable selecting our task-list class and displaying the inner HTML as empty string.
  
    tasks.forEach((task) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
      // creates new task element whenever submitted through our input.
  
      const label = document.createElement("label");
      const input = document.createElement("input");
      const span = document.createElement("span");
      const content = document.createElement("div");
      const actions = document.createElement("div");
      const edit = document.createElement("button");
      const deleteButton = document.createElement("button");
      // creates all variable attributes of task element when added through our input.

  // Making Urgent button and Later button.

      input.type = "checkbox";

      input.checked = task.done;

      span.classList.add("bubble");
      if (task.category == "personal") {
        span.classList.add("personal");
      } else {
        span.classList.add("business");
      } // creates for loop, adding correct time frame bubble depending on selection.


      // Allows full edit abilities using innerHTML. 
      content.classList.add("task-content");
      actions.classList.add("actions");
      edit.classList.add("edit");
      deleteButton.classList.add("delete");

      // Here we changing our innerHTML to display the task that was written after submitted.
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

      //Append child is used to add these elements to the content within our task list.

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

  // Adds an event listener to our edit and delete button to make them functional
      edit.addEventListener("click", (e) => {
        const input = content.querySelector("input");
        input.removeAttribute("readonly");
        input.focus();
         // if edit button is clicked, it removes the readonly method
         // allowing for change to be made to the task.

        input.addEventListener("blur", (e) => {
          input.setAttribute("readonly", true);
          task.content = e.target.value;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          DisplayTasks();
        });
      });
  
      // Adds an event listener to make our delete button functional.
      // if t parameter is not equal to our task variable, remove item from our task list.
      deleteButton.addEventListener("click", (e) => {
        tasks = tasks.filter((t) => t != task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        DisplayTasks();
      });
    });
  }