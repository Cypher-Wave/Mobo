"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/services/api";
import styles from "./Profile.module.css";

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

const Profile = ({ user, images }: ProfileProps) => {
  const router = useRouter();
  const baseURL = api.defaults.baseURL?.replace("/api", "");

  return (
    <>
      {/* Botões de ação */}
      <div className={styles.btnContainer}>
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
      <div className={styles.profileContainer}>
        <div className={styles.informationsCard}>
          <div className={styles.profileCard}>
            <Image
              src="/images/icons/user_profile.png"
              alt="Foto de Perfil"
              fill
            />
          </div>

          <h2 className={styles.profileTitle}>
            {/* {user.userName} */}Pedro Henrique Venâncio
          </h2>

          <p className={styles.profileEmail}>
            {/* {user.userEmail} */}pedro@email.com
          </p>

          <p className={styles.profileRole}>
            {/* {user.userRole} */}Agricultor Familiar
          </p>

          <button className="btn btn-primary">Editar Perfil</button>

          <div className={styles.links}>
            <Link href="/reports">Relatórios</Link>
            <Link href="/alerts">Alertas</Link>
          </div>
        </div>

        {/* Galeria */}
        <div className={styles.gallery} id="gallery">

          {/* Exemplo mockado */}
          {[1].map((i) => (
            <div className={styles.item} key={i}>
              <div className={styles.photo}>
                <Image
                  src={`${baseURL}/uploads/harvests/fotoLichia1.jpg`}
                  alt=""
                  fill
                />
              </div>
              <div className={styles.description}>Dia 27/10/2025</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default Profile;
