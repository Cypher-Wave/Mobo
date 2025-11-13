"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IUser, IUserRole } from "@/types/User";
import api from "@/services/api";
import styles from "./Profile.module.css";

interface IHarvestImage {
  _id: string;
  imageName: string;
  createdAt?: string;
  description?: string;
}

const Profile = () => {
  const router = useRouter();
  const baseURL = api.defaults.baseURL?.replace("/api", "");

  const [user, setUser] = useState<IUser>();
  const [images, setImages] = useState<IHarvestImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Buscar dados do usuário
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me");
        setUser(res.data.user);
      } catch (error) {
        router.replace("/auth/login");
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

   // Buscar imagens do usuário
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await api.get("/profile");
        setImages(res.data.images || []);
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    fetchImage();
  }, []);

  const roleMap: Record<IUserRole, string> = {
    family_farmer: "Agricultor Familiar",
    company_admin: "Administrador",
    company_worker: "Funcionário da Empresa",
  };

  if (loading) return null;
  if (!user) return null;

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

        <button className="btn btn-primary">Carregar Foto</button>
      </div>

      {/* Card do Usuário */}
      <div className={styles.profileContainer}>
        <div className={styles.informationsCard}>
          <div className={styles.profileCard}>
            <Image
              src={
                user.userImage
                  ? `${baseURL}/uploads/users/${user.userImage}`
                  : "/images/icons/user_profile.png"
              }
              alt="Foto de Perfil"
              fill
            />
          </div>

          <h2 className={styles.profileTitle}>{user.userName}</h2>
          <p className={styles.profileEmail}>{user.userEmail}</p>
          <p className={styles.profileRole}>
            {roleMap[user.userRole] ?? user.userRole}
          </p>

          <button className="btn btn-primary">Editar Perfil</button>

          <div className={styles.links}>
            <Link href="/reports">Relatórios</Link>
            <Link href="/alerts">Alertas</Link>
          </div>
        </div>

        {/* Galeria */}
          {/* Exemplo mockado */}
          <div className={styles.gallery} id="gallery">
          {images.length === 0 ? (
            <p>Nenhuma imagem enviada ainda.</p>
          ) : (
            images.map((img, i) => (
              <div className={styles.item} key={i}>
                <div className={styles.photo}>
                  <Image
                    src={`${baseURL}/uploads/harvests/${img.imageName}`}
                    alt={img.description || "Imagem da colheita"}
                    fill
                  />
                </div>
                <div className={styles.description}>
                  {img.createdAt
                    ? new Date(img.createdAt).toLocaleDateString("pt-BR")
                    : "Sem data"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
