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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a265ac1d58947ea1284e84b622179a3f"

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data)

            var cityNameEl = document.querySelector(".city-name");
            cityNameEl.textContent = data.name
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
