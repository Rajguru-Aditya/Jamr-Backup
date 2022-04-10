import React from "react";
import "./styles.css";

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

export default BookingsContent;
