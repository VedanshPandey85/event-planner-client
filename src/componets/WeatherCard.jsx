import React, { useEffect, useState } from "react";
import { Cloud, Sun, Droplets, Wind, Loader2 } from "lucide-react";
import axios from "axios";

const WeatherCard = ({ location, date }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/weather?location=${location}&date=${date}`
        );
        console.log("Weather API Response:", response.data);

        if (!response.data.weather || !response.data.main) {
          throw new Error("Invalid weather data format");
        }

        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data");
      }
    };
    fetchWeather();
  }, [location, date]);

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-red-600 flex items-center gap-3">
        <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <Cloud className="w-6 h-6 text-red-500" />
        </div>
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
        <p className="text-gray-600 font-medium">Loading weather data...</p>
      </div>
    );
  }

  const WeatherMetric = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center gap-4 bg-white/60 p-4 rounded-lg">
      <div
        className={`flex-shrink-0 w-10 h-10 ${color} rounded-full flex items-center justify-center`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Weather Forecast</h3>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center">
          <Sun className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeatherMetric
          icon={Sun}
          label="Condition"
          value={weather.weather[0].description}
          color="bg-yellow-500"
        />
        <WeatherMetric
          icon={Sun}
          label="Temperature"
          value={`${weather.main.temp}°C`}
          color="bg-orange-500"
        />
        <WeatherMetric
          icon={Droplets}
          label="Humidity"
          value={`${weather.main.humidity}%`}
          color="bg-blue-500"
        />
        <WeatherMetric
          icon={Wind}
          label="Wind Speed"
          value={`${weather.wind.speed} m/s`}
          color="bg-indigo-500"
        />
      </div>
    </div>
  );
};

export default WeatherCard;
