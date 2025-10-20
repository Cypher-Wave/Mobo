import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20 text-center bg-pink-700 text-white">
      <Image src="/images/footerBanner.png" alt="Footer Banner" className="w-full" />
      <h2 className="pt-4">@CyperWaves</h2>
      <Image src="/images/moboFooter.png" alt="Mobo Footer" className="mx-auto w-24 my-4 animate-bounce" />
      <div className="waves absolute bottom-0 left-0 w-full h-16 overflow-hidden">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className={`wave bg-white opacity-${n * 10} h-full`}></div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
