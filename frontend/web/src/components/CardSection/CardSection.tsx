import Image from "next/image";
import styles from "./CardSection.module.css";

interface Card {
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface CardSectionProps {
  title: string;
  cards: Card[];
}

const CardSection = ({ title, cards }: CardSectionProps) => (
  <div className={styles.card}>
    <h2 className={styles.cardTheme}>{title}</h2>

    <div className={styles.cardContainer}>
      {cards.map((card, index) => (
        <article key={index} className={styles.articleContainer}>
          <a href={card.link}>
            <div className={styles.cardImg}>
              <Image src={card.icon} alt={card.title} fill />
            </div>

            <h1 className={styles.cardTitle}>{card.title}</h1>

            <p className={styles.cardDescription}>{card.description}</p>
          </a>
        </article>
      ))}
    </div>
  </div>
);

export default CardSection;
