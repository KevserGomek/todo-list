const todoInput = document.querySelector(".todo-input");
const listSect = document.querySelector(".lists-section");

todoInput.addEventListener("keypress",addTodo);
document.addEventListener("DOMContentLoaded",pageLoaded);

function pageLoaded(){  
    renderItems();
}
function addTodo(e){

    if(e.key==="Enter"){

        const inputText = todoInput.value.trim();
        e.preventDefault(); 

        if(inputText.length <=0){
            alert("Please add todo!");
            return false;
        }
        listSect.style.display="flex"; 

        const item = {
            id: getId(),
            text: inputText,
            completed: false,
          }; 

        const rawItems = localStorage.getItem("items");
        const items = rawItems ? JSON.parse(rawItems) : [];

        items.push(item);


        localStorage.removeItem("items");
        localStorage.setItem("items", JSON.stringify(items));
       
        renderItems();

        todoInput.value=" ";
        
    }
}

function toggleItem(e) {
    const itemId = e.target.dataset.id;
    const itemCompleted = e.target.dataset.completed;

    const rawItems = localStorage.getItem("items");
    let items = rawItems ? JSON.parse(rawItems) : [];

    items = items.map(item => {
        if (item.id === itemId) {
            item.completed = itemCompleted === 'true' ? false : true;
        }
        return item
    })

    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(items));

    renderItems();

}


function removeItem(e) {
    const itemId = e.target.dataset.id;
    const itemCompleted = e.target.dataset.completed;

    const rawItems = localStorage.getItem("items");
    let items = rawItems ? JSON.parse(rawItems) : [];

    items = items.filter(item => {
        if (item.id !== itemId) {
            return item
        }
    })

    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(items));

    renderItems();

}

function createItem(item){

    const todosSect = document.querySelector(".todos-section");
    const completedTodosSect = document.querySelector(".completed-todos-section");

    const todosRow = document.createElement("div");
    todosRow.className="todos-row";
    todosRow.dataset.id=item.id;

    if (item.completed) {
        completedTodosSect.appendChild(todosRow);
    } else {
        todosSect.appendChild(todosRow);
    }

    const checkBtn = document.createElement("button");
    checkBtn.className="checked-btn";
    checkBtn.dataset.id=item.id;
    checkBtn.dataset.completed=item.completed;

    if (item.completed) {
        checkBtn.className = "checked-btn checked"
    }

    checkBtn.addEventListener("click", function(e) {
        toggleItem(e);
    }, false);
    todosRow.appendChild(checkBtn);

    const todosLi = document.createElement("li");
    todosLi.className="todos-li";
    todosLi.dataset.id=item.id;
    todosLi.innerHTML=item.text; 
    todosRow.appendChild(todosLi);
    
    const delBtn = document.createElement("button");
    delBtn.className="del-btn";
    delBtn.innerHTML="X";
    delBtn.dataset.id=item.id;
    delBtn.dataset.completed=item.completed;
    delBtn.addEventListener("click", function(e) {
        removeItem(e);
    }, false);
    todosRow.appendChild(delBtn);
}

function hideItems(){
    const containerText = document.querySelector(".todo-container-text");
    containerText.style.display="none";
}

function showItems(){
    const containerText = document.querySelector(".todo-container-text");
    containerText.style.display="flex";
}

function getId() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function renderItems() {
    const rawItems = localStorage.getItem("items");
    const items = rawItems ? JSON.parse(rawItems) : [];

    if (items.length > 0) {
        hideItems();
    } else {
        showItems();
    }

    const todosRow = document.querySelectorAll('.todos-row');

    todosRow.forEach(todoRow => {
        todoRow.remove();
    });

    items.forEach((item, index) => {

        createItem(item);
        
    });
}

function removeStr(removeItem){
    if (localStorage.getItem("items")===null){
        items=[];
    }else {
        items=JSON.parse(localStorage.getItem("items"));
    }
   
   items.forEach(function(item,index){
    if (removeItem===item){
        items.splice(index,1);
    }
   });
    localStorage.setItem("items",JSON.stringify(items));
}





