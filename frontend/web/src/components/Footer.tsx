import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        <Image
          className="personagem"
          src="/images/mobotst3.png"
          alt="Mascote"
          fill
        />
      </div>

      <Image
        className="bannerFooter"
        src="/images/footerBanner.png"
        alt="Banner Footer"
        fill
      />
      <h2>@CyperWaves</h2>
      <Image
        className="footerimg  floating"
        src="/images/moboFooter.png"
        alt="Mascote Flutuando"
        fill
      />
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
    </footer>
  );
};

export default Footer;
