/*Waiting for the Webpage to Load*/
document.addEventListener("DOMContentLoaded", () => {

    /*Selecting HTML Elements*/
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    /* The API Key*/
    const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY_HERE";
    
    
    /*Setting up the Button Click*/
    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        /*Fetching Data Safely (Try/Catch)*/
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });

    /*Talking to the External Server*/
    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City Not found");
        }

        const data = await response.json();
        return data;
    }

    /*Displaying the Weather on Screen*/
    function displayWeatherData(data) {
        const { name, main, weather } = data;

        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}°C`;
        
        // Added unit symbol for clarity
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    /*Handling Error*/
    function showError() {
        weatherInfo.classList.add("hidden");      // Hide weather info on error
        errorMessage.classList.remove("hidden"); // Show error message on error
    }
});