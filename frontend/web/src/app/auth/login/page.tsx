"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // impede reload da página
    // Aqui você pode depois integrar com sua API (login real)
    router.push("/home");
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
          className="btn btn-secondary"
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
              name="userEmail"
              placeholder="Email"
              required
              // value={email}
              // onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="label-input" htmlFor="userPassword">
            <i className="fas fa-lock icon-modify"></i>
            <input
              type="password"
              name="userPassword"
              placeholder="Senha"
              required
              // value={password}
              // onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button className="btn btn-primary" type="submit">
            Entrar
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
