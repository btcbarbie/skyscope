// ========================================
// Step 1: Grab references to HTML elements
// We use document.getElementById to "connect" our JS to the HTML
// ========================================
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const errorMsg = document.getElementById('errorMsg');
const themeToggle = document.getElementById('themeToggle');
const weatherCard = document.getElementById('weatherCard');
const cityName = document.getElementById('cityName');
const weatherDesc = document.getElementById('weatherDesc');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// ========================================
// Step 2: The main function — fetches weather data
// "async" because we need to wait for the server to respond
// ========================================
async function getWeather() {
    // Get the city text the user typed, and remove extra spaces
    const city = cityInput.value.trim();

    // If the input is empty, show an error and stop
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    // Clear any previous error messages
    clearError();

    // Hide the weather card while we're loading
    weatherCard.classList.add('hidden');

    try {
        // Call OUR server's API route (not OpenWeather directly!)
        // encodeURIComponent handles special characters in city names
        // e.g., "São Paulo" becomes "S%C3%A3o%20Paulo"
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);

        // Parse the JSON response from our server
        const data = await response.json();

        // If the response was not OK (status 400, 404, 500, etc.)
        if (!response.ok) {
            showError(data.error || 'Something went wrong');
            return;
        }

        // ✅ Success! Display the weather data
        displayWeather(data);

    } catch (error) {
        // Network error (no internet, server not running, etc.)
        showError('Could not connect to the server');
    }
}

// ========================================
// Step 3: Display weather data on the page
// Takes the data object and fills in the HTML elements
// ========================================
function displayWeather(data) {
    // Set the text content of each element
    cityName.textContent = data.city;
    weatherDesc.textContent = data.description;
    temperature.textContent = `${data.temperature}°C`;
    humidity.textContent = `${data.humidity}%`;
    windSpeed.textContent = `${data.windSpeed} m/s`;

    // Remove the "hidden" class to show the weather card
    weatherCard.classList.remove('hidden');
}

// ========================================
// Step 4: Helper functions for error messages
// ========================================
function showError(message) {
    errorMsg.textContent = message;
    weatherCard.classList.add('hidden');
}

function clearError() {
    errorMsg.textContent = '';
}

// ========================================
// Step 5: Event listeners — respond to user actions
// ========================================

// When the user clicks the "Search" button, run getWeather
searchBtn.addEventListener('click', getWeather);

// When the user presses Enter in the input field, also run getWeather
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeather();
    }
});

// ========================================
// Step 6: Theme toggle — switch between light and dark mode
// ========================================

// Check if user previously chose a theme (saved in localStorage)
// localStorage is like a tiny database in the browser that survives page refreshes
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeToggle.textContent = '☀️';
}

// When the toggle button is clicked, switch themes
themeToggle.addEventListener('click', () => {
    // Toggle the "light" class on the body element
    document.body.classList.toggle('light');

    // Check which mode we're now in
    const isLight = document.body.classList.contains('light');

    // Update the button emoji (sun for light mode, moon for dark mode)
    themeToggle.textContent = isLight ? '☀️' : '🌙';

    // Save the user's preference so it persists after page refresh
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
