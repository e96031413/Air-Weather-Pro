import create from 'zustand';
import { persist } from 'zustand/middleware';
import type { City } from '../types/weather';

interface WeatherStore {
  recentCities: City[];
  defaultCity: City | null;
  favoritesCities: City[];
  apiKey: string;
  addRecentCity: (city: City) => void;
  removeRecentCity: (city: City) => void;
  setDefaultCity: (city: City) => void;
  toggleFavorite: (city: City) => void;
  setApiKey: (key: string) => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      recentCities: [],
      defaultCity: null,
      favoritesCities: [],
      apiKey: '',
      
      addRecentCity: (city) =>
        set((state) => {
          const filtered = state.recentCities.filter(
            (c) => c.name !== city.name
          );
          return {
            recentCities: [city, ...filtered].slice(0, 5),
          };
        }),

      removeRecentCity: (city) =>
        set((state) => ({
          recentCities: state.recentCities.filter(
            (c) => c.name !== city.name
          ),
        })),
      
      setDefaultCity: (city) =>
        set(() => ({
          defaultCity: city,
        })),
      
      toggleFavorite: (city) =>
        set((state) => {
          const exists = state.favoritesCities.some(
            (c) => c.name === city.name
          );
          return {
            favoritesCities: exists
              ? state.favoritesCities.filter((c) => c.name !== city.name)
              : [...state.favoritesCities, city],
          };
        }),

      setApiKey: (key) =>
        set(() => ({
          apiKey: key,
        })),
    }),
    {
      name: 'weather-storage',
    }
  )
);