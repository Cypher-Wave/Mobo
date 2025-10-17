import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <h2>@CyperWaves</h2>
      <img
        className="footerimg floating"
        src="../../../../assets/img/moboFooter.png"
        alt="Mobo Footer"
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
