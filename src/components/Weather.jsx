import React, { useState, useEffect } from 'react';
import Days from './Days'

const Weather = () => {
    const [city, setCity] = useState('Roanne');
    const [weatherData, setWeatherData] = useState(null);
    const [weatherAvgDay, setweatherAvgDay] = useState(null);
    const [lang, setLang] = useState("fr-FR");

    // Fonction pour effectuer la requête API
    const apiRequest = (city) => {
        if (city) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},fr&APPID=${process.env.REACT_APP_OPWEATHER_KEY}`)
                .then(response => response.json())
                .then(json => {
                    if(json.list && json.list.length > 1){
                        let cptDay=0;
                        let day = 0;
                        for(let i = 0; i<json.list.length; i++){
                            let dt = new Date(parseInt(json.list[i].dt) * 1000);
                            json.list[i].dayweek = new Intl.DateTimeFormat(lang, {weekday: "long"}).format(dt);
                            console.log(dt);
                        }

                    }
                    setWeatherData(json)
                })
                .catch(error => console.error(error));
        }
    };

    // Requête api
    useEffect(() => {
        apiRequest(city);
    }, []);

    // A l'envoi du Form
    const handleSubmit = (e) => {
        e.preventDefault();
        apiRequest(city);
    };

    // Permet le changement de l'imput à cause de value={}
    const handleCityChange = (e) => {
        setCity(e.target.value);
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
                        {weatherData ? (
                            <>
                                <p><img src="icons/sun.svg" alt="weather icon" /></p>
                                <span className="temperature">{Math.round(weatherData.list[0].main.temp - 273.15)}°C</span>
                                <div className="wind">Vent {weatherData.list[0].wind.speed} km/h ({weatherData.list[0].wind.deg}°)</div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <Days/>
                </div>
            </div>
        </div>
    );
};

export default Weather;
