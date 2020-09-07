const toDoForm = document.getElementById("js-input");

const TODOS_LS = "todos";

// function printToDo(text) {}

function handleSubmit(event) {
  //   event.preventDefault();
  console.log(1);
}

// function loadToDos() {
//     const loadedToDos = localStorage.getItem(TODOS_LS);
//     if (loadedToDos !== NULL) {
//         const parsedToDos = JSON.parse(loadedToDos);
//         parsedToDos.forEach(function toDo) {
//             printToDo(toDo.text);
//         }
//     }
//}

function init() {
  //   loadToDos();
  //   console.dir(toDoForm.firstElementChild);
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
