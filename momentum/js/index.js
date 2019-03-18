/* %%%%%%%%%%%%%%%%%% Episode 17 - Modifying the DOM with JS %%%%%%%%%%%%%%%%%%%

console.log(document);
//document 는 html을 나타는 object

const title = document.getElementById("title");
console.log(title);

//id를 통해서 html내의 태그를 자바스크립트를 통해 불러옴!

//DOM = Document Object Model
//자바스크립트가 내 html에 있는 모든 요소를 가지고 옴.
//그리고 그것을 객체로 바꿈. 

title.innerHTML = "Hi! From JS";
//자바스크립트를 통해서 html내의 h1태그 내용을 바꿈
//이처럼 자바스크립트를 통해서 html의 요소들을 통제하고 변경할 수 있다는 것!

console.dir(title);
//title 내에 있는 모든 속성들을 보여줌.
title.style.color = 'red';

console.dir(document);
document.title = "I own you now"

document.querySelector("#title");
//getElementsById나 getElementsByClassName등이 아닌 querySelector를 이용하면 #=id, .=class를 불러올 수 있음


%%%%%%%%%%%%%%%%%% Episode 17  %%%%%%%%%%%%%%%%%%% */


/* %%%%%%%%%%%%%%%%%% Episode 18 - Events and event handlers %%%%%%%%%%%%%%%%%%%

const title = document.querySelector("#title");

// function handleResize() {
// 	console.log("I have been resized");
// };

function handleClick(){
	title.style.color = "blue";
}


//window.addEventListener("resize", handleResize);
//윈도우가 resize 되었을 때 뒤의 함수가 실행되는 것

//window.addEventListener("resize", handleResize());
//★★★ 윈도우가 resize 되지 않았어도 즉시 함수가 호출됨.

title.addEventListener("click", handleClick); 

%%%%%%%%%%%%%%%%%% Episode 18 %%%%%%%%%%%%%%%%%%% */


// %%%%%%%%%%%%%%%%%% Episode 19 - 첫번째 조건문 If, else, and, or %%%%%%%%%%%%%%%%%%% 

/*
if(condition) {
	block
} else {
	block
}

condition = 조건 / block = 자바스크립트 표현법
조건문에는 10>5, "10" === 10, true, false 등이 들어갈 수 있음
*/
/*
if ("10" === 10) {
	console.log("hi");
} else if (10>5) {
	console.log ("ho");
} else {
	console.log("lalala")
}

// 1. 맨 처음 조건이 참이면 첫번째 함수실행
// 2. 처음 조건이 거짓이면 두번째로 넘어가서 1번 반복
// 3. 모든 조건이 다 거짓이라면 마지막 함수 실행


if (20>5 || "nicolas" === "nicolas") {
	console.log("yes");
} else {
	console.log("no");
}

// true && true = true;
// false && true = false;
// true && false = false;
// false && false = false;

// true || true = true;
// false || true = true;
// true || false = true;
// false || false = false;

const age = prompt("How old are you?");

if (age >= 18 && age <= 21){
	console.log('you can drink but you should not')
} else if (age > 21){
	console.log("go ahead")
} else {
	console.log("too young")
}

%%%%%%%%%%%%%%%%%% Episode 19 %%%%%%%%%%%%%%%%%%% */

// %%%%%%%%%%%%%%%%%% Episode 20 - DOM If else Function practice %%%%%%%%%%%%%%%%%%%
/*
const BASE_COLOR = "white";
const OTHER_COLOR = "blue"

function handleClick(){
	const currentColor = title.style.color;
	if (currentColor === BASE_COLOR){
		title.style.color = OTHER_COLOR;
	} else {
		title.style.color = BASE_COLOR;
	}
}

function init(){
	title.style.color = BASE_COLOR;
	title. addEventListener("click", handleClick);
}
init();

//HTML javascript DOM event MDN
//이벤트의 근원을 알고 싶으면 MDN 찾아보기!


function handleOffline(){
	console.log('Bye bye')
}

function handleOnline(){
	console.log('Welcome back')
}

window.addEventListener("offline", handleOffline)
window.addEventListener("online", handleOnline)
*/

// %%%%%%%%%%%%%%%%%% Episode 20 %%%%%%%%%%%%%%%%%%% 

//%%%%%%%%%%%%%%%%%% Episode 21 - DOM IF else Function practice 2 %%%%%%%%%%%%%%%%%%%

//const title = document.querySelector("#title");
//const CLICKED_CLASS = "clicked";

//function handleClick(){
	//const currentClass = title.className;
	/*
	if (currentClass !== CLICKED_CLASS) {
		title.className = CLICKED_CLASS;
	} else {
		title.classNmae = "";
	}
	//title에 아무 class가 없을 때는 작동이 잘 되지만,
	다른 class가 있을 때, 클릭하면 모든 class사라짐
	*/

	/*
	const hasClass = title.classList.contains(CLICKED_CLASS);

	if (!hasClass) {
		title.classList.add(CLICKED_CLASS);
	} else {
		title.classList.remove(CLICKED_CLASS);
	}
	// 위의 문제점을 해결하였으나, 더 간결히 작성할 수 있는 방법이 있음 !!
	*/

	//title.classList.toggle(CLICKED_CLASS);
	//위의 코드 한줄로 요약 가능 
	//toggle() 괄호 안에 있는 class가 존재하면 없애고, 없으면 넣어주는 역할!
//}
/*
function init() {
	title.addEventListener ("click", handleClick);
}
init();
*/

// %%%%%%%%%%%%%%%%%% Episode 21 %%%%%%%%%%%%%%%%%%% 

// %%%%%%%%%%%%%%%%%% Episode 22 %%%%%%%%%%%%%%%%%%%



