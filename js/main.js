// select elements and create variables
var API_Key = "98ee55573d6b611f0cc5cd4ae7221465";
var ROOT_URL = "http://api.openweathermap.org/data/2.5/weather?zip="
var cityTitle = document.querySelector(".city_title");
var zip = document.querySelector(".zip");
var weather = document.querySelector(".weather");
var icon = document.querySelector(".icon");
var temp = document.querySelector(".temp");
var humid = document.querySelector(".humid");
var deg = document.querySelector(".deg");
var convert = document.querySelector(".convert");
var kelvin;
var icons = {
    "Clouds": "img/cloudy.png",
    "Rain" : "img/rain.png",
    "Snow" : "img/snow.png",
    "Clear" : "img/sun.png",
    "Thunder" : "img/thunderstorm.png",
    "Partly Cloudy" : "img/partly-cloudy.png",
    "Mist" : "img/mist.png",

}

// define functions
function KtoF(kelvin){
    return Math.round((kelvin - 273.5) * 1.8 + 32);
}

function KtoC(kelvin){
    return Math.round(kelvin - 273.15);
}


function getWeather(zipCode){
    // console.log("Manifest");

    fetch(`${ROOT_URL}${zipCode},us&appid=${API_Key}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        cityTitle.textContent = data.name;
        weather.textContent = data.weather[0].main;
        humid.textContent = data.main.humidity;
        kelvin = data.main.temp;
        temp.textContent = KtoF(kelvin);
        icon.src = icons[data.weather[0].main];
    })
    .catch(function(error){
        console.log("There is an error");
    })
}




// call funtions and add eventListeners
zip.addEventListener("keypress",function(event){
// console.log(event);
if(event.key == "Enter")
    getWeather(zip.value);
});

convert.addEventListener("click", function(){
    // console.log("I am very hungry");
    if(convert.textContent == "Convert to Celcius"){
        temp.textContent = KtoC(kelvin);
        deg.innerHTML = "&deg; C";
        convert.textContent = "Convert to Farenheit";

    } else {
        temp.textContent = KtoF(kelvin);
        deg.innerHTML = "&deg; F";
        convert.textContent = "Convert to Celcius";
    }
});

getWeather('33144');