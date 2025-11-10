import Profile from "@/components/Profile/Profile";
import Notification from "@/components/Notification/Notification";
import styles from "./RightSection.module.css";

interface RightSectionProps {
  showProfile?: boolean;
  showNotification?: boolean;
}

const RightSection = () => {
  return (
    <div className={styles.rightSection}>
      <div className={styles.darkMode}>
        <span className="material-icons-sharp active"></span>
        <span className="material-icons-sharp"></span>
      </div>

      <Profile />
      <Notification />
    </div>
  );
};

export default RightSection;
