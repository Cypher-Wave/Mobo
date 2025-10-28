"use client";

import React from "react";
import Image from "next/image";
import "./Alerts.css";

const Alerts: React.FC = () => {
  return (
  <>
    <h1 className="txt">Alertas</h1>
    <div className="container">
        {/* Previsão de clima */}
        <div className="previsao-clima">
            <Image className="moboAlert" src="/images/alertMobo.png" alt="" width={40} height={40} />
            {/* Pesquisa clima  */}
            <div className="psqClima" id="container">
                <form id="search">
                    <i className="fa-solid fa-location-dot"></i>
                    <input type="search" name="city_name" id="city_name" placeholder="Buscar cidade" />
                    <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                <div id="weather">
                    <h1>Rolante, BR</h1>
                    <div id="infos">
                        <div id="temp">
                            <Image id="temp_img" src="http://openweathermap.org/img/wn/04d@2x.png" alt="" width={40} height={40} />
                            <div>
                                <p id="temp_value">
                                    32 
                                </p>
                                <p id="temp_description">
                                    Ensolarado
                                </p>
                            </div>
                        </div>

                        <div id="other_infos">
                            <div className="info">
                                <i id="temp_max_icon" className="fa-solid fa-temperature-high"></i>
                                <div>
                                    <h2 className="tituloClima">Temp. max</h2>
    
                                    <p className="txtClima" id="temp_max">
                                        32 <sup>C°</sup>
                                    </p>
                                </div>
                            </div>
    
                            <div className="info">
                                <i id="temp_min_icon" className="fa-solid fa-temperature-low"></i>
    
                                <div>
                                    <h2 className="tituloClima">Temp. min</h2>
    
                                    <p className="txtClima" id="temp_min">
                                        12 <sup>C°</sup>
                                    </p>
                                </div>
                            </div>
    
                            <div className="info">
                                <i id="humidity_icon" className="fa-solid fa-droplet"></i>
    
                                <div>
                                    <h2 className="tituloClima">Humidade</h2>
    
                                    <p className="txtClima" id="humidity">
                                        50%
                                    </p>
                                </div>
                            </div>
    
                            <div className="info">
                                <i id="wind_icon" className="fa-solid fa-wind"></i>
    
                                <div>
                                    <h2 className="tituloClima">Vento</h2>
    
                                    <p className="txtClima" id="wind">
                                        50 km/h
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="alert"></div>
            </div>

            <div className="alertas">
                <div className="card alerta-temperatura">
                    <Image className="alertIcons1" src="/images/icons/sucesso.png" alt="" width={40} height={40} />
                    <h3>Alerta de Temperatura</h3>
                    <p>Temperatura estavel!</p>
                </div>
                <div className="card alerta-umidade-ar">
                    <Image className="alertIcons" src="/images/icons/alerta.png" alt="" width={40} height={40} />
                    <h3>Alerta de Umidade do Ar</h3>
                    <p>Umidade do ar baixa, risco de secura.</p>
                </div>
                <div className="card alerta-umidade-solo">
                    <Image className="alertIcons" src="/images/icons/alerta.png" alt="" width={40} height={40} />
                    <h3>Alerta de Umidade do Solo</h3>
                    <p>Solo seco, irrigação necessária.</p>
                </div>
            </div>
        </div>

        <div className="container2">
            <div className="calendar">
                <div className="month">
                <button className="prev">&lt;</button>
                <h3>Novembro 2024</h3>
                <button className="next">&gt;</button>
            </div>
            <div className="weekdays">
                <span>Dom</span>
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
            </div>
            <div className="days">
                {/* Exemplo de dias (adicione dinamicamente conforme necessário) */}
                <span className="prev-month">29</span>
                <span className="prev-month">30</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
                <span>13</span>
                <span>14</span>
                <span>15</span>
                <span>16</span>
                <span>17</span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
                <span>21</span>
                <span>22</span>
                <span>23</span>
                <span>24</span>
                <span>25</span>
                <span>26</span>
                <span>27</span>
                <span>28</span>
                <span>29</span>
                <span>30</span>
            </div>
        </div>

        <p className="txtAlerta">As informações foram coletadas a partir dos dados fornecidos pelo braço mecânico, que realizou a análise e a transmissão de dados de forma precisa.</p> 
        <p className="txtAlerta2">Para uma visão mais detalhada, explore o menu e consulte as seções específicas de cada ferramenta,
         onde você encontrará as informações detalhadas sobre os alertas correspondentes.</p>
        <Image className="imgAlert" src="/images/mboAlert.png" alt="" width={40} height={40} />
    </div>
</div>
  </>
);
};

export default Alerts;
