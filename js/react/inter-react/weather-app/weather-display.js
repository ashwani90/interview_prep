import React from 'react';
import Forecast from './Forecast';

const WeatherDisplay = ({ weatherData, forecastData, unit }) => {
  const { name, main, weather, wind, clouds, sys } = weatherData;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather-display">
      <div className="current-weather">
        <h2>{name}, {sys.country}</h2>
        <div className="weather-main">
          <img src={iconUrl} alt={weather[0].description} />
          <div>
            <p className="temperature">
              {Math.round(main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </p>
            <p className="description">{weather[0].description}</p>
          </div>
        </div>
        <div className="weather-details">
          <div>
            <span>Feels like:</span>
            <span>{Math.round(main.feels_like)}°</span>
          </div>
          <div>
            <span>Humidity:</span>
            <span>{main.humidity}%</span>
          </div>
          <div>
            <span>Wind:</span>
            <span>{wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</span>
          </div>
          <div>
            <span>Cloudiness:</span>
            <span>{clouds.all}%</span>
          </div>
          <div>
            <span>Pressure:</span>
            <span>{main.pressure} hPa</span>
          </div>
        </div>
      </div>
      
      {forecastData && <Forecast forecastData={forecastData} unit={unit} />}
    </div>
  );
};

export default WeatherDisplay;