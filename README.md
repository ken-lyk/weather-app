# Weather App

This project is a simple weather application built using React and Tailwind CSS. It allows users to search for weather information by city or country.

**Live Demo:**  [https://weather-app-1ujj.onrender.com/](https://weather-app-1ujj.onrender.com/)

**Created by:** [ken-lyk]
**Last Worked On:** 2024-03-04

## Features

*   **Searchable Location:**  Users can enter a city or country name to retrieve weather data.
*   **Weather Display:** Displays current weather conditions, including temperature, humidity, and cloud cover.
*   **Search History:**  Keeps a history of recent searches for quick access.
*   **Responsive Design:**  The app is designed to be responsive and work well on various screen sizes (desktop and mobile).
*   **Clear and Simple UI:** Leverages Tailwind CSS for a clean and modern look.
*   **Geolocation access:** The app will get the access of geolocation if user gives it the permission to.
*   **Random City Selection:** (NEW) Dynamically displays weather information for a randomly selected city on initial load. A "🎲" button allows users to select a new random city.
*   **Progressive Web App (PWA) Support:**  Can be installed on users' devices, offering offline access and app-like experience.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **React Hooks:** `useState`, `useEffect`, and `useCallback` for managing state and side effects.
*   **OpenWeatherMap API (or similar):**  An API to fetch weather data. (Remember to sign up for an API key.)
*   **React Toastify:** Library to show the error alerts when users search a city that does not exist.

## Project Structure


## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd weather-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Configure API Key:**

    *   Sign up for an API key from [OpenWeatherMap](https://openweathermap.org/). (or a similar weather API).
    *   Create a `.env` file in the root of your project (if you don't have one already).
    *   Add your API key to the `.env` file:

        ```
        REACT_APP_OPEN_WEATHER_API_KEY=your_api_key_here
        ```

4.  **Start the development server:**

    ```bash
    npm start   # or yarn start
    ```

    This will start the React development server, and you can view the app in your browser at `http://localhost:3000`.

## Key Components

*   **`Weather.js`:**
    *   The main application component.
    *   Manages the overall layout, state, and data flow.
    *   Handles search input, API calls, and data display.

*   **`components/WeatherInfo.js`:**
    *   Component for displaying weather information.
    *   Receives weather data as props and renders the details.

*   **`components/WeatherHistory.js`:**
    *   Component for displaying search history.
    *   Allows users to select previous searches.

*   **`api/services/WeatherService.js`**
    *   API calls to the Weather API
