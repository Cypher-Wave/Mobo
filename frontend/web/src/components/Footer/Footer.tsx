import React from "react";
import Image from "next/image";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <h2 className="footer-title">@CyperWaves</h2>
      <div className="moboFooter-container">
        <Image
          src="/images/moboFooter.png"
          alt="Mascote Flutuando"
          fill
        />
      </div>
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
