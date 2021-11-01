var searchForm = document.querySelector("#search-form");
var inputEl = document.querySelector("#search-city");

var inputHandler = function(event) {
    event.preventDefault();
    var cityChoice = inputEl.value.trim();

    if (cityChoice) {
        getCity(cityChoice);
        inputEl.value = "";
    } else {
        alert("No matches. please re-enter city name")
    }

    console.log(event)

}

searchForm.addEventListener("submit", inputHandler)


var getCity = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a265ac1d58947ea1284e84b622179a3f&units=imperial"

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data)

            var cityNameEl = document.querySelector(".city-name");
            cityNameEl.textContent = data.city.name
            //var noon = data.list[3]

            var day1Date = document.querySelector("#day-1-date")
            day1Date.textContent = data.list[3].dt_txt

            var day2Date = document.querySelector("#day-2-date")
            day2Date.textContent = data.list[1].dt_txt

            var day3Date = document.querySelector("#day-3-date")
            day3Date.textContent = data.list[2].dt_txt

            var icon = document.querySelector(".weather-icon")
            icon.textContent = data.list[5].weather[0].description

            var iconImg = document.querySelector(".icon-img")
            var iconCode = data.list[5].weather[0].icon
            var iconLink = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
            iconImg.src = iconLink

            var temp = document.querySelector('.temp')
            temp.textContent = data.list[5].main.temp

            var humidity = document.querySelector('.humidity')
            humidity.textContent = data.list[5].main.humidity

            var wind = document.querySelector('.wind')
            wind.textContent = data.list[5].wind.speed

        })
    })
}


// fetch('https://api.openweathermap.org/data/2.5/weather?q=san francisco&appid=a265ac1d58947ea1284e84b622179a3f')
// .then(function(res){return res.json()})
// //.then(function(data){console.log(data)})
// //.catch(function(err){console.log(err)})
// .then(function(weatherResponse){
//     var cityNameEl = document.querySelector(".city-name");
//     cityNameEl.textContent = weatherResponse.name;

// })

// for (let i = 3; i < cars.length; i = i + 8) {
//     text += cars[i] + "<br>";
//     console.log(cars[3])
//     console.log(cars[11])
//     console.log(cars[19])
    
//   }
