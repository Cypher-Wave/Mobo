"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FirstColumn from "@/components/FirstColumn/FirstColumn";
import api from "@/services/api";
import styles from "../Auth.module.css";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Realiza o login — o cookie HttpOnly será setado automaticamente
      const response = await api.post("/auth/login", {
        userEmail: email,
        userPassword: password,
      });

      if (response.data.success) {
        router.push("/home"); // ✅ redireciona
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Erro ao fazer login. Tente novamente."
        );
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
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
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              required
            />
          </label>

          <label className={styles.labelInput} htmlFor="userPassword">
            <i className="fas fa-lock iconModify"></i>
            <input
              type="password"
              name="userPassword"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Senha"
              required
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
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
