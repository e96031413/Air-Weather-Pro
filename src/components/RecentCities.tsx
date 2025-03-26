import React from 'react';
import { Clock, Star, X } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

const RecentCities = () => {
  const { recentCities, favoritesCities, setDefaultCity, toggleFavorite, removeRecentCity } = useWeatherStore();

  const handleCityClick = (city: any) => {
    setDefaultCity(city);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white bg-opacity-20 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-white" />
          <h2 className="text-xl font-semibold text-white">最近搜尋</h2>
        </div>
        <div className="space-y-2">
          {recentCities.map((city) => (
            <div
              key={`${city.lat}-${city.lon}`}
              className="group flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg text-white hover:bg-opacity-20 transition-colors"
            >
              <button
                onClick={() => handleCityClick(city)}
                className="flex-1 text-left"
              >
                {city.name}
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(city);
                  }}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Star
                    className={`w-5 h-5 ${
                      favoritesCities.some((f) => f.name === city.name)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-white'
                    }`}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRecentCity(city);
                  }}
                  className="opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          ))}
          {recentCities.length === 0 && (
            <div className="text-white text-opacity-60 text-center py-2">
              尚無搜尋紀錄
            </div>
          )}
        </div>
      </div>

      <div className="bg-white bg-opacity-20 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-white" />
          <h2 className="text-xl font-semibold text-white">我的收藏</h2>
        </div>
        <div className="space-y-2">
          {favoritesCities.map((city) => (
            <button
              key={`${city.lat}-${city.lon}`}
              onClick={() => handleCityClick(city)}
              className="w-full flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg text-white hover:bg-opacity-20 transition-colors"
            >
              <span>{city.name}</span>
              <Star
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(city);
                }}
              />
            </button>
          ))}
          {favoritesCities.length === 0 && (
            <div className="text-white text-opacity-60 text-center py-2">
              尚無收藏城市
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentCities;