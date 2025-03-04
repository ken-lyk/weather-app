const API_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=' + process.env.REACT_APP_OPEN_WEATHER_API_KEY

export const getWeatherByCity = async (city = 'SG') => {
    try {
        const weatherResponse = await fetch(`${API_URL}&q=${city}`);
        const weatherData = await weatherResponse.json();
        return weatherData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getWeatherByCityId = async (id = 0) => {
    try {
        const weatherResponse = await fetch(`${API_URL}&id=${id}`);
        const weatherData = await weatherResponse.json();
        return weatherData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const getWeatherByLocation = async (city) => {
    try {
        const lat = city?.coord?.lat ?? ''
        const lon = city?.coord?.lon ?? ''
        const weatherResponse = await fetch(`${API_URL}&lat=${lat}&lon=${lon}`);
        const weatherData = await weatherResponse.json();
        return weatherData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};