import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["openweathermap.org"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**", // permite imagens do backend
      },
      {
        protocol: "http",
        hostname: "openweathermap.org",
        port: "",
        pathname: "/img/wn/**", // permite ícones de clima
      },
    ],
  },
};

export default nextConfig;
