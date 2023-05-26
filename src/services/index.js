import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY ='c3404c3ad6ea4412ad1c5f6ce3a41ff9'
async function getWeather(cityName) {
    try {
      // const { latitude, longitude } = await getGeolocation(cityName);
  
      const response = await axios.get(API_URL, {
        params: {
          q: cityName,
          appid: API_KEY
        },
      });
  
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  }

export default getWeather;
