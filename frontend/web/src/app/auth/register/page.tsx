"use client";

import { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import styles from "../Auth.module.css";

const Register = () => {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<
    "family_farmer" | "company_admin" | "company_worker"
  >();
  const [company] = useState("");
  const [farmerDetails, setFarmerDetails] = useState<{
    cpf: string;
    dap: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Máscara de telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não é dígito
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 2) {
      value = value.replace(/^(\d{0,2})/, "($1");
    } else if (value.length <= 7) {
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1)$2");
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1)$2-$3");
    }

    setPhone(value);
  };

  // Máscara de CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não é dígito
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 3) {
      value = value.replace(/^(\d{0,3})/, "$1");
    } else if (value.length <= 6) {
      value = value.replace(/^(\d{3})(\d{0,3})/, "$1.$2");
    } else if (value.length <= 9) {
      value = value.replace(/^(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    }

    setFarmerDetails((prev) => ({ ...prev!, cpf: value }));
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // ===== Validação de senhas =====
    if (password !== passwordConfirm) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      if (imageFile) {
        formData.append("userImage", imageFile);
      }
      formData.append("userName", name);
      formData.append("userEmail", email);
      formData.append("userPassword", password);
      if (phone) formData.append("userPhone", phone);
      formData.append("userRole", role!);
      if (company) formData.append("company", company);
      if (farmerDetails) {
        formData.append("farmerDetails[cpf]", farmerDetails.cpf);
        formData.append("farmerDetails[dap]", farmerDetails.dap);
      }

      // Realiza o Cadastro
      const response = await api.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        router.push("/home");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Erro ao fazer cadastro. Tente novamente.",
        );
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Manipulador para mudança de imagem
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Preview da imagem (opcional)
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className={styles.page}>
      {/* ===== Coluna Esquerda — Formulário ===== */}
      <div className={styles.leftColumn}>
        {/* Topo: Logo + Título */}
        <div className={styles.topBar}>
          <div className={styles.logoContainer}>
            <Image
              src="/images/Logo.png"
              alt="Logo Mobo"
              fill
              className={styles.logo}
            />
          </div>
          <h1 className={styles.title}>Faça seu cadastro!</h1>
        </div>

        {/* Área central com avatar + form */}
        <div className={styles.formArea}>
          {/* Avatar clicável */}
          <button
            type="button"
            className={styles.avatarButton}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Escolher foto de perfil"
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className={styles.avatarPreview}
                unoptimized
              />
            ) : (
              /* Silhueta padrão */
              <svg
                className={styles.avatarIcon}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="40" cy="28" r="16" fill="rgba(255,255,255,0.25)" />
                <ellipse
                  cx="40"
                  cy="62"
                  rx="26"
                  ry="16"
                  fill="rgba(255,255,255,0.25)"
                />
              </svg>
            )}
            {/* Botão "+" */}
            <span className={styles.avatarPlus}>+</span>
          </button>

          {/* Input de arquivo oculto */}
          <input
            id="userProfileImage"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
            ref={fileInputRef}
          />

          {/* Formulário */}
          <form className={styles.formRegister} onSubmit={handleRegister}>
            {/* Nome */}
            <input
              className={`input ${styles.fullWidth}`}
              type="text"
              name="userName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
              required
            />

            {/* Email */}
            <input
              className={`input ${styles.fullWidth}`}
              type="email"
              name="userEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
            />

            {/* Senha */}
            <input
              className="input"
              type="password"
              name="userPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />

            {/* Confirmação de Senha */}
            <input
              className={`input ${passwordConfirm && password !== passwordConfirm ? "inputError" : ""}`}
              type="password"
              name="userPasswordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirmar Senha"
              required
            />

            {/* Feedback inline de senhas */}
            {passwordConfirm && password !== passwordConfirm && (
              <p className={styles.error}>As senhas não coincidem.</p>
            )}

            {/* Tipo de Conta */}
            <div className={`selectWrapper ${styles.fullWidth}`}>
              <select
                className="input"
                value={role ?? ""}
                onChange={(e) => {
                  const newRole = e.target.value as
                    | "family_farmer"
                    | "company_admin"
                    | "company_worker";
                  setRole(newRole);
                  setFarmerDetails(
                    newRole === "family_farmer" ? { cpf: "", dap: "" } : null,
                  );
                }}
                required
              >
                <option value="" disabled>
                  Tipo de Conta
                </option>
                <option value="company_admin">CEO de Empresa</option>
                <option value="company_worker">Funcionário de Empresa</option>
                <option value="family_farmer">Agricultor Familiar</option>
              </select>
            </div>

            {/* Telefone (opcional) */}
            <input
              className={`input ${styles.fullWidth}`}
              type="text"
              name="userPhone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Telefone (opcional)"
              maxLength={14}
            />

            {/* Campo extra para agricultor familiar */}
            {role === "family_farmer" && farmerDetails && (
              <>
                <input
                  className="input"
                  type="text"
                  placeholder="CPF"
                  value={farmerDetails.cpf}
                  onChange={handleCpfChange}
                  maxLength={14}
                  required
                />
                <input
                  className="input"
                  type="text"
                  placeholder="DAP"
                  value={farmerDetails.dap}
                  onChange={(e) =>
                    setFarmerDetails((prev) => ({
                      ...prev!,
                      dap: e.target.value,
                    }))
                  }
                  required
                />
              </>
            )}

            {/* Erro */}
            {error && <p className={styles.error}>{error}</p>}

            {/* Botão Entrar */}
            <button className="submitButton" type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar-se"}
            </button>
          </form>

          {/* Cadastro */}
          <p className={styles.registerText}>
            Já possui conta?{" "}
            <a href="/auth/login" className={styles.registerLink}>
              Faça login
            </a>
          </p>
        </div>
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

export default Register;
