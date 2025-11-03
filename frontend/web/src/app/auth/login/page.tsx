"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import FirstColumn from "@/components/FirstColumn/FirstColumn";
import styles from "../Auth.module.css";

const Login = () => {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/home");
  };

  const infos = {
    title: "Olá!",
    description1: "Se ainda não possui conta, cadastre-se",
    description2: "e comece a jornada conosco",
    link: "/auth/register",
    button: "Cadastrar-se",
  };

  return (
    <div className={styles.content}>
      {/* Primeira coluna */}
      <FirstColumn info={infos} />

      {/* Formulário de Login */}
      <div className={`${styles.secondColumn} ${styles.backgroundLogin}`}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.authLogo}
            src="/images/Logo.png"
            alt="Logo Mobo"
            fill
          />
        </div>

        <h2 className={`${styles.title} ${styles.titleSecond}`}>
          Faça seu login!
        </h2>

        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.labelInput} htmlFor="userEmail">
            <i className="far fa-envelope iconModify"></i>
            <input type="email" name="userEmail" placeholder="Email" required />
          </label>

          <label className={styles.labelInput} htmlFor="userPassword">
            <i className="fas fa-lock iconModify"></i>
            <input
              type="password"
              name="userPassword"
              placeholder="Senha"
              required
            />
          </label>

          <button className="btn btn-primary" type="submit">
            Entrar
          </button>

          <a className={styles.password} href="#">
            Esqueceu sua senha?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
