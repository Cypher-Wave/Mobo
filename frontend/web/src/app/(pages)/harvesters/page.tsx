"use client";

import React from "react";
import Image from "next/image";
import "./Harvester.css";

const Harvester: React.FC = () => {
  return (
    <>
      <h1 className="txt">Configurações do Braço Mecânico</h1>
      {/* Camêra */}
      <div className="camera">
        {/* Visor da Câmera */}
        <video className="visor" id="video" autoPlay></video>
      </div>
      <div className=" column">
        <canvas className="is-hidden" id="canvas"></canvas>
      </div>

      <div className="areaBraco">
        {/* Controles da Câmera */}
        <div id="controls">
          <p className="btnTxt">Botões</p>
          <button id="take-photo">
            <Image
              className="botoes"
              src="/images/icons/camera (1).png"
              alt=""
              width={40}
              height={40}
            />
            <p className="txticons">Foto</p>
          </button>
          <button id="start-recording">
            <Image
              className="botoes"
              src="/images/icons/camera-de-video.png"
              alt=""
              width={40}
              height={40}
            />
            <p className="txticons">Video</p>
          </button>
          <button id="stop-recording" disabled>
            <Image
              className="botoes"
              src="/images/icons/pare.png"
              alt=""
              width={40}
              height={40}
            />
            <p className="txticons">Parar</p>
          </button>
          <button id="toggle-fullscreen">
            <Image
              className="botoes2"
              src="/images/icons/expandir.png"
              alt=""
              width={40}
              height={40}
            />
            <p className="txticons">Expandir</p>
          </button>
        </div>

        <div className="areaBraco2">
          <button>
            <Image
              className="botoes"
              src="/images/icons/relampago.png"
              alt=""
              width={40}
              height={40}
            />
            <p className="txticons">Flash</p>
          </button>
          <button>
            <Image
              className="botoes"
              src="/images/icons/sem-flash.png"
              alt=""
              width={40}
              height={40}
            />
            <p className="txticons">Sem Flash</p>
          </button>
          <button>
            <Image
              className="botoes"
              src="/images/mais-zoom (1).png"
              alt=""
              width={40}
              height={40}
            />
            <p className="txticons">+Zoom</p>
          </button>
          <button>
            <Image
              className="botoes"
              src="/images/reduzir-o-zoom (1).png"
              alt=""
              width={40}
              height={40}
            />
            <p className="txticons">-Zoom</p>
          </button>
        </div>
        <a className="txtgaleria" href="/profile">
          Visualizar Registros de Fotos
        </a>
      </div>

      <div className="mapa">
        <iframe
          className="areaMapa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58104.267122994366!2d-47.850728627694984!3d-24.467547991622677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c53436f4f0c1cb%3A0xbab60b5cc9451e73!2sRegistro%2C%20SP%2C%2011900-000!5e0!3m2!1spt-BR!2sbr!4v1729989897108!5m2!1spt-BR!2sbr"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="btnsMapa">
          <button className="txtMapa">Adicionar Sensores</button>
        </div>
        <div className="btnsMapa2">
          <button className="txtMapa">Ativar Alertas</button>
        </div>
      </div>

      <button className="btnVelocidade">
        <Image src="/images/icons/btnMaior.png" alt="" width={90} height={40} />
      </button>
      <button className="btnVelocidadeM">
        <Image src="/images/icons/btnMenor.png" alt="" width={90} height={40} />
      </button>

      <div className="remote">
        {/* Botão Central de Stop */}
        <button className="center-button">START</button>

        {/* Botões de Direção */}
        <div className="direction-buttons">
          <button className="direction-button up">
            {" "}
            <Image
              src="/images/icons/btnCima.png"
              alt=""
              width={43}
              height={40}
            />
          </button>
          <button className="direction-button down">
            <Image
              src="/images/icons/btnBaixo.png"
              alt=""
              width={43}
              height={40}
            />
          </button>
          <button className="direction-button left">
            <Image
              src="/images/icons/btnEsquerda.png"
              alt=""
              width={33}
              height={40}
            />
          </button>
          <button className="direction-button right">
            <Image
              src="/images/icons/btnDireita.png"
              alt=""
              width={33}
              height={40}
            />
          </button>
        </div>
      </div>

      <div className="areaGarra">
        <Image
          className="direcaoGarra"
          src="/images/icons/direcao.png"
          alt=""
          width={40}
          height={40}
        />
        <Image
          className="garra"
          src="/images/icons/garra.png"
          alt=""
          width={40}
          height={40}
        />
      </div>
    </>
  );
};

export default Harvester;
