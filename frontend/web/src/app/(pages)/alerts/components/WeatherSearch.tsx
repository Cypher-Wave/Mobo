// WeatherSearch.jsx
"use client";

import Image from "next/image";
import { IWeather } from "@/types/Weather";
import styles from "./WeatherSearch.module.css";

interface WeatherSearchProps {
  weather: IWeather | null;
}

const WeatherSearch = ({ weather }: WeatherSearchProps) => {
  if (!weather) return <div className={styles.alert}>Pesquise sua Cidade</div>;

  return (
    <div id="weather" className={styles.weatherBox}>
      <h1 className={styles.city}>{`${weather.city}, ${weather.country}`}</h1>

      <div className={styles.infos}>
        <div className={styles.temp}>
          <div className={styles.tempImg}>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.tempIcon}@2x.png`}
              alt=""
              width={40}
              height={40}
            />
          </div>
          <div className={styles.tempInfos}>
            <p className={styles.tempValue}>
              {weather.temp.toFixed(1).toString().replace(".", ",")}{" "}
              <sup>C°</sup>
            </p>
            <p className={styles.tempDescription}>{weather.description}</p>
          </div>
        </div>

        <div className={styles.otherInfos}>
          <div className={styles.info}>
            <i className={`fa-solid fa-temperature-high ${styles.icon}`}></i>
            <div>
              <h2 className={styles.weatherTitle}>Temp. max</h2>
              <p className={styles.txtWeather}>
                {weather.tempMax.toFixed(1).toString().replace(".", ",")}{" "}
                <sup>C°</sup>
              </p>
            </div>
          </div>

          <div className={styles.info}>
            <i className={`fa-solid fa-temperature-low ${styles.icon}`}></i>
            <div>
              <h2 className={styles.weatherTitle}>Temp. min</h2>
              <p className={styles.txtWeather}>
                {weather.tempMin.toFixed(1).toString().replace(".", ",")}{" "}
                <sup>C°</sup>
              </p>
            </div>
          </div>

          <div className={styles.info}>
            <i className={`fa-solid fa-droplet ${styles.icon}`}></i>
            <div>
              <h2 className={styles.weatherTitle}>Humidade</h2>
              <p className={styles.txtWeather}>{weather.humidity}%</p>
            </div>
          </div>

          <div className={styles.info}>
            <i className={`fa-solid fa-wind ${styles.icon}`}></i>
            <div>
              <h2 className={styles.weatherTitle}>Vento</h2>
              <p className={styles.txtWeather}>
                {weather.windSpeed.toFixed(1)} km/h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
