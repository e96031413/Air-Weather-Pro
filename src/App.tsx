import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Cloud, MapPin, Search } from 'lucide-react';
import WeatherDisplay from './components/WeatherDisplay';
import CitySearch from './components/CitySearch';
import RecentCities from './components/RecentCities';
import ApiKeySetup from './components/ApiKeySetup';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8 relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Cloud className="w-10 h-10 text-white" />
              <h1 className="text-4xl font-bold text-white">Air Weather Pro</h1>
            </div>
            <ApiKeySetup />
            <CitySearch />
          </header>
          
          <main>
            <WeatherDisplay />
            <RecentCities />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;