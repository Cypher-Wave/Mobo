import React from "react";
import { IUser } from "../types/User";
import Image from "next/image";


interface NavbarProps {
  user: IUser;
}

const NavbarHome: React.FC<NavbarProps> = ({ user }) => {
  return (
    <div className="navbarHome flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <Image width={50} src="/images/mbRosa.png" alt="MOBO logo" />
        <a href="/profile" className="flex items-center gap-4">
          <Image
            className="w-12 h-12 rounded-full border"
            src={user.userImage ? user.userImage : "/images/icons/perfil.png"}
            alt="Perfil"
          />
          <div className="text-sm leading-tight">
            <p>
              <strong>Nome:</strong> {user.userName}
            </p>
            <p>
              <strong>Email:</strong> {user.userEmail}
            </p>
            <p className="text-pink-600 font-semibold cursor-pointer">Logout</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default NavbarHome;
