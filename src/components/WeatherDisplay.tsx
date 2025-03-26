import React from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { Sun, Cloud, Wind, Droplets, Key, CloudRain } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';
import type { WeatherData, AirQuality } from '../types/weather';

// 簡體轉繁體對照表
const simplifiedToTraditional: { [key: string]: string } = {
  '晴': '晴',
  '多云': '多雲',
  '局部多云': '局部多雲',
  '阴': '陰',
  '小雨': '小雨',
  '中雨': '中雨',
  '大雨': '大雨',
  '雷阵雨': '雷陣雨',
  '阵雨': '陣雨',
  '雾': '霧',
  '雪': '雪',
  '小雪': '小雪',
  '中雪': '中雪',
  '大雪': '大雪',
  '雨夹雪': '雨夾雪',
  '阵雪': '陣雪',
  '雷阵雨伴有冰雹': '雷陣雨伴有冰雹',
  '强阵雨': '強陣雨',
  '强雷阵雨': '強雷陣雨',
  '局部阵雨': '局部陣雨',
  '局部雷阵雨': '局部雷陣雨',
  '局部小雨': '局部小雨',
  '局部中雨': '局部中雨',
  '局部大雨': '局部大雨',
  '阴天': '陰天',
  '多云转晴': '多雲轉晴',
  '晴转多云': '晴轉多雲',
  '阴转多云': '陰轉多雲',
  '多云转阴': '多雲轉陰',
  '台湾': '台灣',
  '高雄市': '高雄市',
};

const convertToTraditional = (text: string): string => {
  // 處理地區名稱中的簡體字
  return text.split(/[,，]/).map(part => {
    const trimmed = part.trim();
    return simplifiedToTraditional[trimmed] || trimmed;
  }).join(', ');
};

const WeatherDisplay = () => {
  const defaultCity = useWeatherStore((state) => state.defaultCity);
  const apiKey = useWeatherStore((state) => state.apiKey);

  const { data: weather, isLoading, error: weatherError } = useQuery<WeatherData>(
    ['weather', defaultCity?.name],
    async () => {
      if (!defaultCity || !apiKey) return null;
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${defaultCity.lat},${defaultCity.lon}&days=3&aqi=yes&lang=zh`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        return {
          current: {
            temp: data.current.temp_c,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_kph,
            condition: convertToTraditional(data.current.condition.text),
            icon: data.current.condition.icon.replace('http:', 'https:'),
            precipChance: data.forecast.forecastday[0].day.daily_chance_of_rain,
          },
          daily: data.forecast.forecastday.map((day: any) => ({
            date: day.date,
            tempMax: day.day.maxtemp_c,
            tempMin: day.day.mintemp_c,
            condition: convertToTraditional(day.day.condition.text),
            icon: day.day.condition.icon.replace('http:', 'https:'),
            precipChance: day.day.daily_chance_of_rain,
          })),
        };
      } catch (error) {
        console.error('Weather fetch error:', error);
        throw error;
      }
    },
    {
      enabled: !!defaultCity && !!apiKey,
      retry: 2,
    }
  );

  const { data: airQuality, error: airQualityError } = useQuery<AirQuality>(
    ['air-quality', defaultCity?.name],
    async () => {
      if (!defaultCity || !apiKey) return null;
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${defaultCity.lat},${defaultCity.lon}&aqi=yes&lang=zh`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Air quality API error: ${response.status}`);
        }

        const data = await response.json();
        const pm25 = data.current.air_quality.pm2_5;

        let status = '';
        let color = '';
        
        if (pm25 <= 15.4) {
          status = '優';
          color = 'text-green-600';
        } else if (pm25 <= 35.4) {
          status = '良好';
          color = 'text-yellow-600';
        } else if (pm25 <= 54.4) {
          status = '輕度污染';
          color = 'text-orange-600';
        } else if (pm25 <= 150.4) {
          status = '中度污染';
          color = 'text-red-600';
        } else if (pm25 <= 250.4) {
          status = '重度污染';
          color = 'text-purple-600';
        } else {
          status = '嚴重污染';
          color = 'text-red-900';
        }

        return {
          pm25: Number(pm25.toFixed(1)),
          status,
          color,
        };
      } catch (error) {
        console.error('Air quality fetch error:', error);
        throw error;
      }
    },
    {
      enabled: !!defaultCity && !!apiKey,
      retry: 2,
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

  if (weatherError || airQualityError) {
    return (
      <div className="text-center text-white bg-red-500 bg-opacity-20 rounded-lg p-4">
        <p className="text-lg">載入資料時發生錯誤，請確認：</p>
        <ul className="list-disc list-inside mt-2">
          <li>API 金鑰是否正確</li>
          <li>網路連線是否正常</li>
          <li>WeatherAPI.com 服務是否可用</li>
        </ul>
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
    <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{convertToTraditional(defaultCity.name)}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="current-weather">
          <h3 className="text-xl font-semibold mb-4">目前天氣</h3>
          <div className="flex flex-col items-center md:items-start md:flex-row gap-4">
            <div className="text-5xl md:text-6xl font-bold text-center md:text-left">{weather?.current.temp}°C</div>
            <div className="w-full text-center md:text-left">
              <p className="text-lg mb-2">{weather?.current.condition}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <Wind className="w-4 h-4" />
                  <span>{weather?.current.windSpeed} 公里/時</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4" />
                  <span>{weather?.current.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <CloudRain className="w-4 h-4" />
                  <span>降雨機率 {weather?.current.precipChance}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="air-quality">
          <h3 className="text-xl font-semibold mb-4">空氣品質</h3>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="text-3xl md:text-4xl font-bold mb-2">PM2.5: {airQuality?.pm25} µg/m³</div>
            <p className={`text-lg font-semibold ${airQuality?.color}`}>
              {airQuality?.status}
            </p>
          </div>
        </div>
      </div>

      <div className="forecast mt-8">
        <h3 className="text-xl font-semibold mb-4">3天預報</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {weather?.daily.map((day) => (
            <div key={day.date} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold">{format(new Date(day.date), 'EEE')}</p>
              <img src={day.icon} alt={day.condition} className="w-10 h-10 mx-auto my-2" />
              <p className="text-sm mb-1">
                {day.tempMax}° <span className="text-gray-500">{day.tempMin}°</span>
              </p>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                <CloudRain className="w-3 h-3" />
                <span>{day.precipChance}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
