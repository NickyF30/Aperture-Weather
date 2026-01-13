# Aperture Weather

### The Photographer's Essential Planning Tool

## 1. Project Overview

**Aperture Weather** is a specialized, full-stack weather application designed specifically for photographers and cinematographers. While standard weather apps provide basic temperature and precipitation data, Aperture Weather interprets meteorological data to answer the question: *"Is it good conditions to shoot right now?"*

Built with a modern **React 19** frontend and a high-performance **Fastify** backend, the application aggregates complex data points-such as cloud ceiling, visibility, air quality, and sun phases-to calculate a dynamic "Photography Score." This tool aids creators in planning shoots by identifying Golden Hour opportunities, tracking light quality, and ensuring gear safety against environmental hazards.

## 2. Key Features

### Dynamic Photography Score (Algorithm)
At the core of the application is a custom evaluation algorithm that analyzes real-time weather conditions to generate a **0-10 suitability score** for photography.
* **Light Quality Analysis:** Utilizing `SunCalc`, the app mathematically determines specific light phases (Golden Hour, Blue Hour, Night, Day) and cross-references them with cloud cover.
    * *Example:* High cloud cover during Golden Hour results in a lower score, whereas 30-70% cloud cover creates "epic" texture, boosting the score.
* **Condition Weighting:** The algorithm penalizes for poor visibility (haze), high UV index (harsh shadows), and extreme wind speeds (tripod instability).
* **Gear Safety:** specific warnings are triggered for freezing temperatures, high heat, or rain.

###  Location Intelligence
* **Real-time Geolocation:** Instantly retrieves local weather data based on the user's browser position.
* **Global City Search:** robust search functionality backed by the OpenWeather Geocoding API allows users to scout locations anywhere in the world.

###  Advanced Meteorological Metrics
Beyond basic temperature, the dashboard visualizes critical photography metrics:
* **Visibility & Haze:** Measured in meters/kilometers to predict atmospheric clarity.
* **Air Quality Index (AQI):** Tracks pollutants (PM2.5, PM10) which affect long-distance shots and sky clarity.
* **Sun Phases:** Precise calculation of Sunrise, Sunset, Golden Hour, and Blue Hour times.
* **Cloud Coverage:** Percentage-based cloud data to predict lighting diffusion.

###  Favorites System
* **Persistent Storage:** Users can save favourite cities.
* **State Management:** Implemented via custom React hooks and LocalStorage.

###  Modern "Bento-Grid" UI
* **Responsive Design:** A layout built with **Tailwind CSS** that adapts seamlessly from desktop planning to mobile field use.
* **Data Visualization:** Clean, card-based layout using **shadcn** primitives for accessibility and structure.

## 3. Technical Stack

### Frontend
| Technology | Usage |
| :--- | :--- |
| **React 19** | Core UI library for component-based architecture. |
| **TypeScript** | Ensures type safety across props, API responses, and state. |
| **Vite** | Next-generation frontend tooling for rapid development. |
| **TanStack Query** | Manages server state, caching, and data synchronization. |
| **Tailwind CSS** | Utility-first CSS framework for rapid, responsive styling. |
| **SunCalc** | Mathematical library for calculating sun position and phases. |
| **Lucide React** | Consistent, lightweight icon set. |

### Backend
| Technology | Usage |
| :--- | :--- |
| **Node.js** | Runtime environment. |
| **Fastify** | High-performance, low-overhead web framework. |
| **Zod** | TypeScript-first schema declaration and validation. |
| **Dotenv** | Environment variable management. |

### External APIs
* **OpenWeatherMap API:**
    * *Current Weather Data*
    * *5-Day / 3-Hour Forecast*
    * *Air Pollution API* (for AQI)
    * *Geocoding API* (Direct & Reverse)

### Testing
* **Vitest:** Fast unit test framework.
* **React Testing Library:** Testing UI components in a way that resembles user usage.

## 4. Architecture

Aperture Weather employs a **Client-Server architecture** to ensure security and data integrity.

1.  **The Backend (Proxy Layer):**
    * The Fastify server acts as a secure proxy to the OpenWeatherMap API. This hides the API keys from the client-side browser network tab.
    * It exposes a unified RESTful API structure (e.g., `/api/weather`, `/api/search`) and validates incoming requests using **Zod** schemas to ensure latitude/longitude or query strings are malformed.
    * It aggregates data from multiple external endpoints (Weather + AQI + UV) into a single optimized JSON response.

2.  **The Frontend (Presentation Layer):**
    * **State Management:** `TanStack Query` handles fetching, caching, and updating weather data. This minimizes network requests when switching between tabs or favorite cities.
    * **Logic:** The `calculatePhotoScore` function (located in `src/lib/utils.ts`) processes the raw JSON data client-side to derive the qualitative "Verdict" and "Reasons" displayed to the user.

## 5. Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v18+ recommended)
* npm 
* An OpenWeatherMap API Key

### 1. Clone the Repository
```bash
git clone [https://github.com/nickyf30/aperture-weather.git](https://github.com/nickyf30/aperture-weather.git)
cd aperture-weather
```
### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```
Create a .env file in the backend root:
```bash
PORT=3001
OPENWEATHER_API_KEY=your_api_key_here
```
Start the backend server:
```bash
npm run dev
```
### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd frontend
npm install
```
Start the react development server:
```bash
npm run dev
```


