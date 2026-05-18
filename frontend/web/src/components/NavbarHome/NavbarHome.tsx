"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Profile from "../Profile/Profile";
import styles from "./NavbarHome.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/home" },
  { label: "Braço Mecânico", href: "/harvester" },
  { label: "Relatórios", href: "/report" },
  { label: "Dashboard", href: "/dashboard" },
];

const NavbarHome = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <Link href="/home" className={styles.logoLink}>
        <Image
          src="/images/Logo.png"
          alt="Mobo Logo"
          width={80}
          height={40}
          className={styles.logoImg}
          priority
        />
      </Link>

      {/* Links de navegação */}
      <ul className={styles.navLinks}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={`${styles.navLink} ${
                pathname === href ? styles.navLinkActive : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Ações */}
      <div className={styles.navActions}>
        <Profile />
      </div>
    </nav>
  );
};

export default NavbarHome;
