import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/User";
import api from "@/services/api";
import "./Profile.css";

interface ProfileProps {
  user: IUser;
}

const Profile: React.FC = () => {
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

  // Checa se o texto ultrapassa o limite
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
    <div className="profile">
      <div className="profile-img profile-click" onClick={toggleMenu}>
        <Image src="/images/icons/profile.png" alt="Profile" fill />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <div ref={containerRef} className="profile-information">
            <div className="profile-img">
              <Image src="/images/icons/profile.png" alt="Profile" fill />
            </div>
            <div className="display">
              <p
                ref={textRef}
                className={isOverflowing ? "scrolling-text name" : "name"}
              >
                Pedro Henrique Venâncio
              </p>
              <p className="role">Agricultor Familiar</p>
            </div>
          </div>

          <a onClick={() => router.push("/profile")} className="dropdown-item">
            Perfil
          </a>
          <a onClick={handlerLogout} className="dropdown-item">
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default Profile;
