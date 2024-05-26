import React, { useState, useEffect } from 'react';
import Days from './Days';

const Weather = () => {
    const [city, setCity] = useState('Roanne');
    const [weatherData, setWeatherData] = useState(null);
    const [days, setweatherDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [lang, setLang] = useState("ar-SA");//fr-FR

    function translateIcon(icon) {
        let rt;
        switch (icon) {
            case "01d":case "01n": rt = "sun.svg"; break;
            case "02d":case "02n": rt = "cloudy-sun.svg"; break;
            case "03d":case "03n": rt = "cloudy.svg"; break;
            case "04d":case "04n": rt = "cloudy.svg"; break;
            case "09d":case "09n": rt = "rainy.svg"; break;
            case "10d":case "10n": rt = "rainy.svg"; break;
            case "11d":case "11n": rt = "thunder.svg"; break;
            case "13d":case "13n": rt = "snowy.svg"; break;
            case "50d":case "50n": rt = "windy.svg"; break;
            default: rt = "unknown.svg"; break;
        }
        console.log(icon, rt)
        return "./icons/" + rt;
    }

    const apiRequest = (city) => {
        if (city) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang.split("-")[0]}&units=metric&APPID=${process.env.REACT_APP_OPWEATHER_KEY}`)
                .then(response => response.json())
                .then(json => {
                    if (json.list && json.list.length > 1) {
                        let updatedDays = [];
                        for (let i = 0; i < json.list.length; i++) {
                            let dt = new Date(parseInt(json.list[i].dt) * 1000);
                            json.list[i].dayweek = new Intl.DateTimeFormat(lang, { weekday: "long" }).format(dt);

                            if (!updatedDays.includes(json.list[i].dayweek)) {
                                updatedDays.push(json.list[i].dayweek);
                            }
                        }
                        setweatherDays(updatedDays);
                    }
                    setWeatherData(json);
                })
                .catch(error => console.error(error));
        }
    };

    useEffect(() => {
        apiRequest(city);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        apiRequest(city);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const renderWeather = () => {
        if (!weatherData) return <p>Loading...</p>;

        let weatherForDay;
        if (selectedDay) {
            weatherForDay = weatherData.list.find(item => {
                const dt = new Date(parseInt(item.dt) * 1000);
                const dayOfWeek = new Intl.DateTimeFormat(lang, { weekday: "long" }).format(dt);
                return dayOfWeek === selectedDay;
            });
        } else {
            weatherForDay = weatherData.list[0];
        }

        if (!weatherForDay) return <p>Aucune donnée météo pour ce jour.</p>;

        return (
            <>
                <p>
                    <img src={translateIcon(weatherForDay.weather[0].icon)} alt="weather icon" />
                    <br />
                    <span>{weatherForDay.weather[0].description}</span>
                </p>
                <span className="temperature">{Math.round(weatherForDay.main.temp)}°C</span>
                <div className="wind">Vent {weatherForDay.wind.speed} km/h ({weatherForDay.wind.deg}°)</div>
            </>
        );
    };

    return (
        <div className="row">
            <div className="col s12 m6 push-m3">
                <div className="weather card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">
                            <form onSubmit={handleSubmit}>
                                <input
                                    id="searchCity"
                                    type="text"
                                    placeholder="Enter city name"
                                    value={city}
                                    onChange={handleCityChange}
                                />
                            </form>
                        </span>
                        {renderWeather()}
                    </div>
                    <Days days={days} onDayClick={handleDayClick} />
                </div>
            </div>
        </div>
    );
};

export default Weather;
