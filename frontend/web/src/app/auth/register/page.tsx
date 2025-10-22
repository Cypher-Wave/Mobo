import React from "react";
import Image from "next/image";

const Register: React.FC = () => {
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
        <button id="signin" className="btn btn-primary">
          Entrar
        </button>
      </div>

      {/* Formulário de cadastro */}
      <div className="second-column">
        <Image
          className="logo-container"
          width={150}
          src="/images/Logo.png"
          alt="Logo Mobo"
        />
        <h2 className="title title-second">Deseja criar uma conta?</h2>
        <form className="form" action="/createUser" method="POST">
          <label className="label-input" htmlFor="userProfileImage">
            <i className="far fa-image icon-modifys"></i>
            <span className="txtimp">Escolher imagem</span>
            <input
              className="fundoInput"
              id="userProfileImage"
              type="file"
              name="userImage"
              accept="image/*"
              style={{ display: "none" }}
            />
          </label>

          <label className="label-input" htmlFor="userName">
            <i className="far fa-user icon-modify"></i>
            <input type="text" name="userName" placeholder="Nome" required />
          </label>

          <label className="label-input" htmlFor="userPhone">
            <i className="fas fa-phone icon-modify"></i>
            <input type="text" name="userPhone" placeholder="Telefone" />
          </label>

          <label className="label-input" htmlFor="userEmail">
            <i className="far fa-envelope icon-modify"></i>
            <input type="email" name="userEmail" placeholder="Email" required />
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

          <label className="label-input" htmlFor="userRole">
            <i className="fas fa-seedling icon-modify"></i>
            <select
              className="fundoInput"
              name="userRole"
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
          </label>

          {/* Bloco para Agricultor Familiar */}
          <div id="farmerFields" style={{ display: "none" }}>
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
          </div>

          {/* Bloco para Empresa */}
          <div id="companyFields" style={{ display: "none" }}>
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
                </option>
                {/* Exemplo de loop de empresas */}
                {/* companies.map(company => (
                    <option key={company._id} value={company._id}>{company.companyName}</option>
                )) */}
              </select>
            </label>
          </div>

          <button className="btn btn-second" type="submit">
            Cadastrar-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
