import React, { useEffect, useState } from "react";
import getWeather from "../services";
import { Stack, Typography, Box, TextField } from "@mui/material";

const Weather = () => {
  const [temperature, setTemperature] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedWeather = JSON.parse(localStorage.getItem("weather"));
      return (storedWeather?.temp - 273.15).toFixed(1) || null;
    }
  });

  const [sky, setSky] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedSky = JSON.parse(localStorage.getItem("sky"));
      return storedSky || null;
    }
  });
  const [city, setCity] = useState("tehran");
  const [errorMessage, setERR] = useState(null);
  if (typeof window !== "undefined" && window.localStorage) {
    console.log("looocal", localStorage.getItem("weather"));
    console.log("sky", localStorage.getItem("sky"));
  }
  console.log("city", city);
  async function getWeatherData() {
    try {
      const response = await getWeather(city);
      console.log("response", response);

      const temperatureInCelsius = (response?.main.temp - 273.15).toFixed(1);

      setTemperature(temperatureInCelsius);
      setSky(response?.weather[0].description);

      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("weather", JSON.stringify(response.main));
        localStorage.setItem(
          "sky",
          JSON.stringify(response.weather[0].description)
        );
        console.log("looocal", localStorage.getItem("weather"));
        console.log("sky", localStorage.getItem("sky"));
      }

      return response;
    } catch (error) {
      console.error("error", error);
      setERR(error);
    }
  }
  useEffect(() => {
    getWeatherData();
  }, [city]);

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          minWidth: "350px",
          backgroundColor: "#f2f2f2",
          borderRadius: "10px",
          padding: 3,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <TextField
          onChange={(e) => {
            setCity(e.target.value);
            localStorage.setItem("city", city);
          }}
          value={city}
          placeholder="enter City Name"
        />
        <Typography my={2} variant="h5">
          City: {city}
        </Typography>
        <Typography my={2} variant="h5">
          Temperature: {temperature}°C
        </Typography>
        <Typography my={2} variant="h5">
          Sky: {sky}
        </Typography>
      </Stack>
    </>
  );
};

export default Weather;
