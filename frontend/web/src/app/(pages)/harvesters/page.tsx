"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./Harvester.css";

const Harvester: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <h1>Configurações do Braço Mecânico</h1>
      {/* Camêra */}

      <div className="camera-container">
        <div className="camera">
          {/* Visor da Câmera */}
          <video className="video" id="video" autoPlay></video>
        </div>
        <div className="harvester-area">
          {/* Controles da Câmera */}
          <p className="txt-button">Botões</p>
          <div className="controls" id="controls">
            <button id="take-photo">
              <div className="button">
                <Image src="/images/icons/camera.png" alt="Foto" fill />
              </div>
              <p className="txt-icon">Foto</p>
            </button>
            <button id="start-recording">
              <div className="button">
                <Image src="/images/icons/camera-de-video.png" alt="Video" fill />
              </div>
              <p className="txt-icon">Video</p>
            </button>
            <button id="stop-recording" disabled>
              <div className="button">
                <Image src="/images/icons/pare.png" alt="Parar" fill />
              </div>
              <p className="txt-icon">Parar</p>
            </button>
            <button id="toggle-fullscreen">
              <div className="button">
                <Image src="/images/icons/expandir.png" alt="Expandir" fill />
              </div>
              <p className="txt-icon">Expandir</p>
            </button>
          </div>
          <div className="controls" id="controls">
            <button>
              <div className="button">
                <Image src="/images/icons/relampago.png" alt="Flash" fill />
              </div>
              <p className="txt-icon">Flash</p>
            </button>
            <button>
              <div className="button">
                <Image src="/images/icons/sem-flash.png" alt="Sem Flash" fill />
              </div>
              <p className="txt-icon">Sem Flash</p>
            </button>
            <button>
              <div className="button">
                <Image src="/images/mais-zoom.png" alt="+Zoom" fill />
              </div>
              <p className="txt-icon">+Zoom</p>
            </button>
            <button>
              <div className="button">
                <Image src="/images/reduzir-o-zoom.png" alt="-Zoom" fill />
              </div>
              <p className="txt-icon">-Zoom</p>
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/profile")}
          >
            Visualizar Registros de Fotos
          </button>
        </div>
      </div>

      <div className="map">
        <iframe
          className="map-area"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58104.267122994366!2d-47.850728627694984!3d-24.467547991622677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c53436f4f0c1cb%3A0xbab60b5cc9451e73!2sRegistro%2C%20SP%2C%2011900-000!5e0!3m2!1spt-BR!2sbr!4v1729989897108!5m2!1spt-BR!2sbr"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="map-button">
          <button className="btn btn-primary">Adicionar Sensores</button>
          <button className="btn btn-primary">Ativar Alertas</button>
        </div>

        <button className="btn-speed">
          <div className="btn-big">
            <Image src="/images/icons/btnMaior.png" alt="" fill />
          </div>
        </button>
        <div className="remote">
          {/* Botão Central de Stop */}
          <button className="center-button">START</button>

          {/* Botões de Direção */}
          <div className="direction-buttons">
            <button className="direction-button up">
              {" "}
              <div className="btn-up">
                <Image src="/images/icons/btnCima.png" alt="" fill />
              </div>
            </button>
            <button className="direction-button down">
              <div className="btn-down">
                <Image src="/images/icons/btnBaixo.png" alt="" fill />
              </div>
            </button>
            <button className="direction-button left">
              <div className="btn-left">
                <Image src="/images/icons/btnEsquerda.png" alt="" fill />
              </div>
            </button>
            <button className="direction-button right">
              <div className="btn-right">
                <Image src="/images/icons/btnDireita.png" alt="" fill />
              </div>
            </button>
          </div>
        </div>
        <button className="btn-speed">
          <div className="btn-small">
            <Image src="/images/icons/btnMenor.png" alt="" fill />
          </div>
        </button>
      </div>

      <div className="harvester-area">
        <div className="harvester-direction">
          <Image src="/images/icons/direcao.png" alt="" fill />
        </div>
        <div className="harvester">
          <Image src="/images/icons/garra.png" alt="" fill />
        </div>
      </div>
    </>
  );
};

export default Harvester;
