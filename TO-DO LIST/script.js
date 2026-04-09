document.addEventListener("DOMContentLoaded", function () {
  const todoinput = document.getElementById("todoinput");
  const addtodobtn = document.getElementById("addTodobtn");
  const todolist = document.getElementById("todolist");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function renderTodos() {
    todolist.innerHTML = "";
    todos.forEach((todo, index) => {
      const listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center";
      if (todo.completed) {
        listItem.classList.add("completed");
      }

      listItem.textContent = todo.text;
      const deletebutton = document.createElement("button");
      deletebutton.className = "btn btn-danger btn-sm";
      deletebutton.textContent = "Delete";
      deletebutton.addEventListener("click", () => {
        deleteTodo(index);
      });
      listItem.appendChild(deletebutton);
      listItem.addEventListener("click", () => {
        toogleTodoComplete(index);
      });
      todolist.appendChild(listItem);
    });
  }

    function deleteTodo(index){
        todos.splice(index,1);
        savetodos();
        renderTodos();
    }

    function toogleTodoComplete(index){
        todos[index].completed=!todos[index].completed;
        savetodos();
        renderTodos();
    }
  function addtodo() {
    const tsakText = todoinput.value.trim();
    if (tsakText === "") return;
    todos.push({ text: tsakText, completed: false });
    todoinput.value = "";
    savetodos();
    renderTodos();
  }

  function savetodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  addtodobtn.addEventListener("click", addtodo);

  todoinput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addtodo();
    }
  });

  renderTodos();
});
