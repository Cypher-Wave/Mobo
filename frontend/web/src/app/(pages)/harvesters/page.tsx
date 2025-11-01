"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import harvestStyle from "./Harvester.module.css";

const Harvester: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <h1>Configurações do Braço Mecânico</h1>

      <div className={harvestStyle.cameraContainer}>
        <div className={harvestStyle.camera}>
          <video className={harvestStyle.video} id="video" autoPlay></video>
        </div>

        <div className={harvestStyle.harvesterArea}>
          <p className={harvestStyle.txtButton}>Botões</p>

          <div className={harvestStyle.controls} id="controls">
            <button className={harvestStyle.controlsCamera} id="take-photo">
              <div className={harvestStyle.button}>
                <Image src="/images/icons/camera.png" alt="Foto" fill />
              </div>
              <p className={harvestStyle.txtIcon}>Foto</p>
            </button>

            <button
              className={harvestStyle.controlsCamera}
              id="start-recording"
            >
              <div className={harvestStyle.button}>
                <Image
                  src="/images/icons/camera-de-video.png"
                  alt="Video"
                  fill
                />
              </div>
              <p className={harvestStyle.txtIcon}>Video</p>
            </button>

            <button
              className={harvestStyle.controlsCamera}
              id="stop-recording"
              disabled
            >
              <div className={harvestStyle.button}>
                <Image src="/images/icons/pare.png" alt="Parar" fill />
              </div>
              <p className={harvestStyle.txtIcon}>Parar</p>
            </button>

            <button
              className={harvestStyle.controlsCamera}
              id="toggle-fullscreen"
            >
              <div className={harvestStyle.button}>
                <Image src="/images/icons/expandir.png" alt="Expandir" fill />
              </div>
              <p className={harvestStyle.txtIcon}>Expandir</p>
            </button>
          </div>

          <div className={harvestStyle.controls} id="controls">
            <button className={harvestStyle.controlsCamera}>
              <div className={harvestStyle.button}>
                <Image src="/images/icons/relampago.png" alt="Flash" fill />
              </div>
              <p className={harvestStyle.txtIcon}>Flash</p>
            </button>

            <button className={harvestStyle.controlsCamera}>
              <div className={harvestStyle.button}>
                <Image src="/images/icons/sem-flash.png" alt="Sem Flash" fill />
              </div>
              <p className={harvestStyle.txtIcon}>Sem Flash</p>
            </button>

            <button className={harvestStyle.controlsCamera}>
              <div className={harvestStyle.button}>
                <Image src="/images/mais-zoom.png" alt="+Zoom" fill />
              </div>
              <p className={harvestStyle.txtIcon}>+Zoom</p>
            </button>

            <button className={harvestStyle.controlsCamera}>
              <div className={harvestStyle.button}>
                <Image
                  src="/images/reduzir-o-zoom.png"
                  alt="-Zoom"
                  fill
                />
              </div>
              <p className={harvestStyle.txtIcon}>-Zoom</p>
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

      <div className={harvestStyle.map}>
        <iframe
          className={harvestStyle.mapArea}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58104.267122994366!2d-47.850728627694984!3d-24.467547991622677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c53436f4f0c1cb%3A0xbab60b5cc9451e73!2sRegistro%2C%20SP%2C%2011900-000!5e0!3m2!1spt-BR!2sbr!4v1729989897108!5m2!1spt-BR!2sbr"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className={harvestStyle.mapButton}>
          <button className="btn btn-primary">Adicionar Sensores</button>
          <button className="btn btn-primary">Ativar Alertas</button>
        </div>

        <button className={harvestStyle.btnSpeed}>
          <div className={harvestStyle.btnBig}>
            <Image src="/images/icons/btnMaior.png" alt="" fill />
          </div>
        </button>

        <div className={harvestStyle.remote}>
          <button className={harvestStyle.centerButton}>START</button>

          <div className={harvestStyle.directionButtons}>
            <button className={`${harvestStyle.directionButton} ${harvestStyle.up}`}>
              <div className={harvestStyle.btnUp}>
                <Image src="/images/icons/btnCima.png" alt="" fill />
              </div>
            </button>

            <button className={`${harvestStyle.directionButton} ${harvestStyle.down}`}>
              <div className={harvestStyle.btnDown}>
                <Image src="/images/icons/btnBaixo.png" alt="" fill />
              </div>
            </button>

            <button className={`${harvestStyle.directionButton} ${harvestStyle.left}`}>
              <div className={harvestStyle.btnLeft}>
                <Image src="/images/icons/btnEsquerda.png" alt="" fill />
              </div>
            </button>

            <button className={`${harvestStyle.directionButton} ${harvestStyle.right}`}>
              <div className={harvestStyle.btnRight}>
                <Image src="/images/icons/btnDireita.png" alt="" fill />
              </div>
            </button>
          </div>
        </div>

        <button className={harvestStyle.btnSpeed}>
          <div className={harvestStyle.btnSmall}>
            <Image src="/images/icons/btnMenor.png" alt="" fill />
          </div>
        </button>
      </div>

      <div className={harvestStyle.harvesterArea}>
        <div className={harvestStyle.harvesterDirection}>
          <Image src="/images/icons/direcao.png" alt="" fill />
        </div>
        <div className={harvestStyle.harvester}>
          <Image src="/images/icons/garra.png" alt="" fill />
        </div>
      </div>
    </>
  );
};

export default Harvester;
