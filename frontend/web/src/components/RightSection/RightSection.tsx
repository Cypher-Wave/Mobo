import Profile from "@/components/Profile/Profile";
import Notification from "@/components/Notification/Notification";
import styles from "./RightSection.module.css";

interface RightSectionProps {
  showProfile?: boolean;
  showNotification?: boolean;
}

const RightSection = ({
  showProfile = true,
  showNotification = true,
}: RightSectionProps) => {
  return (
    <div className={styles.rightSection}>
      <div className={styles.darkMode}>
        <span className="material-icons-sharp active"></span>
        <span className="material-icons-sharp"></span>
      </div>

      {showProfile && <Profile />}
      {showNotification && <Notification />}
    </div>
  );
};

export default RightSection;
