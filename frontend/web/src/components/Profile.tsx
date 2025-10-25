import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/styles/components/Profile.css";
import { IUser } from "../types/User";
import api from "@/services/api";

interface ProfileProps {
  user: IUser;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const router = useRouter();

  const handlerLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handlerLogout();
  }, []);

  return (
    <div className="profile">
      <Image
        className="profile-img"
        src={user.userImage ? user.userImage : "/images/icons/perfil.png"}
        alt="Profile"
        fill
      />
      <a onClick={() => router.push("/profile")} className="profile-link">
        Perfil
      </a>
      <a onClick={() => handlerLogout()} className="profile-link">
        Logout
      </a>
    </div>
  );
};

export default Profile;
