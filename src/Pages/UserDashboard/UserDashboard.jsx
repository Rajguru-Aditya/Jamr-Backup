import React, { useEffect, useState } from "react";
import "./styles.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import BookingsContent from "../../components/BookingsContent/BookingsContent";
import ReferralContent from "../../components/ReferralContent/ReferralContent";
import StudioOwnerProfile from "../../components/StudioOwnerProfile/StudioOwnerProfile";

function UserDashboard() {
  const [navItemName, setNavItemName] = useState("Bookings");
  const [referralCode, setReferralCode] = useState("");
  const [getReferralData, setReferralData] = useState("");

  const onClickNavItem = (name) => {
    setNavItemName(name);
  };

  useEffect(() => {
    document.title = "Jamr | Dashboard";
  }, []);

  useEffect(() => {
    setReferralCode(getReferralData[0]?.ReferralCode);
  }, [getReferralData]);

  const ProjectsContent = (name) => (
    <div className="content">
      <h1>Projects</h1>
    </div>
  );

  const DisplayContent = () => {
    switch (navItemName) {
      case "Bookings":
        return <BookingsContent />;
      case "Promotions":
        return <ReferralContent />;
      case "Projects":
        return <ProjectsContent />;
      case "Profile":
        return <StudioOwnerProfile />;
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
              className="wavy-orange"
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
                onClickNavItem("Promotions");
              }}
              className="navbar-item-container"
            >
              <div
                className={
                  navItemName === "Promotions"
                    ? "navbar-item-selected"
                    : "navbar-item"
                }
              >
                <p className="navbar-text">Promotions</p>
              </div>
            </div>
            <div
              onClick={() => {
                onClickNavItem("Projects");
              }}
              className="navbar-item-container"
            >
              <div
                className={
                  navItemName === "Projects"
                    ? "navbar-item-selected"
                    : "navbar-item"
                }
              >
                <p className="navbar-text">Projects</p>
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
