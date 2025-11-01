"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/services/api";
import profile from "./Profile.module.css";

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
      <div className={profile.btnContainer}>
        <button
          className="btn btn-primary"
          onClick={() => router.push("/harvester")}
        >
          Voltar para a Câmera
        </button>

        <button className="btn btn-primary">
          Carregar Foto
        </button>
      </div>

      {/* Card do Usuário */}
      <div className={profile.profileContainer}>
        <div className={profile.informationsCard}>
          <div className={profile.profileCard}>
            <Image
              src="/images/icons/user_profile.png"
              alt="Foto de Perfil"
              fill
            />
          </div>

          <h2 className={profile.profileTitle}>
            {/* {user.userName} */}Pedro Henrique Venâncio
          </h2>

          <p className={profile.profileEmail}>
            {/* {user.userEmail} */}pedro@email.com
          </p>

          <p className={profile.profileRole}>
            {/* {user.userRole} */}Agricultor Familiar
          </p>

          <button className="btn btn-primary">Editar Perfil</button>

          <div className={profile.links}>
            <Link href="/reports">Relatórios</Link>
            <Link href="/alerts">Alertas</Link>
          </div>
        </div>

        {/* Galeria */}
        <div className={profile.gallery} id="gallery">

          {/* Exemplo mockado */}
          {[1,2,3,4,5,6,7,8].map((i) => (
            <div className={profile.item} key={i}>
              <div className={profile.photo}>
                <Image
                  src={`${baseURL}/uploads/harvests/fotoLichia1.jpg`}
                  alt=""
                  fill
                />
              </div>
              <div className={profile.description}>Dia 27/10/2025</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default Profile;
