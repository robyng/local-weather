var searchForm = document.querySelector("#search-form");
var inputEl = document.querySelector("#search-city");

var savedSearches = document.querySelector(".saved-searches")

var inputHandler = function(event) {
    event.preventDefault();
    
    var cityChoice = inputEl.value.trim();

    if (cityChoice) {
        currentForcast(cityChoice)
        forcast(cityChoice);

        var searches = JSON.parse(localStorage.getItem("searches")) || []
        searches.push(cityChoice)
        localStorage.setItem("searches", JSON.stringify(searches))
        
        savedSearches.innerHTML += `<button>${cityChoice}</button></br />`
        
        savedSearches.addEventListener('click', function(event){
            savedCityChoice = event.target.innerHTML
            currentForcast(savedCityChoice)
            forcast(savedCityChoice);

        })
        // resets search form to blank
        inputEl.value = "";
    } else {
        alert("No matches. please re-enter city name")
    }

}

searchForm.addEventListener("submit", inputHandler)



var currentForcast = function(city) {
    var currentApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a265ac1d58947ea1284e84b622179a3f&units=imperial"
    fetch(currentApiUrl).then(function(response) {
        response.json().then(function(cdata) {

            //console.log(cdata)

            var currentIconImg = document.querySelector(".current-icon")
            var cIconCode = cdata.weather[0].icon
            var iconLink = "http://openweathermap.org/img/wn/" + cIconCode + "@2x.png"
            currentIconImg.setAttribute("src", iconLink)
      
            var currentWeatherEl = document.querySelector("#current-weather");
            currentWeatherEl.textContent = cdata.name + "'s Current Weather"

            var currentTempEl = document.querySelector(".current-temp");
            currentTempEl.textContent = "Temp: " + cdata.main.temp + " F*"

            var currentWindEl = document.querySelector(".current-wind");
            currentWindEl.textContent = "Wind Speed: " + cdata.wind.speed + " MPH"

            var currentHumidityEl = document.querySelector(".current-humidity");
            currentHumidityEl.textContent = "Humidity: " + cdata.main.humidity + " %"

            var curLong = cdata.coord.lon
            var curLat = cdata.coord.lat

           


            ///////
            
            
                
                var oneCallApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + curLat + "&lon=" + curLong + "&exclude=minutely,hourly,daily,alerts&appid=a265ac1d58947ea1284e84b622179a3f"
                fetch(oneCallApiUrl).then(function(response) {
                    response.json().then(function(uvData) {
                        
                        console.log(uvData)
            
                        var currentUvi = document.querySelector(".uv-index")

                        var uvIndex = uvData.current.uvi
                        currentUvi.textContent = uvIndex

                        //conditionals for uv severity

                        if (uvIndex < 3){
                            currentUvi.classList.add("green")
                        } else if (uvIndex > 5) {
                            currentUvi.classList.add("red")

                        } else {
                            currentUvi.classList.add("yellow")
                        }
                        
            
            
                    })
                })
            
            



            //////
        })
    })
}


var forcast = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a265ac1d58947ea1284e84b622179a3f&units=imperial"

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            

            var cityNameEl = document.querySelector(".city-name");
            cityNameEl.textContent = data.city.name + "'s 5-Day Forcast"

            for (i=0; i<5; i++) {
                var j = i * 8
                var dateCol = document.querySelector("#dayCol" + i)

                var day1Date = document.querySelector("#day-" + i)
                day1Date.textContent = data.list[j].dt_txt
    
                var iconImg = document.querySelector(".icon-img-"+i)
                var iconCode = data.list[j].weather[0].icon
                var iconLink = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
                iconImg.setAttribute("src", iconLink)
    
                var temp = document.querySelector('.temp-'+i)
                temp.textContent = data.list[j].main.temp
    
                var humidity = document.querySelector('.humidity-'+i)
                humidity.textContent = data.list[j].main.humidity
    
                var wind = document.querySelector('.wind-'+i)
                wind.textContent = data.list[j].wind.speed
    

            }
            
        })
    })
}


var createCol = function(){
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