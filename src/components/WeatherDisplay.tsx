import React from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { Sun, Cloud, Wind, Droplets, Key } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';
import type { WeatherData, AirQuality } from '../types/weather';

const WeatherDisplay = () => {
  const defaultCity = useWeatherStore((state) => state.defaultCity);
  const apiKey = useWeatherStore((state) => state.apiKey);

  const { data: weather, isLoading } = useQuery<WeatherData>(
    ['weather', defaultCity?.name],
    async () => {
      if (!defaultCity || !apiKey) return null;
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${defaultCity.lat},${defaultCity.lon}&days=7&aqi=yes&lang=zh`
      );
      if (!response.ok) {
        throw new Error('Weather API request failed');
      }
      const data = await response.json();
      return {
        current: {
          temp: data.current.temp_c,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_kph,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
        },
        daily: data.forecast.forecastday.map((day: any) => ({
          date: day.date,
          tempMax: day.day.maxtemp_c,
          tempMin: day.day.mintemp_c,
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
        })),
      };
    },
    {
      enabled: !!defaultCity && !!apiKey,
    }
  );

  const { data: airQuality } = useQuery<AirQuality>(
    ['air-quality', defaultCity?.name],
    async () => {
      if (!defaultCity || !apiKey) return null;
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${defaultCity.lat},${defaultCity.lon}&aqi=yes&lang=zh`
      );
      if (!response.ok) {
        throw new Error('Air quality API request failed');
      }
      const data = await response.json();
      const aqi = data.current.air_quality['us-epa-index'];
      return {
        aqi,
        pm25: data.current.air_quality.pm2_5,
        status: 
          aqi <= 1 ? '良好' :
          aqi <= 2 ? '普通' :
          aqi <= 3 ? '不佳' :
          aqi <= 4 ? '很差' : '危險',
      };
    },
    {
      enabled: !!defaultCity && !!apiKey,
    }
  );

  if (!apiKey) {
    return (
      <div className="text-center text-white">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Key className="w-6 h-6" />
          <p className="text-lg">請設定 API 金鑰以查看天氣資訊</p>
        </div>
      </div>
    );
  }

  if (!defaultCity) {
    return (
      <div className="text-center text-white">
        <p>請選擇城市以查看天氣資訊</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center text-white">
        <p>載入天氣資料中...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="current-weather">
          <h2 className="text-2xl font-bold mb-4">目前天氣</h2>
          <div className="flex items-center gap-4">
            <div className="text-6xl font-bold">{weather?.current.temp}°C</div>
            <div>
              <p className="text-lg">{weather?.current.condition}</p>
              <div className="flex items-center gap-2 text-gray-600">
                <Wind className="w-4 h-4" />
                <span>{weather?.current.windSpeed} 公里/時</span>
                <Droplets className="w-4 h-4 ml-2" />
                <span>{weather?.current.humidity}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="air-quality">
          <h2 className="text-2xl font-bold mb-4">空氣品質</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="text-4xl font-bold mb-2">AQI: {airQuality?.aqi}</div>
            <p className="text-lg">PM2.5: {airQuality?.pm25} µg/m³</p>
            <p className={`text-lg font-semibold ${
              airQuality?.status === '良好' ? 'text-green-600' :
              airQuality?.status === '普通' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {airQuality?.status}
            </p>
          </div>
        </div>
      </div>

      <div className="forecast mt-8">
        <h2 className="text-2xl font-bold mb-4">7天預報</h2>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {weather?.daily.map((day) => (
            <div key={day.date} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold">{format(new Date(day.date), 'EEE')}</p>
              <img src={day.icon} alt={day.condition} className="w-12 h-12 mx-auto my-2" />
              <p className="text-sm">
                {day.tempMax}° <span className="text-gray-500">{day.tempMin}°</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;