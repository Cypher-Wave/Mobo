import React from "react";
import { IUser } from "../types/User";
import Image from "next/image";

interface NavbarProps {
  user: IUser;
}

const NavbarHome: React.FC<NavbarProps> = ({ user }) => {
  return (
    <>
      <div className="navbarHome">
        <div className="iconNav">
          <Image className="logo-navbarHome" src="/images/mbRosa.png" alt="Logo" fill />
          <div className="perfilFT">
            <a href="/profile" className="profile-link">
              <Image
                className="profile-img"
                src={
                  user.userImage ? user.userImage : "/images/icons/perfil.png"
                }
                alt="Profile"
                fill
              />
              <div className="txts profile-info">
                <p className="txts">
                  <strong>Nome:</strong> {user.userName}
                </p>
                <p className="txts">
                  <strong>Email:</strong> {user.userEmail}
                </p>
                <p className="txt1Card">Logout</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarHome;
