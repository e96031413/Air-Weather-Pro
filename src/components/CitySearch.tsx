import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';
import type { City } from '../types/weather';

const CitySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const { addRecentCity, setDefaultCity, apiKey } = useWeatherStore();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length < 2 || !apiKey) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(value)}&lang=zh`
      );
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      setResults(data.map((item: any) => ({
        name: `${item.name}${item.region ? `, ${item.region}` : ''}${item.country ? `, ${item.country}` : ''}`,
        lat: item.lat,
        lon: item.lon,
      })));
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
  };

  const handleSelectCity = (city: City) => {
    setDefaultCity(city);
    addRecentCity(city);
    setSearchTerm('');
    setResults([]);
  };

  if (!apiKey) {
    return null;
  }

  return (
    <div className="relative max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="搜尋城市..."
          className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-75 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-white opacity-75" />
      </div>

      {results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10">
          {results.map((city) => (
            <button
              key={`${city.lat}-${city.lon}`}
              onClick={() => handleSelectCity(city)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
            >
              {city.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;