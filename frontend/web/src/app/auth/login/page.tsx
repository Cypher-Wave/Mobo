import React from "react";
import Image from "next/image";

const Login: React.FC = () => {
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
        <button id="signup" className="btn btn-primary">
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
        <form className="form" action="/authenticate" method="POST">
          <label className="label-input" htmlFor="userEmail">
            <i className="far fa-envelope icon-modify"></i>
            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              required
            />
          </label>

          <label className="label-input" htmlFor="userPassword">
            <i className="fas fa-lock icon-modify"></i>
            <input
              type="password"
              name="userPassword"
              placeholder="Senha"
              required
            />
          </label>

          <button className="btn btn-second" type="submit">
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
