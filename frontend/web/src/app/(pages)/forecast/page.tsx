"use client";

import React from "react";
import Image from "next/image";
import "./Forecast.css";

const Forecast: React.FC = () => {
  return (
    <>
      <h1>Previsão Colheita</h1>
      <div className="containerCalendario">
        <div className="left">
          <div className="calendar">
            <div className="month">
              <i className="fas fa-angle-left prev"></i>
              <div className="date">Outubro 2024</div>
              <i className="fas fa-angle-right next"></i>
            </div>
            <div className="weekdays">
              <div>Seg</div>
              <div>Ter</div>
              <div>Qua</div>
              <div>Qui</div>
              <div>Sex</div>
              <div>Sáb</div>
              <div>Dom</div>
            </div>
            <div className="days"></div>
            <div className="goto-today">
              <div className="goto">
                <input
                  type="text"
                  placeholder="mes/ano"
                  className="date-input"
                />
                <button className="goto-btn">Procurar</button>
              </div>
              <button className="today-btn">Hoje</button>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="today-date">
            <div className="event-day"></div>
            <div className="event-date">30 de Outubro de 2024</div>
          </div>
          <div className="events"></div>
          <div className="add-event-wrapper">
            <div className="add-event-header">
              <div className="title">Adicionar Evento</div>
              <i className="fas fa-times close"></i>
            </div>
            <div className="add-event-body">
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Título"
                  className="event-name"
                />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Hora Inicio"
                  className="event-time-from"
                />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Hora Termino"
                  className="event-time-to"
                />
              </div>
            </div>
            <div className="add-event-footer">
              <button className="add-event-btn">Adicionar Marcação</button>
            </div>
          </div>
        </div>
        <button className="add-event">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </>
  );
};

export default Forecast;
