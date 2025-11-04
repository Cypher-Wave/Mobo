"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FirstColumn from "@/components/FirstColumn/FirstColumn";
import api from "@/services/api";
import styles from "../Auth.module.css";

const Register = () => {
  const router = useRouter();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<
    "family_farmer" | "company_admin" | "company_worker"
  >();
  const [company, setCompany] = useState("");
  const [farmerDetails, setFarmerDetails] = useState<{
    cpf: string;
    dap: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Realiza o Cadastro
      const response = await api.post("/auth/register", {
        userImage: image,
        userName: name,
        userEmail: email,
        userPassword: password,
        userPhone: phone,
        userRole: role,
        company,
        farmerDetails,
      });

      if (response.data.success) {
        router.push("/home");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Erro ao fazer cadastro. Tente novamente."
        );
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

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

        <form className={styles.form} onSubmit={handleRegister} method="POST">
          {/* Imagem */}
          <label className={styles.labelInput} htmlFor="userProfileImage">
            <i className={`far fa-image ${styles.iconModify}`}></i>
            <span className={styles.txtImg}>Escolher imagem</span>
            <input
              id="userProfileImage"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </label>

          {/* Nome */}
          <label className={styles.labelInput} htmlFor="userName">
            <i className={`far fa-user ${styles.iconModify}`}></i>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          {/* Telefone */}
          <label className={styles.labelInput} htmlFor="userPhone">
            <i className={`fas fa-phone ${styles.iconModify}`}></i>
            <input
              type="text"
              placeholder="Telefone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>

          {/* Email */}
          <label className={styles.labelInput} htmlFor="userEmail">
            <i className={`far fa-envelope ${styles.iconModify}`}></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          {/* Senha */}
          <label className={styles.labelInput} htmlFor="userPassword">
            <i className={`fas fa-lock ${styles.iconModify}`}></i>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {/* Tipo de usuário */}
          <label className={styles.labelInput} htmlFor="userRole">
            <i className={`fas fa-seedling ${styles.iconModify}`}></i>

            <select
              className={styles.selectInput}
              id="userRole"
              value={role}
              onChange={(event) => {
                const newRole = event.target.value as
                  | "family_farmer"
                  | "company_admin"
                  | "company_worker";

                setRole(newRole);

                if (newRole === "family_farmer") {
                  setFarmerDetails({ cpf: "", dap: "" });
                } else {
                  setFarmerDetails(null);
                }
              }}
              required
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

          {/* Campos extras para agricultor familiar */}
          {role === "family_farmer" && farmerDetails && (
            <>
              <label className={styles.labelInput}>
                <i className={`fas fa-id-card ${styles.iconModify}`}></i>
                <input
                  type="text"
                  placeholder="CPF"
                  value={farmerDetails.cpf}
                  onChange={(event) =>
                    setFarmerDetails((prev) => ({
                      ...prev!,
                      cpf: event.target.value,
                    }))
                  }
                  required
                />
              </label>

              <label className={styles.labelInput}>
                <i className={`fas fa-file-alt ${styles.iconModify}`}></i>
                <input
                  type="text"
                  placeholder="DAP"
                  value={farmerDetails.dap}
                  onChange={(event) =>
                    setFarmerDetails((prev) => ({
                      ...prev!,
                      dap: event.target.value,
                    }))
                  }
                  required
                />
              </label>
            </>
          )}

          <button className="btn btn-primary" type="submit">
            Cadastrar-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
