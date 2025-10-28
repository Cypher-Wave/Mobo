import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./Notification.css";

const Notification: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropbox = () => setIsOpen(prev => !prev);
  const closeDropbox = () => setIsOpen(false);

  return (
    <div className="notification">
      {/* Ícone da notificação */}
      <div className="notification-container" onClick={toggleDropbox}>
        <Image
          src="/images/icons/notificacao.png"
          alt="Ícone de Notificação"
          id="notification-icon"
          width={40}
          height={40}
        />
        <span className="notification-badge" id="notification-badge">
          3
        </span>
      </div>

      {/* DropBox de notificações */}
      {isOpen && (
        <div className="notification-dropbox" id="notification-dropbox">
          <h3>Notificações</h3>
          <ul id="notification-list">
            <li className="notification-item alert">
              <p>Atenção chuvas fortes se aproximam, proteja sua Plantação!</p>
              <div className="notification-buttons">
                  <button className="btn-item btn-primary" onClick={() => router.push("/reports")}>Ver Alerta</button>
                  <button className="btn-item btn-primary">Excluir</button>
              </div>
            </li>
            <li className="notification-item">
              <p>Alta Temperatura</p>
              <div className="notification-buttons">
                  <button className="btn-item btn-primary" onClick={() => router.push("/reports")}>Ver Alerta</button>
                  <button className="btn-item btn-primary">Excluir</button>
              </div>
            </li>
            <li className="notification-item">
              <p>Baixa Umidade.</p>
              <div className="notification-buttons">
                  <button className="btn-item btn-primary" onClick={() => router.push("/reports")}>Ver Alerta</button>
                  <button className="btn-item btn-primary">Excluir</button>
              </div>
            </li>
          </ul>
          <button className="btn-item btn-primary" id="close-box" onClick={closeDropbox}>
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
