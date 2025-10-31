"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/services/api";
import "./Profile.css";

interface User {
  userImage?: string;
  userName: string;
  userEmail: string;
  userRole: string;
}

interface HarvestImage {
  imageName: string;
  createdAt?: string | Date;
}

interface ProfileProps {
  user: User;
  images: HarvestImage[];
}

const Profile: React.FC<ProfileProps> = ({ user, images }) => {
  const router = useRouter();
  const baseURL = api.defaults.baseURL?.replace("/api", "");
  return (
    <>
      <h1>Perfil</h1>
      {/* Botões de ação */}
      <div className="btn-container">
        <button
          className="btn btn-primary"
          onClick={() => router.push("/harvester")}
        >
          Voltar para a Câmera
        </button>
        <button className="btn btn-primary" /*onClick={loadPhoto}*/>
          Carregar Foto
        </button>
      </div>
      {/* Card do Usuário */}
      <div className="profile-container">
        <div className="informations-card">
          <div className="profile-card">
            <Image
              src="/images/icons/user_profile.png"
              alt="Foto de Perfil"
              fill
            />
          </div>
          <h2 className="profile-title">Pedro Henrique Venâncio</h2>
          <p className="profile-email">pedro@email.com</p>
          <p className="profile-role">Agricultor Familiar</p>
          <button className="btn btn-primary">Editar Perfil</button>
          <div className="links">
            <Link href="/reports">Relatórios</Link>
            <Link href="/alerts">Alertas</Link>
          </div>
        </div>
        {/* Galeria de Imagens */}
        <div className="gallery" id="gallery">
          {/* {images.map((img, index) => (
            <div className="item" key={index}>
              <Image
                src={`/uploads/img/harvests/${img.imageName}`}
                alt={`Foto ${index + 1}`}
                width={200} // ajustar conforme necessário
                height={200} // ajustar conforme necessário
              />
              <div className="description">
                Dia {img.createdAt ? dayjs(img.createdAt).format("DD/MM/YYYY") : ""}
              </div>
            </div>
          ))} */}
          <div className="item">
            <div className="photo">
              <Image
                src={`${baseURL}/uploads/harvests/fotoLichia1.jpg`}
                alt=""
                fill // ajustar conforme necessário
              />
            </div>
            <div className="description">Dia 27/10/2025</div>
          </div>
          <div className="item">
            <div className="photo">
              <Image
                src={`${baseURL}/uploads/harvests/fotoLichia1.jpg`}
                alt=""
                fill // ajustar conforme necessário
              />
            </div>
            <div className="description">Dia 27/10/2025</div>
          </div>
          <div className="item">
            <div className="photo">
              <Image
                src={`${baseURL}/uploads/harvests/fotoLichia1.jpg`}
                alt=""
                fill // ajustar conforme necessário
              />
            </div>
            <div className="description">Dia 27/10/2025</div>
          </div>
          <div className="item">
            <div className="photo">
              <Image
                src={`${baseURL}/uploads/harvests/fotoLichia1.jpg`}
                alt=""
                fill // ajustar conforme necessário
              />
            </div>
            <div className="description">Dia 27/10/2025</div>
          </div>
          <div className="item">
            <div className="photo">
              <Image
                src={`${baseURL}/uploads/harvests/fotoLichia1.jpg`}
                alt=""
                fill // ajustar conforme necessário
              />
            </div>
            <div className="description">Dia 27/10/2025</div>
          </div>
          <div className="item">
            <div className="photo">
              <Image
                src={`${baseURL}/uploads/harvests/fotoLichia1.jpg`}
                alt=""
                fill // ajustar conforme necessário
              />
            </div>
            <div className="description">Dia 27/10/2025</div>
          </div>
          <div className="item">
            <div className="photo">
              <Image
                src={`${baseURL}/uploads/harvests/fotoLichia1.jpg`}
                alt=""
                fill // ajustar conforme necessário
              />
            </div>
            <div className="description">Dia 27/10/2025</div>
          </div>
          <div className="item">
            <div className="photo">
              <Image
                src={`${baseURL}/uploads/harvests/fotoLichia1.jpg`}
                alt=""
                fill // ajustar conforme necessário
              />
            </div>
            <div className="description">Dia 27/10/2025</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
