//Assign parts of the HTML document to variables.  This makes it easier to work with the selected areas in the code.
//------------------------------------------------------------------------------------------------------------------

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.todo-filter');
const spanError = document.querySelector('.error');

//Add Event Listeners to the html document, button, list and filter
//----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//FUNCTIONS
//---------

//This function is triggered when the add button is clicked
//----------------------------------------------------------
function addTodo(event) {

    event.preventDefault(); // to prevent the web from refreshing 
    //Add the new item to the todo list

    if (todoInput.value === "") { //condition for the input if its truthy or falsely 
        todoInput.classList.add("error"); // this is to add the error class in the css file
        todoInput.focus(); // returning the cursor to the input filed
        todoInput.setAttribute("placeholder", "task can not be empty"); //showing a proper error 

    } else {
        todoInput.classList.remove("error"); //remove the error class
        addTodoItem(todoInput.value); // todoInput.value will allow the text content to be taken from the input
        todoInput.setAttribute("placeholder", "Add a To-Do List"); // removing error placeholder and adding th instrution one 
        //SAVE TO LOCAL STORAGE
        saveLocalTodos(todoInput.value);
        /*save to LocalTodos requires to be here
                                                where the todo is added 
                                                */

    }
    //Clear Input value
    todoInput.value = "";
}

//1.  Create a new HTML DIV.
//2.  Add a class ('todo') to the new DIV 
//3.  Create a new HTML <li> with a class of 'todo-item' and attach it to the div
//4.  Create a new HTML <button> with an <i (icon)> attribute and a class of 'complete-btn' and attach it to the div
//5.  Create another HTML <button> with an <i (icon)> attribute and a class of 'trash-btn' and attach it to the div
//6.  Append this to the HTML "todoList" that already exists in your html doc.
//7.  Clear the input field.
//      <DIV class="todo"><li class="todo-item"><button class="complete-btn"></b><button class=trash-btn></b></li></div>

function addTodoItem(todo) {


    //Todo DIV
    const todoDiv = document.createElement("div");

    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item'); //
    todoDiv.appendChild(newTodo);

    // //SAVE TO LOCAL STORAGE
    // saveLocalTodos(todo);
    /* removed this line of code reason the function addItems to the 
       dome meaning if the saveLocalTodos(todo) gets tobe called even if 
       the ToDo is adding a todo List it will duplucate the List already in 
       Local Storage  */

    //CHECKMARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);

}


//This function is triggered when an item on the todo list is clicked.

//1.  Was the delete button clicked?
//2.  If the delete button is clicked, call the removeLocalTodos function and then remove item from list.
//-------------------------------------------------------------------------------------------------------
function deleteCheck(e) {
    const item = e.target;

    //DELETE TODO

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        console.log(todo);
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();

        })
    }

    //3.  Was the 'completed' button clicked?//CHECK MARK
    //4.  If the completed button is clicked, toggle the item between ruled out and not ruled out.
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

//This function is triggered when the filter button is clicked.
// It filters the items in the to do list, based on what was chosen from the trigger list.
function filterTodo(e) { // an event was reqired for the function to work 
    const todos = todoList.childNodes;

    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
                break; //break was misssing
            case "completed":
                if (todo.classList.contains('completed')) { todo.style.display = 'flex' } else {
                    todo.style.display = "none";
                }
                break;
            case "not completed":
                if (!todo.classList.contains('completed')) { todo.style.display = 'flex' } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

//This function is called when a new item is added to the todo list.
//------------------------------------------------------------------
function saveLocalTodos(todo) {
    //check do I already have a local todo storage?

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

//This function is triggered when the DomContentLoaded event occurs (the html document finishes loading)
//------------------------------------------------------------------------------------------------------
// 1.  if there is no existing local storage called 'todos' then assign an empty array to variable todos.
// 2.  If there is an existing local storeage called 'todos' fetch the items from local storage and parse then to a string using JSON.parse
// 3.  For each item in the todo array, create the html structure for an item and add it to the document

function getTodos() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => addTodoItem(todo));
    /*
    changed addTodo(todo) to todos.forEach(todo => addTodoItem(todo)); 
    addTodo() was the wrong function to call when displaying into the DOM 
    only addTodoItems() could get the job Done 
    //****************** also the reason why saveToLocal() was called in 
                         the wrong function, saveToLocal() would always Add duplucates 
                         of sum of the tasks aaded in the LocalStorage 
    */
}
//This function is called when an item is deleted from the list of items.
//It removes the item from the local storage array.

function removeLocalTodos(todo) {

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1); //changed the todos(todoIndex) todos wasnt a function but an array

    localStorage.setItem("todos", JSON.stringify(todos)); // to clear local Storage localStorage.clear();

}