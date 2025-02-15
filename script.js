console.log("Script Loaded Successfully.");

// OpenWeatherMap API Key (Replace with your own)
const WEATHER_API_KEY = "9e4732c5def90fb22c055692d2d4fb40";

// Function to Fetch Weather Data
async function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Simulated Google Earth Engine Data Retrieval
function getSatelliteData(location) {
    return {
        soilMoisture: Math.random() * 100, // Simulated soil moisture (0-100)
        vegetationHealth: Math.random() * 100 // Simulated vegetation health (0-100)
    };
}

// Function to Generate Recommendations
function generateRecommendations(weather, satelliteData) {
    let recommendation = `<p>🌤️ Weather Conditions: ${weather.weather[0].description}</p>`;

    if (weather.main.temp > 30) {
        recommendation += "<p>🔥 High temperature detected. Increase irrigation frequency.</p>";
    } else if (weather.main.temp < 15) {
        recommendation += "<p>❄️ Low temperature detected. Reduce irrigation.</p>";
    }

    if (satelliteData.soilMoisture < 30) {
        recommendation += "<p>💧 Soil moisture is low. Consider watering the crops.</p>";
    }

    if (satelliteData.vegetationHealth < 50) {
        recommendation += "<p>🌿 Vegetation health is poor. Fertilization may be needed.</p>";
    }

    return recommendation;
}
//function t0
function generateRecommendations(weather, satelliteData) {
    const cropType = document.getElementById("crop-type").value;
    let recommendation = `
        <p>🌤️ Weather Conditions: ${weather.weather[0].description}</p>
        <p>🌡️ Temperature: ${weather.main.temp}°C</p>
        <p>💧 Humidity: ${weather.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${weather.wind.speed} m/s</p>
        <p>🌧️ Precipitation: ${weather.rain ? weather.rain["1h"] + " mm" : "0 mm"}</p>
    `;

    // Crop-specific recommendations
    if (cropType === "wheat") {
        recommendation += "<p>🌾 Wheat: Ensure proper nitrogen application during tillering stage.</p>";
    } else if (cropType === "rice") {
        recommendation += "<p>🍚 Rice: Maintain consistent water levels in the field.</p>";
    }

    // General recommendations
    if (weather.main.temp > 30) {
        recommendation += "<p>🔥 High temperature detected. Increase irrigation frequency.</p>";
    } else if (weather.main.temp < 15) {
        recommendation += "<p>❄️ Low temperature detected. Reduce irrigation.</p>";
    }

    if (satelliteData.soilMoisture < 30) {
        recommendation += "<p>💧 Soil moisture is low. Consider watering the crops.</p>";
    }

    if (satelliteData.vegetationHealth < 50) {
        recommendation += "<p>🌿 Vegetation health is poor. Fertilization may be needed.</p>";
    }

    return recommendation;
}


// Main Function to Fetch Data and Display Recommendations
async function fetchData() {
    const location = document.getElementById("location").value;
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    // Fetch data
    const weatherData = await fetchWeather(location);
    const satelliteData = getSatelliteData(location);
    const recommendations = generateRecommendations(weatherData, satelliteData);

    // Display Results
    document.getElementById("results").innerHTML = recommendations;
}
