import React from "react";
import Image from "next/image";
import { IUser } from "../types/User";
import Profile from "@/components/Profile";

interface NavbarProps {
  user: IUser;
}

const NavbarHome: React.FC<NavbarProps> = ({ user }) => {
  return (
    <div className="navbarHome">
      <div className="iconNav">
        <div className="logo-NavbarHome">
          <Image
            src="/images/mbRosa.png"
            alt="Logo"
            fill
          />
        </div>
        <Profile user={user} />
      </div>
    </div>
  );
};

export default NavbarHome;
