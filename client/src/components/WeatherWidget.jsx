import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loader from './Loader';

const WeatherWidget = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, we would get the user's location or a default location
    // For now, we'll use a default city (Paris)
    const fetchWeather = async () => {
      try {
        // Mock weather data for demonstration
        // In a real app, you would use:
        // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`);
        
        // Mock data based on location
        const locationWeatherMap = {
          'Paris, France': {
            name: "Paris",
            sys: { country: "FR" },
            main: { temp: 18, feels_like: 17, humidity: 65 },
            weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
            wind: { speed: 3.5 }
          },
          'Kyoto, Japan': {
            name: "Kyoto",
            sys: { country: "JP" },
            main: { temp: 22, feels_like: 23, humidity: 60 },
            weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }],
            wind: { speed: 2.1 }
          },
          'Santorini, Greece': {
            name: "Santorini",
            sys: { country: "GR" },
            main: { temp: 26, feels_like: 27, humidity: 55 },
            weather: [{ main: "Clear", description: "sunny", icon: "01d" }],
            wind: { speed: 4.2 }
          },
          'Banff, Canada': {
            name: "Banff",
            sys: { country: "CA" },
            main: { temp: 5, feels_like: 2, humidity: 70 },
            weather: [{ main: "Snow", description: "light snow", icon: "13d" }],
            wind: { speed: 5.8 }
          },
          'Machu Picchu, Peru': {
            name: "Machu Picchu",
            sys: { country: "PE" },
            main: { temp: 12, feels_like: 10, humidity: 75 },
            weather: [{ main: "Clouds", description: "broken clouds", icon: "04d" }],
            wind: { speed: 3.0 }
          },
          'Safari in Serengeti, Tanzania': {
            name: "Serengeti",
            sys: { country: "TZ" },
            main: { temp: 28, feels_like: 26, humidity: 50 },
            weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
            wind: { speed: 3.5 }
          },
          'Sydney, Australia': {
            name: "Sydney",
            sys: { country: "AU" },
            main: { temp: 24, feels_like: 25, humidity: 60 },
            weather: [{ main: "Rain", description: "light rain", icon: "10d" }],
            wind: { speed: 6.1 }
          },
          'Reykjavik, Iceland': {
            name: "Reykjavik",
            sys: { country: "IS" },
            main: { temp: 8, feels_like: 6, humidity: 80 },
            weather: [{ main: "Rain", description: "moderate rain", icon: "10d" }],
            wind: { speed: 8.2 }
          }
        };
        
        const mockWeather = locationWeatherMap[location] || locationWeatherMap['Paris, France'];
        
        setWeather(mockWeather);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!weather) return <div>No weather data available</div>;

  return (
    <motion.div 
      className="glass rounded-2xl p-6 max-w-md w-full shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{weather.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">{weather.sys.country}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-gray-800 dark:text-white">{Math.round(weather.main.temp)}°C</div>
          <p className="text-gray-600 dark:text-gray-300 capitalize">{weather.weather[0].description}</p>
        </div>
      </div>

      <div className="flex justify-center my-4">
        {weather.weather[0].icon && (
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description}
            className="w-24 h-24"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">Feels Like</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">{Math.round(weather.main.feels_like)}°C</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">Humidity</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">{weather.main.humidity}%</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">Wind</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">{weather.wind.speed} m/s</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">Condition</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white capitalize">{weather.weather[0].main}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;