import React, { Component } from 'react';

// Déclaration du composant Weather qui étend React.Component
export default class Weather extends Component {
    constructor(props) {
        super(props);
        // Initialisation de l'état du composant avec la ville par défaut "Roanne" et aucune donnée météo
        this.state = {
            city: 'Roanne',
            weatherData: null
        };
    }

    // Méthode appelée automatiquement après que le composant est monté (inséré dans le DOM)
    componentDidMount() {
        // Appel de la méthode apiRequest avec la ville par défaut pour récupérer les données météo
        this.apiRequest(this.state.city);
    }

    // Méthode pour effectuer une requête API à OpenWeatherMap avec la ville spécifiée
    apiRequest(city) {
        if (city) {
            // Construction de l'URL de l'API avec la clé API et le nom de la ville
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},fr&APPID=${process.env.REACT_APP_OPWEATHER_KEY}`)
                .then(response => response.json()) // Conversion de la réponse en JSON
                .then(json => this.setState({ weatherData: json })) // Mise à jour de l'état avec les données récupérées
                .catch(error => console.error(error)); // Affichage des erreurs dans la console
        }
    }

    // Méthode pour gérer les changements de l'input de la ville
    handleCityChange = (e) => {
        // Mise à jour de l'état avec la nouvelle valeur de la ville
        this.setState({ city: e.target.value });
    };

    // Méthode pour gérer les événements de pression de touche dans l'input de la ville
    handleKeyDown = (e) => {
        // Si la touche pressée est "Entrée"
        if (e.key === 'Enter') {
            // Appel de la méthode apiRequest avec la ville actuelle pour récupérer les nouvelles données météo
            this.apiRequest(this.state.city);
        }
    };

    // Méthode de rendu pour afficher le composant
    render() {
        // Déstructuration pour obtenir la ville et les données météo de l'état
        const { city, weatherData } = this.state;
        return (
            <div className="row">
                <div className="col s12 m6 push-m3">
                    <div className="weather card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">
                                <input
                                    id="searchCity"
                                    type="text"
                                    placeholder="Enter city name"
                                    value={city} // Valeur de l'input liée à l'état de la ville
                                    onChange={this.handleCityChange} // Gestionnaire pour les changements de valeur de l'input
                                    onKeyDown={this.handleKeyDown} // Gestionnaire pour les événements de pression de touche
                                />
                            </span>
                            {weatherData ? ( // Affichage conditionnel des données météo
                                <>
                                    <p><img src="icons/sun.svg" alt="weather icon" /></p>
                                    <span className="temperature">{Math.round(weatherData.main.temp - 273.15)}°C</span> {/* Conversion de la température de Kelvin en Celsius */}
                                    <div className="wind">Vent {weatherData.wind.speed} km/h ({weatherData.wind.deg}°)</div> {/* Affichage des informations sur le vent */}
                                </>
                            ) : (
                                <p>Loading...</p> // Affichage d'un message de chargement si les données météo ne sont pas encore disponibles
                            )}
                        </div>
                        <div className="card-action">
                            <a href="#">Thursday</a>
                            <a href="#">Friday</a>
                            <a href="#">Saturday</a>
                            <a href="#">Sunday</a>
                            <a href="#">Monday</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
