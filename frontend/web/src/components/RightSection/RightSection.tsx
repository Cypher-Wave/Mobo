import React from "react";
import Profile from "@/components/Profile/Profile";
import Notification from "@/components/Notification/Notification";
import "./RightSection.css";

interface RightSectionProps {
  showProfile?: boolean;
  showNotification?: boolean;
}

const RightSection: React.FC<RightSectionProps> = ({showProfile = true, showNotification = true}) => {
  return (
    <div className="right-section">
      <div className="dark-mode">
        <span className="material-icons-sharp active"></span>
        <span className="material-icons-sharp"></span>
      </div>

      {showProfile && <Profile />}
      {showNotification && <Notification />}
    </div>
  );
};

export default RightSection;
