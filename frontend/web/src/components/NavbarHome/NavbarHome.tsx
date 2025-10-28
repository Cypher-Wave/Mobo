import React from "react";
import Image from "next/image";
import { IUser } from "@/types/User";
import Profile from "@/components/Profile/Profile";
import "./NavbarHome.css";

interface NavbarProps {
  user: IUser;
}

const NavbarHome: React.FC = () => {
  return (
    <div className="navbarHome">
      <div className="iconNav">
        <div className="logo-NavbarHome">
          <Image src="/images/mbRosa.png" alt="Logo" fill />
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default NavbarHome;
