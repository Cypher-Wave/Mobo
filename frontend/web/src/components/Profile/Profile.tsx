import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/User";
import api from "@/services/api";
import styles from "./Profile.module.css";

interface ProfileProps {
  user: IUser;
}

const Profile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlerLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      if (res.data.success) router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

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

  return (
    <div className={styles.profile}>
      <div
        className={`${styles.profileImg} ${styles.profileClick}`}
        onClick={toggleMenu}
      >
        <Image src="/images/icons/profile.png" alt="Profile" fill />
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div ref={containerRef} className={styles.profileInformation}>
            <div className={styles.profileImg}>
              <Image src="/images/icons/profile.png" alt="Profile" fill />
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
                Pedro Henrique Venâncio
              </p>

              <p className={`${styles.role} ${styles.displayText}`}>Agricultor Familiar</p>
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
