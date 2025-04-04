import React from 'react';
import { convertShortDate, formatDate, formatShortDate, formatTime } from '../Utilities/DateUtility';
import sun from './../Assets/sun.png'
import { toTitleCase } from '../Utilities/StringUtility';
import { useMediaQuery } from 'react-responsive';

const WeatherInfo = ({ weatherData }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 1028px)' })

    const {
        name: location,
        main: { temp, feels_like, humidity, temp_max, temp_min },
        weather,
        dt,
        sys: { country, sunset, sunrise },
    } = weatherData;

    const condition = weather[0].main;
    const weatherDescription = toTitleCase(weather[0].description);
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;  // Construct URL

    const kelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(0);
    };

    const renderDesktopView = () => {
        //dt -> api response date
        return <div>
            <div className="text-gray-700 text-ms">
                H: {kelvinToCelsius(temp_max)}° L: {kelvinToCelsius(temp_min)}°
                Feels like: {kelvinToCelsius(feels_like)} °C
            </div>
            <div className="flex items-center justify-between text-gray-700 text-ms">
                <div className='font-bold'>{location}, {country}</div>
                <div>{formatDate(dt)}</div>
                <div>Humidity: {humidity}%</div>
                <div>{condition}</div>
            </div>
            <div className="flex items-center justify-between text-gray-700 text-ms">
                <div>Sunrise 🌅: {formatTime(sunrise)}</div>
            </div>
            <div className="flex items-center justify-between text-gray-700 text-ms">
                <div>Sunset 🌇: {formatTime(sunset)}</div>
            </div>
        </div>
    }

    const renderMobileView = () => {
        //dt -> api response date
        return <div className='w-full'>
            <div className="text-gray-700 text-ms">
                H: {kelvinToCelsius(temp_max)}° L: {kelvinToCelsius(temp_min)}°
                Feels like: {kelvinToCelsius(feels_like)} °C
            </div>
            <div className="flex items-center justify-between text-gray-700 text-ms">
                <div className='font-bold'>{location}, {country}</div>
                <div>{formatShortDate(dt)}</div>
            </div>
            <div className="flex items-center justify-between text-gray-700 text-ms">
                <div>Humidity: {humidity}%</div>
                <div>{condition}</div>
            </div>
            <div className="flex items-center justify-between text-gray-700 text-ms">
                <div>Sunrise 🌅: {formatTime(sunrise)}</div>
            </div>
            <div className="flex items-center justify-between text-gray-700 text-ms">
                <div>Sunset 🌇: {formatTime(sunset)}</div>
            </div>
        </div>
    }

    return (
        <div className='min-w-[250px]'>
            <div className="flex w-full items-center mb-2" style={{
                flexDirection: 'row-reverse',
                marginTop: -120,
            }}>
                <img src={sun} alt={''} className="w-48 h-48" />
            </div>
            <div style={{marginTop: -80}}>
                <div className="text-gray-700 font-semibold text-sm mb-2">Today's Weather</div>
                <div className='flex'>
                    <div className="flex w-1/2 items-center mb-3">
                        <span className="text-8xl font-bold text-purple-600 mr-2"> {kelvinToCelsius(temp)}°</span>
                    </div>
                    <div className="flex w-1/2 w-full items-center justify-end">
                        <img src={iconUrl} alt={weatherDescription} className="w-24 h-24" />
                        {!isMobile && <span className="text-sm">{weatherDescription}</span>}
                    </div>
                </div>
                {isMobile && renderMobileView()}
                {!isMobile && renderDesktopView()}
            </div>
        </div>
    );
};


export default WeatherInfo;