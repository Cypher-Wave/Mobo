"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FirstColumn from "@/components/FirstColumn/FirstColumn";
import styles from "../Auth.module.css";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const infos = {
    title: "Bem-vindo ao Mobo!",
    description1: "Se você já possui uma conta",
    description2: "clique no botão abaixo e faça seu login",
    link: "/auth/login",
    button: "Entrar",
  };

  return (
    <div className={styles.content}>
      {/* Primeira coluna */}
      <FirstColumn info={infos} />

      {/* Formulário de cadastro */}
      <div className={`${styles.secondColumn} ${styles.backgroundRegister}`}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.authLogo}
            src="/images/Logo.png"
            alt="Logo Mobo"
            fill
          />
        </div>

        <h2 className={`${styles.title} ${styles.titleSecond}`}>
          Deseja criar uma conta?
        </h2>

        <form
          className={styles.form}
          onSubmit={() => router.push("/home")}
          method="POST"
        >
          {/* Imagem */}
          <label className={styles.labelInput} htmlFor="userProfileImage">
            <i className={`far fa-image ${styles.iconModify}`}></i>
            <span className={styles.txtImg}>Escolher imagem</span>
            <input
              id="userProfileImage"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
          </label>

          {/* Nome */}
          <label className={styles.labelInput} htmlFor="userName">
            <i className={`far fa-user ${styles.iconModify}`}></i>
            <input type="text" placeholder="Nome" required />
          </label>

          {/* Telefone */}
          <label className={styles.labelInput} htmlFor="userPhone">
            <i className={`fas fa-phone ${styles.iconModify}`}></i>
            <input type="text" placeholder="Telefone" />
          </label>

          {/* Email */}
          <label className={styles.labelInput} htmlFor="userEmail">
            <i className={`far fa-envelope ${styles.iconModify}`}></i>
            <input type="email" placeholder="Email" required />
          </label>

          {/* Senha */}
          <label className={styles.labelInput} htmlFor="userPassword">
            <i className={`fas fa-lock ${styles.iconModify}`}></i>
            <input type="password" placeholder="Senha" required />
          </label>

          {/* Tipo de usuário */}
          <label className={styles.labelInput} htmlFor="userRole">
            <i className={`fas fa-seedling ${styles.iconModify}`}></i>

            <select
              className={styles.selectInput}
              id="userRole"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Tipo de Usuário:
              </option>
              <option value="company_admin">CEO de Empresa</option>
              <option value="company_worker">Funcionário de Empresa</option>
              <option value="family_farmer">Agricultor Familiar</option>
            </select>

            <i className={`bx bx-chevron-down ${styles.selectIcon}`}></i>
          </label>

          <button className="btn btn-primary" type="submit">
            Cadastrar-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
