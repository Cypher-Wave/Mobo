"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className="content first-content">
      {/* Primeira coluna */}
      <div className="first-column">
        <h2 className="title title-primary">Bem-vindo ao Mobo!</h2>
        <p className="description description-primary">
          Se você já possui uma conta
        </p>
        <p className="description description-primary">
          clique no botão abaixo e faça seu login
        </p>
        <button
          id="signin"
          className="btn btn-secondary"
          onClick={() => router.push("/auth/login")}
        >
          Entrar
        </button>
      </div>

      {/* Formulário de cadastro */}
      <div className="second-column background-register">
        <div className="logo-container">
          <Image
            className="auth-logo"
            src="/images/Logo.png"
            alt="Logo Mobo"
            fill
          />
        </div>
        <h2 className="title title-second">Deseja criar uma conta?</h2>
        <form className="form" onSubmit={() => router.push("/home")} method="POST">
          <label className="label-input" htmlFor="userProfileImage">
            <i className="far fa-image icon-modifys"></i>
            <span className="txtimp">Escolher imagem</span>
            <input
              className="fundoInput"
              id="userProfileImage"
              type="file"
              accept="image/*"
              // onChange={(event) => setFile(event.target.files?.[0] || null)}
              style={{ display: "none" }}
            />
          </label>

          <label className="label-input" htmlFor="userName">
            <i className="far fa-user icon-modify"></i>
            <input
              type="text"
              placeholder="Nome"
              // value={name}
              // onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label className="label-input" htmlFor="userPhone">
            <i className="fas fa-phone icon-modify"></i>
            <input
              type="text"
              placeholder="Telefone"
              // value={phone}
              // onChange={(event) => setPhone(event.target.value)}
            />
          </label>

          <label className="label-input" htmlFor="userEmail">
            <i className="far fa-envelope icon-modify"></i>
            <input
              type="email"
              placeholder="Email"
              // value={email}
              // onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="label-input" htmlFor="userPassword">
            <i className="fas fa-lock icon-modify"></i>
            <input
              type="password"
              placeholder="Senha"
              // value={password}
              // onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <label className="label-input" htmlFor="userRole">
            <i className="fas fa-seedling icon-modify"></i>
            <select
              className="select-input"
              id="userRole"
              // value={role}
              // onChange={(event) => setRole(event.target.value)}
              required
            >
              <option value="" disabled>
                Tipo de Usuário:
              </option>
              <option value="company_admin">CEO de Empresa</option>
              <option value="company_worker">Funcionário de Empresa</option>
              <option value="family_farmer">Agricultor Familiar</option>
            </select>
            <i className="bx bx-chevron-down select-icon icon-modify"></i>
          </label>

          {/* Bloco para Agricultor Familiar */}
          {/* <div id="farmerFields" style={{ display: "none" }}>
            <label className="label-input" htmlFor="farmerDetailsCpf">
              <i className="fas fa-id-card icon-modify"></i>
              <input
                type="text"
                name="farmerDetails[cpf]"
                placeholder="CPF"
                id="farmerDetailsCpf"
              />
            </label>

            <label className="label-input" htmlFor="farmerDetailsDap">
              <i className="fas fa-file-alt icon-modify"></i>
              <input
                type="text"
                name="farmerDetails[dap]"
                placeholder="DAP"
                id="farmerDetailsDap"
              />
            </label>
          </div> */}

          {/* Bloco para Empresa */}
          {/* <div id="companyFields" style={{ display: "none" }}>
            <label className="label-input" htmlFor="company">
              <i className="fas fa-building icon-modify"></i>
              <select
                className="fundoInput"
                name="company"
                id="company"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione a Empresa
                </option> */}
                {/* Exemplo de loop de empresas */}
                {/* companies.map(company => (
                    <option key={company._id} value={company._id}>{company.companyName}</option>
                )) */}
              {/* </select>
            </label>
          </div> */}

          <button className="btn btn-primary" type="submit">
            Cadastrar-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
