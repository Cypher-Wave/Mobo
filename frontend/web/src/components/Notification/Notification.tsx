import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Notification.module.css";

const Notification = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropbox = () => setIsOpen(prev => !prev);
  const closeDropbox = () => setIsOpen(false);

  return (
    <div className={styles.notification}>
      {/* Ícone da notificação */}
      <div className={styles.notificationContainer} onClick={toggleDropbox}>
        <Image
          src="/images/icons/notificacion.png"
          alt="Ícone de Notificação"
          id="notification-icon"
          width={45}
          height={45}
        />
        <span className={styles.notificationBadge} id="notification-badge">
          3
        </span>
      </div>

      {/* DropBox de notificações */}
      {isOpen && (
        <div className={styles.notificationDropbox} id="notification-dropbox">
          <h3 className={styles.dropboxTitle}>Notificações</h3>
          <ul id="notificationList">
            <li className={`${styles.notificationItem} ${styles.alert}`}>
              <p>
                Atenção chuvas fortes se aproximam, proteja sua Plantação!
              </p>
              <div className={styles.notificationButtons}>
                <button
                  className="btn-item btn-primary"
                  onClick={() => router.push("/reports")}
                >
                  Ver Alerta
                </button>
                <button className="btn-item btn-primary">
                  Excluir
                </button>
              </div>
            </li>

            <li className={styles.notificationItem}>
              <p>Alta Temperatura</p>
              <div className={styles.notificationButtons}>
                <button
                  className="btn-item btn-primary"
                  onClick={() => router.push("/reports")}
                >
                  Ver Alerta
                </button>
                <button className="btn-item btn-primary">
                  Excluir
                </button>
              </div>
            </li>

            <li className={styles.notificationItem}>
              <p>Baixa Umidade.</p>
              <div className={styles.notificationButtons}>
                <button
                  className="btn-item btn-primary"
                  onClick={() => router.push("/reports")}
                >
                  Ver Alerta
                </button>
                <button className="btn-item btn-primary">
                  Excluir
                </button>
              </div>
            </li>
          </ul>

          <button
            className="btn-item btn-primary"
            id="close-box"
            onClick={closeDropbox}
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
