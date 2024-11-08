async function getWeather() {
    const apiKey = '5fe36b192ffd1c36dffb6752bc1722b2';  // Your API Key
    const city = document.getElementById("cityInput").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById("cityName").textContent = `Weather in ${data.name}`;
            document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById("weatherDescription").textContent = `Condition: ${data.weather[0].description}`;
            document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind.speed} m/s`;

            // Weather icon based on conditions
            const weatherIcon = getWeatherIcon(data.weather[0].main);
            document.getElementById("weatherDescription").insertAdjacentHTML('beforeend', ` <i class="fas ${weatherIcon}"></i>`);

            // Show the weather result and Google Maps button
            document.getElementById("weatherResult").style.display = "block";
            document.getElementById("mapsLink").style.display = "inline";
            
            // Set data for Google Maps
            document.getElementById("mapsLink").dataset.city = data.name;
        } else {
            alert("City not found! Please enter a valid city name.");
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        alert("Error retrieving data. Please try again later.");
    }
}

// Open Google Maps with the city name from the dataset
function openMaps() {
    const city = document.getElementById("mapsLink").dataset.city;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city)}`, '_blank');
}

// Function to get weather condition icon class
function getWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
        case 'Clear':
            return 'fa-sun';
        case 'Clouds':
            return 'fa-cloud';
        case 'Rain':
            return 'fa-cloud-showers-heavy';
        case 'Snow':
            return 'fa-snowflake';
        case 'Thunderstorm':
            return 'fa-bolt';
        default:
            return 'fa-smog';
    }
}
