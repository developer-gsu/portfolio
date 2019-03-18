const wrap = document.querySelector("#wrap");

const IMG_NUMBER = 7;

function paintImage(imgNumber){
	const windowHeight = window.innerHeight
	wrap.style.height = `${windowHeight}px`;
	const image = `./images/${imgNumber + 1}.jpg`
	wrap.style.backgroundImage = `url(${image})`;
}

function genRandom(){
	const number = Math.floor(Math.random()*IMG_NUMBER);
	return number;
}

function init(){
	const randomNumber = genRandom();
	paintImage(randomNumber);
};
init();