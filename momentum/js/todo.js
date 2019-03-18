const toDoForm = document.querySelector(".js-toDoForm"),
	  toDoInput = toDoForm.querySelector('input'),
	  toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let todos = [];

function deleteToDo(event){
	const btn = event.target;
	const li = btn.parentNode;
	toDoList.removeChild(li);
	const cleanToDos = todos.filter(function(toDo){
		return toDo.id !== parseInt(li.id);
	})
	todos = cleanToDos;
	saveToDos();
}

function saveToDos(){
	localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}
function paintToDo(text){
	
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	delBtn.innerHTML = "X";
	delBtn.addEventListener("click", deleteToDo);
	const span = document.createElement("span");
	const newId = todos.length+1
	span.innerText = text;
	li.appendChild(span);
	li.appendChild(delBtn);
	li.id=newId;
	toDoList.appendChild(li);
	const toDoObj = {
		text : text,
		id : newId 
	}
	todos.push(toDoObj);
	saveToDos();
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = toDoInput.value;
	paintToDo(currentValue);
	toDoInput.value="";
}

function loadToDos(){
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if(loadedToDos !== null){
		const parsedToDos = JSON.parse(loadedToDos);
		//JSON = JavaScrtipt Object Notation
		parsedToDos.forEach(function(toDo){
			paintToDo(toDo.text);
		});
	}
}

function init(){
	loadToDos();
	toDoForm.addEventListener("submit", handleSubmit)
}
init();
