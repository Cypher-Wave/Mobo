"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/services/api";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // impede refresh da página
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post("/auth/login", {
        userEmail: email,
        userPassword: password,
      });

      if (res.data?.user) {
        // redirecionar para a tela de Splash
        router.push("/");
      } else {
        setErrorMsg("Login falhou. Verifique suas credenciais.");
      }
    } catch (error: unknown) {
      console.error("Erro ao tentar logar: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content second-content">
      {/* Primeira coluna */}
      <div className="first-column">
        <h2 className="title title-primary">Olá!</h2>
        <p className="description description-primary">
          Se ainda não possui conta, cadastre-se
        </p>
        <p className="description description-primary">
          e comece a jornada conosco
        </p>
        <button
          id="signup"
          className="btn btn-primary"
          onClick={() => router.push("/auth/register")}
        >
          Cadastrar-se
        </button>
      </div>

      {/* Formulário de Login */}
      <div className="second-column background-login">
        <div className="logo-container">
          <Image
            className="auth-logo"
            src="/images/Logo.png"
            alt="Logo Mobo"
            fill
          />
        </div>
        <h2 className="title title-second">Faça seu login!</h2>

        <form className="form" onSubmit={handleLogin}>
          <label className="label-input" htmlFor="userEmail">
            <i className="far fa-envelope icon-modify"></i>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="label-input" htmlFor="userPassword">
            <i className="fas fa-lock icon-modify"></i>
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          <button className="btn btn-second" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <a className="password" href="#">
            Esqueceu sua senha?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
