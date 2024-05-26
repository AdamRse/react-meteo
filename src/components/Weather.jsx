import React, { useState, useEffect } from 'react';
import Days from './Days'

const Weather = () => {
    const [city, setCity] = useState('Roanne');
    const [weatherData, setWeatherData] = useState(null);
    const [days, setweatherDays] = useState([]);
    const [lang, setLang] = useState("fr-FR");

    function translateIcon(icon){
        let rt;
        switch (icon){
            case "01d":rt="sun.svg"; break;
            case "02d":rt="cloudy-sun.svg"; break;
            case "03d":rt="cloudy.svg"; break;
            case "04d":rt="cloudy.svg"; break;
            case "09d":rt="rainy.svg"; break;
            case "10d":rt="rainy.svg"; break;
            case "11d":rt="thunder.svg"; break;
            case "13d":rt="snowy.svg"; break;
            case "50d":rt="windy.svg"; break;
        }
          
        return "./icons/"+rt;
    }

    // Fonction pour effectuer la requête API
    const apiRequest = (city) => {
        if (city) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang.split("-")[0]}&units=metric&APPID=${process.env.REACT_APP_OPWEATHER_KEY}`)
                .then(response => response.json())
                .then(json => {
                    if(json.list && json.list.length > 1){
                        let cptDay=0;
                        let day = 0;
                        for(let i = 0; i<json.list.length; i++){
                            
                            let dt = new Date(parseInt(json.list[i].dt) * 1000);
                            json.list[i].dayweek = new Intl.DateTimeFormat(lang, {weekday: "long"}).format(dt);

                            //On rajoutte les jours de la semaine
                            let isDay = false;
                            days.forEach(d => {
                                if(d==json.list[i].dayweek)
                                    isDay=true;
                            })
                            if(!isDay) days.push(json.list[i].dayweek);
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
                                <p>
                                    <img src={translateIcon(weatherData.list[0].weather[0].icon)} alt="weather icon" />
                                    <br/>
                                    <span>{weatherData.list[0].weather[0].description}</span>
                                </p>
                                <span className="temperature">{Math.round(weatherData.list[0].main.temp)}°C</span>
                                <div className="wind">Vent {weatherData.list[0].wind.speed} km/h ({weatherData.list[0].wind.deg}°)</div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <Days days={days}/>
                </div>
            </div>
        </div>
    );
};

export default Weather;
