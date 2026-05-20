"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import styles from "../Auth.module.css";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

    return (
    <div className={styles.page}>
 
      {/* ===== Coluna Esquerda — Formulário ===== */}
      <div className={styles.leftColumn}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo.png"
            alt="Logo Mobo"
            fill
            className={styles.logo}
          />
        </div>
 
        {/* Título */}
        <h1 className={styles.title}>Bem Vindo!</h1>
 
        {/* Formulário */}
        <form className={styles.formLogin} onSubmit={handleLogin}>
          {/* Email */}
          <input
            className="input"
            type="email"
            name="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
          />
 
          {/* Senha com toggle */}
          <div className={styles.passwordWrapper}>
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              name="userPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Mostrar senha"
            >
              {showPassword ? (
                /* Olho aberto */
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              ) : (
                /* Olho fechado */
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              )}
            </button>
          </div>
 
          {/* Lembre-se + Esqueceu senha */}
          <div className={styles.row}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              Lembre-se
            </label>
            <a href="#" className={styles.forgotLink}>
              Esqueceu sua senha?
            </a>
          </div>
 
          {/* Erro */}
          {error && <p className={styles.error}>{error}</p>}
 
          {/* Botão Entrar */}
          <button className="submitButton" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
 
        {/* Cadastro */}
        <p className={styles.registerText}>
          Ainda não possui conta?{" "}
          <a href="/auth/register" className={styles.registerLink}>
            Cadastre-se
          </a>
        </p>
      </div>
 
      {/* ===== Coluna Direita — Imagem ===== */}
      <div className={styles.rightColumn}>
        <Image
          src="/images/banner.png"
          alt="Robô colhendo lichia"
          fill
          priority
          className={styles.bgImage}
        />
      </div>
    </div>
  );
};

export default Login;
