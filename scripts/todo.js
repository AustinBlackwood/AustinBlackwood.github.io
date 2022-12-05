function addToDo(){
    input=document.getElementsByClassName('todo-input')[0].value;
    if(input.length > 0){
        toDoItem = document.createElement("div");
        checkBox = document.createElement("input");
        toDoText = document.createElement("textarea");

        checkBox.type= "checkbox";

        toDoItem.classList.add("todo-item");
        checkBox.classList.add("check-box")
        toDoText.classList.add("todo-text")
        
        toDoText.setAttribute("maxlength","45");
        toDoText.innerText = input;

        toDoItem.appendChild(checkBox);
        toDoItem.appendChild(toDoText);

        createDeleteButton();

        toDoItem.appendChild(deleteButton);
        document.getElementsByClassName('todo-container')[0].appendChild(toDoItem);
        document.getElementsByClassName('todo-input')[0].value='';

        //saves container to local storage
        localStorage.currentSave = document.getElementsByClassName('todo-container')[0].outerHTML;
    }
}

function createDeleteButton(){
    deleteButton = document.createElement("button");
    deleteButton.classList.add("todo-delete-button");
    deleteButton.innerText = "X";
    deleteButton.addEventListener('click', function deleteToDo(event) {
        event.target.parentElement.remove();
        localStorage.currentSave = document.getElementsByClassName('todo-container')[0].outerHTML;
    })
}

function deleteAllToDos(){
    toDoItems = document.getElementsByClassName('todo-item');
    for(let i = toDoItems.length-1; i > -1; i--) {
        toDoItems[i].remove();
    }
    delete localStorage.currentSave;
    prepKeyPress();
}

//Re-adds event listener to delete buttons when reloading page
function reAddEvents(){
    deleteButtons= document.getElementsByClassName('todo-delete-button');
    for(let i = 0; i<deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', function deleteToDo(event) {
            event.target.parentElement.remove();
            localStorage.currentSave = document.getElementsByClassName('todo-container')[0].outerHTML;
        })
    }
}

//Makes 'enter' key add a todo
function prepKeyPress(){
    input=document.getElementsByClassName('todo-input')[0];
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
        document.getElementById("todo-add-button").click();
        }
    })
};

function loadSavedToDos(){
    let currentSave = localStorage.currentSave;
    if(currentSave == undefined){
        return;
    }
    const container = document.getElementsByClassName('todo-container')[0];

    //loads local storage
    container.outerHTML=currentSave;
}

function onLoad(){
    loadSavedToDos();
    reAddEvents();
    prepKeyPress();
}

window.onload = onLoad;
