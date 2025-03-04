import React, { useEffect, useState } from 'react';
import bgWhite from './../Assets/bg-light.png';
// import bgDark from './../Assets/bg-dark.png';
import Cities from './Cities.json'
import Countries from './Countries.json'
import { getWeatherByLocation } from '../api/services/WeatherServices';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import WeatherInfo from './WeatherInfo';
import WeatherHistory from './WeatherHistory';

const Weather = () => {
    // const [backgroundImage, setBackgroundImage] = useState(bgWhite); // Initial image
    let defaultHistories = []

    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory && storedHistory !== null) {
        const storedHistoryObj = JSON.parse(storedHistory) ?? []
        if (storedHistoryObj.length > 0) {
            defaultHistories = storedHistoryObj
        }
    }


    const [searchCity, setSearchCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [histories, setHistories] = useState(defaultHistories)
    const DEFAULT_CITY = 'Singapore'

    const getDefaultCity = () => {
        const city = Cities.find(x => x.name.toLowerCase() === DEFAULT_CITY.toLowerCase())
        let location = {
            city: city,
            countryCode: city?.country,
            countryName: Countries.find(x => x.code === city?.country)?.name ?? '',
            id: city?.id,
            created: new Date(),
            index: histories.length
        }
        return location
    }

    const [selectedData, setSelectedData] = useState(defaultHistories.length > 0 ? defaultHistories[0] : getDefaultCity())

    useEffect(() => {
        const countryCodeList = [...new Set(Cities.map(x => x.country))]
        const availableCountries = []
        Countries.forEach(element => {
            if (countryCodeList.includes(element.code)) {
                availableCountries.push(element)
            }
        });

        if (defaultHistories.length === 0) {
            let permissions = navigator.permissions.query({ name: 'geolocation' })
            if (permissions.then((result) => result.state === 'denied')) {
                setSelectedData(getDefaultCity())
            }
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    let city = {
                        coords: {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        }
                    }
                    let result = await getWeatherByLocation(city)
                    if (result.status === 200) {
                        setWeatherData(result)
                    }
                    else {
                        setSelectedData(getDefaultCity())
                    }
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                    alert(error)
                }
            });
        }

    }, [])

    // useEffect(() => {
    //     setBackgroundImage(isDarkMode ? bgDark : bgWhite)
    // }, [isDarkMode])

    const onSearchCityChange = (event) => {
        setSearchCity(event.target.value)
    };

    const onSearchCityClicked = (event) => {
        let city = undefined
        if (searchCity && searchCity !== null && searchCity !== '') {
            city = Cities.find(x => x.name.toLowerCase() === searchCity.toLowerCase())
        }
        if (city === undefined) {
            let country = Countries.find(x => x.code.toLowerCase() === searchCity.toLowerCase())

            if (country) {
                city = Cities.find(x => x.name.toLowerCase() === country.name.toLowerCase())
            }
        }
        if (city) {
            let location = {
                city: city,
                countryCode: city?.country,
                countryName: Countries.find(x => x.code === city?.country)?.name ?? '',
                id: city?.id,
                created: new Date(),
                index: histories.length
            }
            setSelectedData(location)
            setSearchCity('')
        }
        else {
            toast.error("Oops! We couldn't find that place. Maybe try checking the spelling?", {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const onRandomCityClicked = (event) => {
        const randomIndex = Math.floor(Math.random() * Cities.length);
        const city = Cities[randomIndex]

        if (city) {
            let location = {
                city: city,
                countryCode: city?.country,
                countryName: Countries.find(x => x.code === city?.country)?.name ?? '',
                id: city?.id,
                created: new Date(),
                index: histories.length
            }
            setSelectedData(location)
            setSearchCity('')
        }
    };

    const getWeatherData = async () => {
        try {
            if (selectedData && selectedData !== null) {
                let city = selectedData?.city ?? undefined
                if (city) {
                    let result = await getWeatherByLocation(city)
                    setWeatherData(result)
                    setSelectedData(null)
                }
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert(error)
        }
    };

    useEffect(() => {
        if (selectedData && selectedData !== null) {
            const isContains = histories.find(x => x.id === selectedData.id)
            if (!isContains) {
                const newHistories = [...histories, selectedData]
                setHistories(newHistories)
                localStorage.setItem('searchHistory', JSON.stringify(newHistories));
            }
        }
        //getData
        getWeatherData()
    }, [selectedData])

    const onDeleteHistory = (id) => {
        if(id) {
            let newHistories = histories.filter(x => x.id !== id)
            setHistories(newHistories)
        }
    }

    const onSelectHistory = (id) => {
        if(id) {
            let history = histories.find(x => x.id === id)
            if (history) {
                setSelectedData(history)
            }
        }
    }

    return (
        <div className="flex justify-around items-start" 
            style={{
                backgroundImage: `url(${bgWhite})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '100%'
            }}>
            <div className="w-full p-6 px-10 md:w-2/3">
                <div className="flex items-center bg-white/50 rounded-lg p-2 mb-4">
                    <input
                        type="text"
                        id="country"
                        value={searchCity}
                        onChange={onSearchCityChange}
                        placeholder={"Country / City"}
                        className="bg-transparent border-none p-2 flex-grow text-gray-800 focus:outline-none"
                    />
                    <button
                        onClick={onRandomCityClicked}
                        className="bg-purple-600 text-white rounded-md px-3 py-2 hover:bg-purple-500">
                        🎲
                    </button>
                    <div className='p-1' />
                    <button 
                        onClick={onSearchCityClicked}
                        className="bg-purple-600 text-white rounded-md px-3 py-2 hover:bg-purple-500">
                        🔍
                    </button>
                </div>

                <div className='pt-20'>

                </div>
                <div className="bg-white/50 rounded-lg p-6 mb-4">
                    {weatherData !== null &&
                        <WeatherInfo weatherData={weatherData} />
                    }
                    {histories.length > 0 &&
                        <WeatherHistory
                            historyData={histories}
                            onDelete={onDeleteHistory}
                            onSelect={onSelectHistory}
                        />
                    }
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </div>
        </div>
    );
};

export default Weather;