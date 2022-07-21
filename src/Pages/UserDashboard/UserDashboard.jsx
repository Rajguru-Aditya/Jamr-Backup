import React, { useEffect, useState, useContext } from "react";
import "./styles.css";
import BookingsContent from "../../components/BookingsContent/BookingsContent";
import ReferralContent from "../../components/ReferralContent/ReferralContent";
import StudioUserProfile from "../../components/StudioUserProfile/StudioUserProfile";
import NavigationContext from "../../Context/NavigationContext";

function UserDashboard() {
  const [navItemName, setNavItemName] = useState("Bookings");
  const [referralCode, setReferralCode] = useState("");
  const [getReferralData, setReferralData] = useState("");
  const { openComponent } = useContext(NavigationContext);

  const onClickNavItem = (name) => {
    setNavItemName(name);
  };

  useEffect(() => {
    document.title = "Jamr | Dashboard";
    setNavItemName(openComponent ? openComponent : "Bookings");
  }, [openComponent]);

  console.log("openComponent", openComponent);

  useEffect(() => {
    setReferralCode(getReferralData[0]?.ReferralCode);
  }, [getReferralData]);

  const DisplayContent = () => {
    switch (navItemName) {
      case "Bookings":
        return <BookingsContent />;
      case "Promotions":
        return <ReferralContent />;
      case "Profile":
        return <StudioUserProfile />;
      default:
        return <BookingsContent />;
    }
  };

  return (
    <div className="container">
      <div className="user-dashboard">
        <div className="banner-image">
          <img
            src="https://i.ibb.co/RycX0TC/wavy-Orange.png"
            alt="wavy-Orange"
            className="wavy-orange-dashboard"
          ></img>
        </div>
        <div className="user-dashboard-navbar">
          <div
            onClick={() => {
              onClickNavItem("Bookings");
            }}
            className="navbar-item-container"
          >
            <div
              className={
                navItemName === "Bookings"
                  ? "navbar-item-selected"
                  : "navbar-item"
              }
            >
              <p className="navbar-text">Bookings</p>
            </div>
          </div>
          <div
            onClick={() => {
              onClickNavItem("Profile");
            }}
            className="navbar-item-container"
          >
            <div
              className={
                navItemName === "Profile"
                  ? "navbar-item-selected"
                  : "navbar-item"
              }
            >
              <p className="navbar-text">Profile</p>
            </div>
          </div>
        </div>
        {DisplayContent()}
      </div>
    </div>
  );
}

export default UserDashboard;
