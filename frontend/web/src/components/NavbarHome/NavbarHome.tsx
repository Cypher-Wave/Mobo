import Image from "next/image";
import { IUser } from "@/types/User";
import Profile from "@/components/Profile/Profile";
import styles from "./NavbarHome.module.css";

interface NavbarProps {
  user: IUser;
}

const NavbarHome = () => {
  return (
    <div className={styles.navbarHome}>
      <div className={styles.iconNav}>
        <div className={styles.logoNavbar}>
          <Image src="/images/mbRosa.png" alt="Logo" fill />
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default NavbarHome;
