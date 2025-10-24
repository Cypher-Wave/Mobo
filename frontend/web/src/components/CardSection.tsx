import React from "react";
import Image from "next/image";

interface Card {
  title: string;
  description: string;
  icon: string;
  link: string;
  style?: React.CSSProperties;
}

interface CardSectionProps {
  title: string;
  cards: Card[];
}

const CardSection: React.FC<CardSectionProps> = ({ title, cards }) => (
  <div className="card">
    <h2 className="title-Btns">{title}</h2>
    <div className="card-container">
      {cards.map((card, i) => (
        <article key={i} className="article">
          <div>
            <a href={card.link}>
              <Image src={card.icon} alt={card.title} className="card-img" fill />
            </a>
            <h1 className="card-title">{card.title}</h1>
            <p className="txtBtns">{card.description}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default CardSection;
