import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IUser, IUserRole } from "@/types/User";
import api from "@/services/api";
import styles from "./Profile.module.css";

const Profile = () => {
  const router = useRouter();
  const baseURL = api.defaults.baseURL?.replace("/api", "");

  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Função de logout
  const handlerLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      if (res.data.success) router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Busca os dados do usuário
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me");
        setUser(res.data.user);
      } catch {
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const roleMap: Record<IUserRole, string> = {
    family_farmer: "Agricultor Familiar",
    company_admin: "Administrador",
    company_worker: "Funcionário da Empresa",
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // Verificar se precisa animar o nome
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current && containerRef.current) {
        const overflowing =
          textRef.current.scrollWidth > containerRef.current.clientWidth;
        setIsOverflowing(overflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  if (loading) return null;
  if (!user) return null;

  return (
    <div className={styles.profile}>
      <div
        className={`${styles.profileImg} ${styles.profileClick}`}
        onClick={toggleMenu}
      >
        <Image src={user.userImage ? `${baseURL}/uploads/users/${user.userImage}` : "/images/icons/profile.png"} alt="Profile" fill />
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div ref={containerRef} className={styles.profileInformation}>
            <div className={styles.profileImg}>
              <Image src={user.userImage ? `${baseURL}/uploads/users/${user.userImage}` : "/images/icons/profile.png"} alt="Profile" fill />
            </div>

            <div className={styles.display}>
              <p
                ref={textRef}
                className={
                  isOverflowing
                    ? `${styles.scrollingText} ${styles.name} ${styles.displayText}`
                    : `${styles.name} ${styles.displayText}`
                }
              >
                {user.userName}
              </p>

              <p className={`${styles.role} ${styles.displayText}`}>
                {roleMap[user.userRole] ?? user.userRole}
              </p>
            </div>
          </div>

          <a
            onClick={() => router.push("/profile")}
            className={styles.dropdownItem}
          >
            Perfil
          </a>

          <a onClick={handlerLogout} className={styles.dropdownItem}>
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default Profile;
