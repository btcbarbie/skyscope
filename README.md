# 🌤️ SkyScope — Weather Dashboard

A clean, real-time weather dashboard built with Node.js, Express, and the OpenWeather API.  
Enter any city name and get current temperature, humidity, wind speed, and conditions — instantly.

![SkyScope Dark Mode](https://img.shields.io/badge/theme-dark-1e1b4b?style=flat-square)
![SkyScope Light Mode](https://img.shields.io/badge/theme-light-c7d2fe?style=flat-square)
![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933?style=flat-square&logo=node.js&logoColor=white)

---

## Features

- 🔍 Search weather by city name
- 🌡️ Temperature in Celsius
- 💧 Humidity percentage
- 💨 Wind speed (m/s)
- 🌙 Dark / ☀️ Light mode toggle (persists across sessions)
- 🔐 API key stays hidden on the server (never exposed to the browser)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| Frontend | Vanilla HTML, CSS, JavaScript |
| API | [OpenWeather Current Weather](https://openweathermap.org/current) |
| Env Management | dotenv |

## Project Structure

```
skyscope/
├── server.js            # Express server with /api/weather route
├── public/
│   ├── index.html       # Page structure
│   ├── style.css        # Glassmorphism dark/light theme
│   └── script.js        # Frontend logic & theme toggle
├── .env                 # API key (not committed)
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A free [OpenWeather API key](https://openweathermap.org/api)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/btcbarbie/skyscope.git
cd skyscope

# 2. Install dependencies
npm install

# 3. Create a .env file with your API key
echo "OPENWEATHER_API_KEY=your_key_here" > .env

# 4. Start the server
node server.js
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

```
Browser → GET /api/weather?city=London
              ↓
Express server → calls OpenWeather API (with hidden API key)
              ↓
Returns clean JSON → { city, temperature, description, humidity, windSpeed }
              ↓
Frontend displays the data in a styled card
```

The backend acts as a **proxy** — it keeps your API key secret and only sends the relevant weather fields to the browser.

## License

MIT
