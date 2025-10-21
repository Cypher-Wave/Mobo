"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Register: React.FC = () => {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="flex w-screen h-screen bg-[#5a6d3c] items-center justify-center">
      <div className="flex w-[90%] md:w-[70%] h-[80%] rounded-2xl overflow-hidden shadow-2xl">
        {/* Lado esquerdo */}
        <div className="w-1/2 bg-[#b70b3b] text-white flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-bold mb-4">Bem vindo ao Mobo!</h2>
          <p className="text-sm mb-1">Se você já possui uma conta</p>
          <p className="text-sm mb-6">
            clique no botão abaixo e faça seu login
          </p>
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-white text-[#b70b3b] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Entrar
          </button>
        </div>

        {/* Lado direito */}
        <div
          className="w-1/2 bg-cover bg-center flex flex-col items-center justify-center p-10"
          style={{ backgroundImage: "url('/images/background.jpg')" }}
        >
          <Image src="/images/Logo.png" alt="Logo" className="w-36 mb-4" fill />
          <h2 className="text-white text-2xl font-semibold mb-6">
            Deseja criar uma conta?
          </h2>

          <form
            className="w-3/4 flex flex-col space-y-4"
            action="/createUser"
            method="POST"
            encType="multipart/form-data"
          >
            {/* Upload de imagem */}
            <label className="flex items-center justify-between bg-white/90 rounded-full px-4 py-2 cursor-pointer">
              <i className="far fa-image text-[#b70b3b] mr-3"></i>
              <span className="text-gray-700 text-sm">
                {image ? image.name : "Escolher imagem"}
              </span>
              <input
                type="file"
                name="userImage"
                accept="image/*"
                className="hidden"
                onChange={(event) =>
                  setImage(event.target.files ? event.target.files[0] : null)
                }
              />
            </label>

            <label className="flex items-center bg-white/90 rounded-full px-4 py-2">
              <i className="far fa-user text-[#b70b3b] mr-3"></i>
              <input
                type="text"
                name="userName"
                placeholder="Nome"
                required
                className="bg-transparent outline-none flex-1"
              />
            </label>

            <label className="flex items-center bg-white/90 rounded-full px-4 py-2">
              <i className="fas fa-phone text-[#b70b3b] mr-3"></i>
              <input
                type="text"
                name="userPhone"
                placeholder="Telefone"
                className="bg-transparent outline-none flex-1"
              />
            </label>

            <label className="flex items-center bg-white/90 rounded-full px-4 py-2">
              <i className="far fa-envelope text-[#b70b3b] mr-3"></i>
              <input
                type="email"
                name="userEmail"
                placeholder="Email"
                required
                className="bg-transparent outline-none flex-1"
              />
            </label>

            <label className="flex items-center bg-white/90 rounded-full px-4 py-2">
              <i className="fas fa-lock text-[#b70b3b] mr-3"></i>
              <input
                type="password"
                name="userPassword"
                placeholder="Senha"
                required
                className="bg-transparent outline-none flex-1"
              />
            </label>

            <select
              name="userRole"
              className="bg-white/90 rounded-full px-4 py-2 text-gray-700 outline-none"
              onChange={(event) => setRole(event.target.value)}
              required
            >
              <option value="">Tipo de Usuário:</option>
              <option value="company_admin">CEO de Empresa</option>
              <option value="company_worker">Funcionário de Empresa</option>
              <option value="family_farmer">Agricultor Familiar</option>
            </select>

            {/* Campos dinâmicos */}
            {role === "family_farmer" && (
              <>
                <input
                  type="text"
                  name="farmerDetails[cpf]"
                  placeholder="CPF"
                  className="bg-white/90 rounded-full px-4 py-2 outline-none"
                />
                <input
                  type="text"
                  name="farmerDetails[dap]"
                  placeholder="DAP"
                  className="bg-white/90 rounded-full px-4 py-2 outline-none"
                />
              </>
            )}

            {role === "company_worker" && (
              <select
                name="company"
                className="bg-white/90 rounded-full px-4 py-2 outline-none"
              >
                <option value="">Selecione a Empresa</option>
                {/* map de empresas aqui futuramente */}
              </select>
            )}

            <button
              type="submit"
              className="bg-[#b70b3b] text-white font-semibold rounded-full py-2 hover:bg-[#9b0831] transition"
            >
              Cadastrar-se
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
