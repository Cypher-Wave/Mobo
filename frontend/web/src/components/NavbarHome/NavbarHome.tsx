import Image from "next/image";
import Profile from "@/components/Profile/Profile";
import styles from "./NavbarHome.module.css";

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
