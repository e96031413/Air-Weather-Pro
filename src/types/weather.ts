export interface WeatherData {
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
    condition: string;
    icon: string;
    precipChance: number;
    sunrise: string;
    sunset: string;
  };
  hourly: Array<{
    time: string;
    temp: number;
    icon: string;
    chanceOfRain: number;
  }>;
  daily: Array<{
    date: string;
    tempMax: number;
    tempMin: number;
    condition: string;
    icon: string;
    precipChance: number;
  }>;
}

export interface AirQuality {
  pm25: number;
  status: string;
  color: string;
}

export interface City {
  name: string;
  lat: number;
  lon: number;
}