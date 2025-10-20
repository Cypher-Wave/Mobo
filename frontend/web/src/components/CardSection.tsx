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
  <div className="card p-8">
    <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {cards.map((card, i) => (
        <article key={i} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
          <a href={card.link}>
            <Image src={card.icon} alt={card.title} className="mx-auto mb-4 w-20" />
          </a>
          <h1 className="text-lg font-semibold text-center mb-2">{card.title}</h1>
          <p className="text-sm text-gray-700 text-center">{card.description}</p>
        </article>
      ))}
    </div>
  </div>
);

export default CardSection;
