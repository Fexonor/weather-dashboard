import React, { useEffect, useState } from 'react';
import { FaReact } from "react-icons/fa";
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';

function App() {

  const [query, setQuery] = useState({ q: 'london' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    await getFormattedWeatherData({ ...query, units }).then(data => {
      setWeather(data);
    });
    console.log(weather);
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  return (
    <div className='mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700'>
      <TopButtons />
      <Inputs />

      {weather && (
        <>
          <TimeAndLocation  weather={weather}/>
          <TempAndDetails weather={weather}/>
          <Forecast />
          <Forecast />
        </>
      )}

    </div>
  );
}

export default App;
