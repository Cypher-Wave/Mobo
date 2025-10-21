"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex w-screen h-screen bg-[#5a6d3c] items-center justify-center">
      <div className="flex w-[90%] md:w-[70%] h-[80%] rounded-2xl overflow-hidden shadow-2xl">
        {/* Lado esquerdo (texto) */}
        <div className="w-1/2 bg-[#b70b3b] text-white flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-bold mb-4">Olá!</h2>
          <p className="text-sm mb-1">Se ainda não possui conta, cadastre-se</p>
          <p className="text-sm mb-6">e comece a jornada conosco</p>
          <button
            onClick={() => router.push("/auth/register")} // Use router.push
            className="bg-white text-[#b70b3b] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Cadastrar-se
          </button>
        </div>

        {/* Lado direito (formulário de login) */}
        <div
          className="w-1/2 bg-cover bg-center flex flex-col items-center justify-center p-10"
          style={{ backgroundImage: "url('/images/background.jpg')" }}
        >
          <Image src="/images/Logo.png" alt="Logo" className="w-36 mb-4" fill />
          <h2 className="text-white text-2xl font-semibold mb-6">
            Faça seu login!
          </h2>

          <form
            className="w-3/4 flex flex-col space-y-4"
            action="/authenticate"
            method="POST"
          >
            <label className="flex items-center bg-white/90 rounded-full px-4 py-2">
              <i className="far fa-envelope text-[#b70b3b] mr-3"></i>
              <input
                type="email"
                name="userEmail"
                placeholder="Email"
                className="bg-transparent outline-none flex-1"
                required
              />
            </label>

            <label className="flex items-center bg-white/90 rounded-full px-4 py-2">
              <i className="fas fa-lock text-[#b70b3b] mr-3"></i>
              <input
                type="password"
                name="userPassword"
                placeholder="Senha"
                className="bg-transparent outline-none flex-1"
                required
              />
            </label>

            <button
              type="submit"
              className="bg-[#b70b3b] text-white font-semibold rounded-full py-2 hover:bg-[#9b0831] transition"
            >
              Entrar
            </button>
            <a href="#" className="text-white text-sm text-center mt-2">
              Esqueceu sua senha?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
