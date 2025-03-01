import React, { useEffect, useState } from 'react';
import { FaReact } from "react-icons/fa";
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add the missing capitalizeFirstLetter function
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function App() {

  const [query, setQuery] = useState({ q: 'cairo' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {

    const cityName = query.q ? query.q : 'current location';
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);

    await getFormattedWeatherData({ ...query, units }).then(data => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === 'metric' ? 20 : 60; 
    if (weather.temp <= threshold) return 'from-cyan-600 to-blue-700';
    return 'from-yellow-600 to-orange-700';
  }

  return (
 
      <div
            className={`w-full min-h-screen mx-auto py-5 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()} text-white`}
          >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title='3 hour step forecast' data={weather.hourly} />
          <Forecast title='daily forecast' data={weather.daily} />
        </>
      )}
      
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
}

export default App;
