const clockContainer = document.querySelector(".js-clock"),
	  clockTitle = clockContainer.querySelector("h1");

function getTime(){
	const date = new Date();
	const minutes = date.getMinutes();
	const hours = date.getHours();
	const seconds = date.getSeconds();

	clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
		seconds < 10 ? `0${seconds}` : seconds
	}`;


	//setInterval(fn, 1000) => (실행하고 싶은 함수, 실행할 시간 간격)
}

function init() {
	getTime();
	setInterval(getTime, 1000);
}

init();