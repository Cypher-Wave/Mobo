"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import WeatherSearch from "./components/WeatherSearch";
import useWeather from "./hooks/useWeather";
import styles from "./Alerts.module.css";

const Alerts = () => {
  const { weather, alertMsg, fetchWeather } = useWeather();
  const [city, setCity] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchWeather(city);
  };

  return (
    <>
      {/* Previsão de clima */}
      <div className={styles.weatherForecast}>
        <div className={styles.moboAlert}>
          <Image src="/images/alertMobo.png" alt="" fill />
        </div>

        {/* Pesquisa clima */}
        <div className={styles.weatherSearch} id="weather-search">
          <form
            id="search"
            className={styles.searchForm}
            onSubmit={handleSubmit}
          >
            <i className="fa-solid fa-location-dot"></i>
            <input
              className={styles.input}
              type="search"
              name="city_name"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Buscar cidade"
            />
            <button className={styles.button} type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div id="alert">{alertMsg}</div>
        </div>

        <div className={styles.alerts}>
          <div className={styles.card}>
            <div className={styles.alertIcons}>
              <Image
                src="/images/icons/sucesso.png"
                alt=""
                width={40}
                height={40}
              />
            </div>
            <h3 className={styles.h3}>Alerta de Temperatura</h3>
            <p className={styles.p}>Temperatura estável!</p>
          </div>

          <div className={styles.card}>
            <div className={styles.alertIcons}>
              <Image
                src="/images/icons/alerta.png"
                alt=""
                width={40}
                height={40}
              />
            </div>
            <h3 className={styles.h3}>Alerta de Umidade do Ar</h3>
            <p className={styles.p}>Umidade do ar baixa, risco de secura.</p>
          </div>

          <div className={styles.card}>
            <div className={styles.alertIcons}>
              <Image
                src="/images/icons/alerta.png"
                alt=""
                width={40}
                height={40}
              />
            </div>
            <h3 className={styles.h3}>Alerta de Umidade do Solo</h3>
            <p className={styles.p}>Solo seco, irrigação necessária.</p>
          </div>
        </div>
      </div>

      <div className={styles.calendarContainer}>
        <p className={styles.alertTxt}>
          As informações foram coletadas a partir dos dados fornecidos pelo
          braço mecânico, que realizou a análise e a transmissão de dados de
          forma precisa.
        </p>

        <p className={styles.alertTxt2}>
          Para uma visão mais detalhada, explore o menu e consulte as seções
          específicas de cada ferramenta, onde você encontrará as informações
          detalhadas sobre os alertas correspondentes.
        </p>

        <div className={styles.weatherComponent}>
          <WeatherSearch weather={weather} />
        </div>

        <div className={styles.imgAlert}>
          <Image src="/images/mboAlert.png" alt="" width={400} height={400} />
        </div>
      </div>
    </>
  );
};

export default Alerts;
