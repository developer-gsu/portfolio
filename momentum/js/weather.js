const weather = document.querySelector(".js-weather");
const API_KEY = "db2c5a99ed11d72ebca3b0ae70200d2f";
//API = Application Programming Interface 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단
const COORDS = 'coords';

function getWeather (lat, lng){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
	.then(function(response){
		return response.json();
	})
	.then(function(json){
		const temperature = json.main.temp;
		const place = json.name;
		weather.innerText = `${temperature} @${place}`
	})
	//fetch 안에는 따옴표가 아닌 backtick(`)을 사용할 것
};

function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError(){
	console.log("can't access geo loaction")
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
} 

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	if (loadedCoords === null) {
		askForCoords();
	} else {
	const parsedCoords = JSON.parse(loadedCoords);
	getWeather(parsedCoords.latitude, parsedCoords.longitude);
	}
}

function init(){
	loadCoords();

};
init();