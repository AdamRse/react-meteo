import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from "./components/Weather"
import Header from "./components/Header"
import Days from "./components/Days"

function WeatherComponent() {
  const [city, setCity] = useState('Roanne');
  const [data, setData] = useState(null);

  useEffect(() => {
    if (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},fr&APPID=cleAPI`)
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error));
    }
  }, [city]);

  return (
    <div>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name" 
      />
      {data ? <pre className='test'>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}
function App() {
  const [city, setCity] = useState('Roanne');
  const handleSearchCity = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className="App">
      <Header onSearchCity={handleSearchCity}/>
      <Weather/>
      <WeatherComponent city={city}/>
      <Days/>
    </div>
  );
}

export default App;
