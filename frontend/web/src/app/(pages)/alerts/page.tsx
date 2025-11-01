"use client";

import React from "react";
import Image from "next/image";
import alertStyle from "./Alerts.module.css";

const Alerts: React.FC = () => {
  return (
    <>
      {/* Previsão de clima */}
      <div className={alertStyle.weatherForecast}>
        <div className={alertStyle.moboAlert}>
          <Image src="/images/alertMobo.png" alt="" fill />
        </div>

        {/* Pesquisa clima */}
        <div className={alertStyle.weatherSearch} id="weather-search">
          <form id="search" className={alertStyle.searchForm}>
            <i className="fa-solid fa-location-dot"></i>
            <input
              type="search"
              name="city_name"
              id="city_name"
              placeholder="Buscar cidade"
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          <div id="weather" className={alertStyle.weatherBox}>
            <h1>Rolante, BR</h1>

            <div id="infos" className={alertStyle.infos}>
              <div id="temp" className={alertStyle.temp}>
                <div className={alertStyle.tempImg} id="temp-img">
                  <Image
                    src="http://openweathermap.org/img/wn/04d@2x.png"
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>

                <div>
                  <p id="temp-value">32</p>
                  <p id="temp-description">Ensolarado</p>
                </div>
              </div>

              <div id="other-infos" className={alertStyle.otherInfos}>
                <div className={alertStyle.info}>
                  <i
                    id="temp-max-icon"
                    className="fa-solid fa-temperature-high"
                  ></i>

                  <div>
                    <h2 className={alertStyle.weatherTitle}>Temp. max</h2>
                    <p className={alertStyle.txtWeather} id="temp-max">
                      32 <sup>C°</sup>
                    </p>
                  </div>
                </div>

                <div className={alertStyle.info}>
                  <i
                    id="temp-min-icon"
                    className="fa-solid fa-temperature-low"
                  ></i>

                  <div>
                    <h2 className={alertStyle.weatherTitle}>Temp. min</h2>
                    <p className={alertStyle.txtWeather} id="temp-min">
                      12 <sup>C°</sup>
                    </p>
                  </div>
                </div>

                <div className={alertStyle.info}>
                  <i id="humidity-icon" className="fa-solid fa-droplet"></i>

                  <div>
                    <h2 className={alertStyle.weatherTitle}>Humidade</h2>
                    <p className={alertStyle.txtWeather} id="humidity">
                      50%
                    </p>
                  </div>
                </div>

                <div className={alertStyle.info}>
                  <i id="wind-icon" className="fa-solid fa-wind"></i>

                  <div>
                    <h2 className={alertStyle.weatherTitle}>Vento</h2>
                    <p className={alertStyle.txtWeather} id="wind">
                      50 km/h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="alert"></div>
        </div>

        <div className={alertStyle.alerts}>
          <div className={`${alertStyle.card} ${alertStyle.tempAlerts}`}>
            <div className={alertStyle.alertIcons}>
              <Image
                src="/images/icons/sucesso.png"
                alt=""
                width={40}
                height={40}
              />
            </div>
            <h3>Alerta de Temperatura</h3>
            <p>Temperatura estável!</p>
          </div>

          <div className={`${alertStyle.card} ${alertStyle.airHumidity}`}>
            <div className={alertStyle.alertIcons}>
              <Image
                src="/images/icons/alerta.png"
                alt=""
                width={40}
                height={40}
              />
            </div>
            <h3>Alerta de Umidade do Ar</h3>
            <p>Umidade do ar baixa, risco de secura.</p>
          </div>

          <div className={`${alertStyle.card} ${alertStyle.soilHumidity}`}>
            <div className={alertStyle.alertIcons}>
              <Image
                src="/images/icons/alerta.png"
                alt=""
                width={40}
                height={40}
              />
            </div>
            <h3>Alerta de Umidade do Solo</h3>
            <p>Solo seco, irrigação necessária.</p>
          </div>
        </div>
      </div>

      <div className={alertStyle.calendarContainer}>
        <p className={alertStyle.alertTxt}>
          As informações foram coletadas a partir dos dados fornecidos pelo
          braço mecânico, que realizou a análise e a transmissão de dados de
          forma precisa.
        </p>

        <p className={alertStyle.alertTxt2}>
          Para uma visão mais detalhada, explore o menu e consulte as seções
          específicas de cada ferramenta, onde você encontrará as informações
          detalhadas sobre os alertas correspondentes.
        </p>

        <div className={alertStyle.imgAlert}>
          <Image src="/images/mboAlert.png" alt="" width={40} height={40} />
        </div>
      </div>
    </>
  );
};

export default Alerts;
