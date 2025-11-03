"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Harvester.module.css";

const Harvester = () => {
  const router = useRouter();

  return (
    <>
      <div className={styles.cameraContainer}>
        <div className={styles.camera}>
          <video className={styles.video} id="video" autoPlay></video>
        </div>

        <div className={styles.harvesterArea}>
          <p className={styles.txtButton}>Botões</p>

          <div className={styles.controls} id="controls">
            <button className={styles.controlsCamera} id="take-photo">
              <div className={styles.button}>
                <Image src="/images/icons/camera.png" alt="Foto" fill />
              </div>
              <p className={styles.txtIcon}>Foto</p>
            </button>

            <button className={styles.controlsCamera} id="start-recording">
              <div className={styles.button}>
                <Image
                  src="/images/icons/camera-de-video.png"
                  alt="Video"
                  fill
                />
              </div>
              <p className={styles.txtIcon}>Video</p>
            </button>

            <button
              className={styles.controlsCamera}
              id="stop-recording"
              disabled
            >
              <div className={styles.button}>
                <Image src="/images/icons/pare.png" alt="Parar" fill />
              </div>
              <p className={styles.txtIcon}>Parar</p>
            </button>

            <button className={styles.controlsCamera} id="toggle-fullscreen">
              <div className={styles.button}>
                <Image src="/images/icons/expandir.png" alt="Expandir" fill />
              </div>
              <p className={styles.txtIcon}>Expandir</p>
            </button>
          </div>

          <div className={styles.controls} id="controls">
            <button className={styles.controlsCamera}>
              <div className={styles.button}>
                <Image src="/images/icons/relampago.png" alt="Flash" fill />
              </div>
              <p className={styles.txtIcon}>Flash</p>
            </button>

            <button className={styles.controlsCamera}>
              <div className={styles.button}>
                <Image src="/images/icons/sem-flash.png" alt="Sem Flash" fill />
              </div>
              <p className={styles.txtIcon}>Sem Flash</p>
            </button>

            <button className={styles.controlsCamera}>
              <div className={styles.button}>
                <Image src="/images/mais-zoom.png" alt="+Zoom" fill />
              </div>
              <p className={styles.txtIcon}>+Zoom</p>
            </button>

            <button className={styles.controlsCamera}>
              <div className={styles.button}>
                <Image src="/images/reduzir-o-zoom.png" alt="-Zoom" fill />
              </div>
              <p className={styles.txtIcon}>-Zoom</p>
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

      <div className={styles.controlContainer}>
        <div className={styles.map}>
          <iframe
            className={styles.mapArea}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58104.267122994366!2d-47.850728627694984!3d-24.467547991622677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c53436f4f0c1cb%3A0xbab60b5cc9451e73!2sRegistro%2C%20SP%2C%2011900-000!5e0!3m2!1spt-BR!2sbr!4v1729989897108!5m2!1spt-BR!2sbr"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className={styles.mapButton}>
            <button className="btn btn-primary">Adicionar Sensores</button>
            <button className="btn btn-primary">Ativar Alertas</button>
          </div>
          <button className={`${styles.btnSpeed} ${styles.btnSmall}`}>
            <Image src="/images/icons/btnMenor.png" alt="" fill />
          </button>
          <div className={styles.remote}>
            <button className={styles.centerButton}>START</button>
            <div className={styles.directionButtons}>
              <button className={`${styles.directionButton} ${styles.up}`}>
                <div className={styles.btnUp}>
                  <Image src="/images/icons/btnCima.png" alt="" fill />
                </div>
              </button>
              <button className={`${styles.directionButton} ${styles.down}`}>
                <div className={styles.btnDown}>
                  <Image src="/images/icons/btnBaixo.png" alt="" fill />
                </div>
              </button>
              <button className={`${styles.directionButton} ${styles.left}`}>
                <div className={styles.btnLeft}>
                  <Image src="/images/icons/btnEsquerda.png" alt="" fill />
                </div>
              </button>
              <button className={`${styles.directionButton} ${styles.right}`}>
                <div className={styles.btnRight}>
                  <Image src="/images/icons/btnDireita.png" alt="" fill />
                </div>
              </button>
            </div>
          </div>
          <button className={`${styles.btnSpeed} ${styles.btnBig}`}>
            <Image src="/images/icons/btnMaior.png" alt="" fill />
          </button>
        </div>
        <div className={styles.harvesterArea}>
          <div className={styles.harvester}>
            <div className={styles.harvesterClaw}>
              <Image src="/images/icons/garra.png" alt="" fill />
            </div>
            <div className={styles.harvesterDirection}>
              <Image src="/images/icons/direcao.png" alt="" fill />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Harvester;
