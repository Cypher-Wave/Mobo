"use client";

import { IWeather } from "@/types/Weather";
import { useState } from "react";

interface OpenWeatherAPIResponse {
  cod: number;
  name: string;
  sys: { country: string };
  main: { temp: number; temp_max: number; temp_min: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}


export default function useWeather() {
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [alertMsg, setAlertMsg] = useState<string>("");

  const fetchWeather = async (cityName: string) => {
    if (!cityName) {
      setWeather(null);
      setAlertMsg("Você precisa digitar uma cidade...");
      return;
    }

    const apiKey = "8a60b2de14f7a17c7a11706b2cfcd87c";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      cityName
    )}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
      const response = await fetch(apiUrl);
      const json: OpenWeatherAPIResponse = await response.json();

      if (json.cod === 200) {
        setWeather({
          city: json.name,
          country: json.sys.country,
          temp: json.main.temp,
          tempMax: json.main.temp_max,
          tempMin: json.main.temp_min,
          description: json.weather[0].description,
          tempIcon: json.weather[0].icon,
          windSpeed: json.wind.speed,
          humidity: json.main.humidity,
        });
        setAlertMsg("");
      } else {
        setWeather(null);
        setAlertMsg("Não foi possível localizar a cidade.");
      }
    } catch (error) {
      setWeather(null);
      setAlertMsg("Erro ao buscar o clima.");
      console.error(error);
    }
  };

  return { weather, alertMsg, fetchWeather };
}
