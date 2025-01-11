import { DateTime } from "luxon";

const API_KEY = '74f578967fd8e36e9ae35d1b1d8e880b'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const iconUrlFromCode = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time:' hh:mm a") => 
  DateTime.fromSeconds(secs).setZone(offset).toFormat(format);

const formatCurrentWeather = (data) => {
  const { coord: { lat, lon }, main: { temp, feels_like, temp_min, temp_max, humidity },
    name, dt, sys: { country, sunrise, sunset }, weather, wind: { speed }, timezone } = data;

  const { main: details, icon } = weather[0];

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
    sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime: formatToLocalTime(dt, timezone)
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);
  return { ...formattedCurrentWeather };
};

export default getFormattedWeatherData;
