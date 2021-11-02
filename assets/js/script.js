var searchForm = document.querySelector("#search-form");
var inputEl = document.querySelector("#search-city");

var inputHandler = function(event) {
    event.preventDefault();
    

    var cityChoice = inputEl.value.trim();

    if (cityChoice) {
        var searches = JSON.parse(localStorage.getItem("searches")) || []
        searches.push(cityChoice)
        localStorage.setItem("searches", JSON.stringify(searches))
        currentForcast(cityChoice)
        forcast(cityChoice);
        // resets search form to blank
        inputEl.value = "";
    } else {
        alert("No matches. please re-enter city name")
    }

    console.log(event)

}

searchForm.addEventListener("submit", inputHandler)


var currentForcast = function(city) {
    var currentApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a265ac1d58947ea1284e84b622179a3f&units=imperial"
    fetch(currentApiUrl).then(function(response) {
        response.json().then(function(cdata) {
           console.log(cdata)

            var currentWeatherEl = document.querySelector("#current-weather");
            currentWeatherEl.textContent = cdata.name + "'s Current Weather"

            var currentTempEl = document.querySelector(".current-temp");
            currentTempEl.textContent = "Temp: " + cdata.main.temp + " F*"

            var currentWindEl = document.querySelector(".current-wind");
            currentWindEl.textContent = "Wind Speed: " + cdata.wind.speed + " MPH"

            var currentHumidityEl = document.querySelector(".current-humidity");
            currentHumidityEl.textContent = "Humidity: " + cdata.main.humidity + " %"


            // var day1Date = document.querySelector("#day-1-date")
            // day1Date.textContent = data.list[3].dt_txt

            // var icon = document.querySelector(".weather-icon")
            // icon.textContent = data.list[3].weather[0].description

            // var iconImg = document.querySelector(".icon-img")
            // var iconCode = data.list[3].weather[0].icon
            // var iconLink = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
            // iconImg.src = iconLink

            // var temp = document.querySelector('.temp')
            // temp.textContent = data.list[3].main.temp

            // var humidity = document.querySelector('.humidity')
            // humidity.textContent = data.list[3].main.humidity

            // var wind = document.querySelector('.wind')
            // wind.textContent = data.list[3].wind.speed

        })
    })
}


var forcast = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a265ac1d58947ea1284e84b622179a3f&units=imperial"

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data)

            var cityNameEl = document.querySelector(".city-name");
            cityNameEl.textContent = data.city.name + "'s 5-Day Forcast"
            //var noon = data.list[3]
            for (i=0; i<5; i++) {
                var j = i * 8
                var dateCol = document.querySelector("#dayCol" + i)

                var day1Date = document.querySelector("#day-" + i)
                day1Date.textContent = data.list[j].dt_txt
    
                // var icon = document.querySelector(".weather-icon")
                // icon.textContent = data.list[j].weather[0].description
    
                var iconImg = document.querySelector(".icon-img-"+i)
                var iconCode = data.list[j].weather[0].icon
                var iconLink = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
                iconImg.setAttribute("src", iconLink)
    
                var temp = document.querySelector('.temp-'+i)
                temp.textContent += data.list[j].main.temp
    
                var humidity = document.querySelector('.humidity-'+i)
                humidity.textContent += data.list[j].main.humidity
    
                var wind = document.querySelector('.wind-'+i)
                wind.textContent += data.list[j].wind.speed
    

            }
            
        })
    })
}


var createCol = function(){
    // var container = document.createElement("div")
    // container.classList.add("container")
    // container.setAttribute('id', "5Container")
    // document.main.appendChild(container)

    // var row = document.createElement("div")
    // container.classList.add("row")
    // document.container.appendChild(row)

    for (i=0; i<5; i++){
        idNum = "dayCol" + i 

        var newDiv = document.createElement("div");
        newDiv.classList.add("col-2");
        newDiv.setAttribute('id', idNum);


        var num = "day-" + i

        var h3Day = document.createElement("h3");
        h3Day.setAttribute('id', num)
        h3Day.textContent = num

        newDiv.appendChild(h3Day)

newDiv.innerHTML+=`<img class="icon-img-${i}" alt="">
<ul>
    <li class="weather-icon"></li>
    <li class="temp">Temperature: <span class="temp-${i}"></span> F*</li>
    <li class="wind">Wind Speed: <span class="wind-${i}"></span> MPH</li>
    <li class="humidity">Humidity: <span class="humidity-${i}"></span>%</li>

</ul>`
        

        document.getElementById("5-day").appendChild(newDiv)




    }




}
createCol()

var displaySearch = function(){

var searches = JSON.parse(localStorage.getItem("searches")) || []


}




// for (let i = 3; i < cars.length; i = i + 8) {
//     text += cars[i] + "<br>";
//     console.log(cars[3])
//     console.log(cars[11])
//     console.log(cars[19])
    
//   }
