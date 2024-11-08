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

            document.getElementById("weatherResult").style.display = "block";
        } else {
            alert("City not found! Please enter a valid city name.");
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        alert("Error retrieving data. Please try again later.");
    }
}
