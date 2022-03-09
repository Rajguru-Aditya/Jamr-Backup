import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <img
        src="https://i.ibb.co/TP8VqHk/Whats-App-Image-2022-02-01-at-21-17-1.png"
        alt="jamr-logo"
        className="jamr-logo"
      ></img>
      <div className="navbar-items">
        <div className="location">
          <img
            src="https://img.icons8.com/ios-filled/100/FF782C/marker.png"
            alt="location-marker"
            className="location-marker"
          />
          <h2 className="location-text"> Mumbai </h2>
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/sort-down.png"
            alt="dropdown-arrow"
            className="dropdown-arrow"
          />
        </div>
        <div className="bookSlots">
          <p className="bookSlots-text"> Book Slots </p>
        </div>
        <div className="faq">
          <p className="faq-text"> FAQs </p>
        </div>
        <div className="login-btn">
          <p className="login-btn-text"> Login / Register </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
