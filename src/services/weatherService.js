const API_KEY = '74f578967fd8e36e9ae35d1b1d8e880b'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType)
  url.search = new URLSearchParams({...searchParams, appid: API_KEY})

  return fetch(url)
  .then((res) => res.json())
  .then((data) => data);
};

export default getWeatherData;