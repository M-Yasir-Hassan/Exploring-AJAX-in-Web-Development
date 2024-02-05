const apiKey = "ac9a2c59fc25d8b4ebbdbac85ba29956"; 
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("city");
const getWeatherButton = document.getElementById("get-weather");
const weatherInfoDiv = document.getElementById("weather-info");

getWeatherButton.addEventListener("click", () => {
    const cityName = cityInput.value.trim();

    if (!cityName) {
        alert("Please enter a city name!");
        return;
    }

    fetch(`${baseUrl}?q=${cityName}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                weatherInfoDiv.textContent = "City not found. Please try again.";
            } else {
                const location = data.name;
                const temp = Math.round(data.main.temp - 273.15); 
                const description = data.weather[0].description;
                const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                weatherInfoDiv.innerHTML = `
                    <div>
                        <h2>${location}</h2>
                        <img src="${icon}" alt="${description}">
                        <p>Temperature: ${temp}°C</p>
                        <p>Description: ${description}</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherInfoDiv.textContent = "An error occurred. Please try again later.";
        });
});
