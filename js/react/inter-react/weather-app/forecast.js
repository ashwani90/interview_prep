import React from 'react';

const Forecast = ({ forecastData, unit }) => {
  // Group forecast by day
  const dailyForecast = {};
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        icon: item.weather[0].icon,
        description: item.weather[0].main,
        date: date
      };
    } else {
      if (item.main.temp_min < dailyForecast[date].temp_min) {
        dailyForecast[date].temp_min = item.main.temp_min;
      }
      if (item.main.temp_max > dailyForecast[date].temp_max) {
        dailyForecast[date].temp_max = item.main.temp_max;
      }
    }
  });

  // Convert to array and remove today
  const forecastDays = Object.values(dailyForecast).slice(1, 6);

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-days">
        {forecastDays.map((day, index) => (
          <div key={index} className="forecast-day">
            <p className="forecast-date">{day.date}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
              alt={day.description}
            />
            <p className="forecast-temp">
              {Math.round(day.temp_max)}° / {Math.round(day.temp_min)}°
            </p>
            <p className="forecast-desc">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;