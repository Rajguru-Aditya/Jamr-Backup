import React, { useState } from "react";
import "./styles.css";

function UserDashboard() {
  const [navItemName, setNavItemName] = useState("Bookings");

  const onClickNavItem = (name) => {
    setNavItemName(name);
  };

  const BookingsContent = () => (
    <div className="content-bookings">
      <div className="content-left">
        {/* Bookings */}
        <div className="bookings">
          <div className="bookings-header">
            <h1 className="bookings-header-title">JAMR Studio Name</h1>
            <h1 className="bookings-header-title">$0</h1>
          </div>
          <div className="bookings-body">
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Order Number:</h1>
              <h1 className="bookings-body-item-value">#73645976245</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Date:</h1>
              <h1 className="bookings-body-item-value">March 30, 2022</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Time:</h1>
              <h1 className="bookings-body-item-value">12pm</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Duration:</h1>
              <h1 className="bookings-body-item-value">3 hours</h1>
            </div>
          </div>
        </div>
        {/* Bookings */}
        <div className="bookings">
          <div className="bookings-header">
            <h1 className="bookings-header-title">JAMR Studio Name</h1>
            <h1 className="bookings-header-title">$0</h1>
          </div>
          <div className="bookings-body">
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Order Number:</h1>
              <h1 className="bookings-body-item-value">#73645976245</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Date:</h1>
              <h1 className="bookings-body-item-value">March 30, 2022</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Time:</h1>
              <h1 className="bookings-body-item-value">12pm</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Duration:</h1>
              <h1 className="bookings-body-item-value">3 hours</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="content-right-first">
          <h1 className="bookings-title">Upcoming Orders</h1>
          <p className="bookings-subtitle">0</p>
        </div>
        <div className="content-right-last">
          <h1 className="bookings-title">Completed Orders</h1>
          <p className="bookings-subtitle">0</p>
        </div>
      </div>
    </div>
  );

  const PromotionsContent = (name) => (
    <div className="content-promotions">
      <div className="promotion-content-container">
        <div className="promotion-left">
          <h1 className="promotion-title">Refer and get FREE services</h1>
          <p className="promotion-text">
            Invite your friends to Jamr. They get instant ₹100 off. You win upto
            ₹5000 in rewards.
          </p>
          <div className="promotion-refer-via">
            <div className="promotion-refer-via-item"></div>
            <p className="refer">Refer Via</p>
            <div className="promotion-refer-via-item"></div>
          </div>
          <div className="promotion-refer-platforms">
            <div className="promotion-refer-platforms-item"></div>
            <div className="promotion-refer-platforms-item"></div>
            <div className="promotion-refer-platforms-item"></div>
          </div>
        </div>
        <div className="promotion-right">
          <img
            src="https://snowball-02.icedrive.io/?p=Am4cDCzceRLLmklX86HJzknFnDIqQbmaYjl8U0LMExLXVJEsmjW.k5NrutZEThpse0cHxUkzoqy6vOwi6KqlGQ2qgBNIuB1gPjp54kqdTNLy.HVGBEnC59p5IPMlUJnq6MYDZ7Ix5.Nlw5jZE8uLEw--&w=1024&h=1024&m=cropped"
            alt="promotion"
            className="promotion-img"
          />
        </div>
      </div>
      <div className="promotion-bottom">
        <div className="promotion-bottom-title">
          <h1 className="promotion-title">
            Refer everyone- the most generous referral program
          </h1>
        </div>
        <div className="promotion-data">
          <div className="promotion-data-item">
            <img
              src="https://icecube-eu-308.icedrive.io/download?p=MOgQ4PP4m4gzZoxQDZ2axDk_V3gXyAuuWGkP1YMaFsYAOf0CzZ.X4aTtIf2CwYRRV148gDC2InBXR5MHtqRIh0VsQUZUHDCX5DqG.mLClAH1_ienuzugF3UvV.OJyDRB3lyrScklH16q0W1j1Wdn61AO05R9qqymOrHISjlt44p7mPM5HZtf.Ru3Ygv7XzuY"
              alt="icon"
              className="promotion-data-icon"
            />
            <p className="promotion-data-text">
              Invite all friends even if they have tried us. You will get
              rewarded everytime.
            </p>
          </div>
          <div className="promotion-data-item">
            <img
              src="https://icecube-eu-308.icedrive.io/download?p=MOgQ4PP4m4gzZoxQDZ2axDk_V3gXyAuuWGkP1YMaFsbdaBQWLtZQqgujnZ9IA8HpV148gDC2InBXR5MHtqRIh0VsQUZUHDCX5DqG.mLClAFCbn6Ecr9LOWesyNNkT2iJFpp.fqmKcWEZbk2faNDGQ38HKTMjEvtCYhTFhuLQ9uP9dpk6za4G7cC.KR77u1MNzlvtTbQ211U75Ml3Mza70A--"
              alt="icon"
              className="promotion-data-icon"
            />
            <p className="promotion-data-text">
              Upon inviting, we’ll give them rewards for the services they
              havent tried yet.
            </p>
          </div>
          <div className="promotion-data-item">
            <img
              src="https://icecube-eu-306.icedrive.io/download?p=MOgQ4PP4m4gzZoxQDZ2axDk_V3gXyAuuWGkP1YMaFsZajqXrc_E1s_B6P2mk5weDV148gDC2InBXR5MHtqRIh0VsQUZUHDCX5DqG.mLClAFSlgP.FMIkDulFjlVPpmtEgehrBuVKwevjWKwv69wISeDo_QL1sKLO.kwtNQu5bm0JJ0Oep20J76GTlCxwRtit"
              alt="icon"
              className="promotion-data-icon"
            />
            <p className="promotion-data-text">
              For every successful signup, you can win upto ₹5000, and minimum
              ₹100
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectsContent = (name) => (
    <div className="content">
      <h1>Projects</h1>
    </div>
  );

  const ProfileContent = (name) => (
    <div className="content">
      <h1>Profile</h1>
    </div>
  );

  const DisplayContent = () => {
    switch (navItemName) {
      case "Bookings":
        return <BookingsContent />;
      case "Promotions":
        return <PromotionsContent />;
      case "Projects":
        return <ProjectsContent />;
      case "Profile":
        return <ProfileContent />;
      default:
        return <BookingsContent />;
    }
  };

  return (
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
              navItemName === "Profile" ? "navbar-item-selected" : "navbar-item"
            }
          >
            <p className="navbar-text">Profile</p>
          </div>
        </div>
      </div>
      {DisplayContent()}
    </div>
  );
}

export default UserDashboard;
