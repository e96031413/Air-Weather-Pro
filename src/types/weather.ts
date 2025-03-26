export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    icon: string;
  };
  daily: Array<{
    date: string;
    tempMax: number;
    tempMin: number;
    condition: string;
    icon: string;
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