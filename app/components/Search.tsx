"use client";
import React, { useState, useEffect } from 'react';

export default function SearchBar () {
  const [city, setCity] = useState('Karachi');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const apiKey = 'dfd89e7ec675397789419d3b0a86f3e5';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []); 

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather();
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl mb-4">Weather App</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 p-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {weatherData && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Wind: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};
