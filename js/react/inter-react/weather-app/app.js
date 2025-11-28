import React, { useState } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import './styles/App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');

  const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Location not found');
      }
      
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      // Fetch forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit}&appid=${API_KEY}`
      );
      
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
      
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (weatherData) {
      fetchWeatherData(weatherData.name);
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <WeatherForm onSearch={fetchWeatherData} />
      <button onClick={toggleUnit} className="unit-toggle">
        Switch to {unit === 'metric' ? '°F' : '°C'}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <WeatherDisplay 
          weatherData={weatherData} 
          forecastData={forecastData} 
          unit={unit}
        />
      )}
    </div>
  );
}

export default App;