import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, // proxy de API
      },
    ];
  },

  images: {
    unoptimized: true,
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
