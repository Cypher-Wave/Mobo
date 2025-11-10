import { useRouter } from "next/navigation";
import styles from "./FirstColumn.module.css";

interface Infos {
  title: string;
  description1: string;
  description2: string;
  link: string;
  button: string;
}

interface FirstColumnProps {
  info: Infos;
}

const FirstColumn = ({ info }: FirstColumnProps) => {
  const router = useRouter();

  return (
    <div className={styles.firstColumn}>
      <h2 className={`${styles.title} ${styles.titlePrimary}`}>
        {info.title}
      </h2>

      <p className={styles.description}>{info.description1}</p>
      <p className={styles.description}>{info.description2}</p>

      <button
        className="btn btn-secondary"
        onClick={() => router.push(info.link)}
      >
        {info.button}
      </button>
    </div>
  );
};

export default FirstColumn;
