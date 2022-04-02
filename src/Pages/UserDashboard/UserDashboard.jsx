import React, { useState } from "react";
import "./styles.css";

function UserDashboard() {
  const [navItemName, setNavItemName] = useState("Bookings");

  const onClickNavItem = (name) => {
    setNavItemName(name);
  };

  const BookingsContent = () => (
    <div className="content">
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
    <div className="content">
      <h1>Promotions</h1>
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
