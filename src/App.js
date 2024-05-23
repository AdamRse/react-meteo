import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from "./components/Weather"
import Header from "./components/Header"
import Days from "./components/Days"

function App() {

  return (
    <div className="App">
      <Header/>
      <Weather/>
      <Days/>
    </div>
  );
}

export default App;
