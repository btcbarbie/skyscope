// Step 1: Load environment variables from .env file
// This reads .env and puts OPENWEATHER_API_KEY into process.env
require('dotenv').config();

// Step 2: Import Express framework
const express = require('express');

// Step 3: Create the Express app (our server instance)
const app = express();

// Step 4: Define the port (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// Step 5: Serve static files from the "public" folder
// Any file inside /public is automatically available to the browser
// Example: public/index.html → http://localhost:3000/index.html
app.use(express.static('public'));

// Step 6: Define our weather API route
// When someone visits /api/weather?city=London, this function runs
app.get('/api/weather', async (req, res) => {

    // Grab the city name from the query string (?city=London → "London")
    const city = req.query.city;

    // If no city was provided, send back a 400 (Bad Request) error
    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        // Get the API key from environment variables (loaded from .env)
        const apiKey = process.env.OPENWEATHER_API_KEY;

        // Build the OpenWeather API URL
        // units=metric → temperature in Celsius (not Kelvin)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        // Call the OpenWeather API and wait for the response
        const response = await fetch(url);
        const data = await response.json();

        // If OpenWeather says the city was not found (or other error)
        if (data.cod !== 200) {
            return res.status(404).json({ error: data.message });
        }

        // Send back only the data we need (clean, simple response)
        res.json({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        });

    } catch (error) {
        // If something unexpected goes wrong (network error, etc.)
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Step 7: Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`🌤️  SkyScope running at http://localhost:${PORT}`);
});
