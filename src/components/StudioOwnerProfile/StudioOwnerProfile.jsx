import moment from "moment";
import React, { useState } from "react";
import ChartData from "../ChartData/ChartData";
import "./styles.css";

function StudioOwnerProfile() {
  const dates = [];

  for (let i = 0; i < 10; i++) {
    const getDate = moment().add(i, "d").toDate();
    const currentDate = getDate.getDate();
    dates.push(currentDate);
  }

  return (
    <div className="profile-container">
      <div className="profile-top-container">
        <header className="user-details">
          <div className="user-image-container">
            <img
              src="https://images.unsplash.com/photo-1560727749-cc261b23794c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="user"
              className="user-image"
            />
          </div>
          <div className="user-info">
            <h1 className="user-name">Jane Doe</h1>
            <h1 className="username">@janedoe</h1>
            <h1 className="ratings">Average Rating ⭐⭐⭐⭐</h1>
          </div>
        </header>
        <div className="call-support-btn">
          <p className="call-support-btn-text">Call Support</p>
        </div>
      </div>
      <div className="profile-middle-container">
        <div className="profile-middle-top-container">
          <div className="data-container">
            <p className="data-container-text">
              You currently have 6 active songs
            </p>
          </div>
          <div className="data-container">
            <div className="text-with-icon">
              <img
                src="https://img.icons8.com/material-outlined/34/FF782C/clock--v1.png"
                alt="clock"
              />
              <p className="data-container-subtext">Upcoming Orders</p>
            </div>
            <div className="arrow-container">
              <img
                src="https://i.ibb.co/QCRtvvy/arrow-right.png"
                alt="arrow-right"
                className="arrow-right"
              />
              <h1>7</h1>
              <img
                src="https://i.ibb.co/zV341kg/arrow-left.png"
                alt="arrow-left"
                className="arrow-left"
              />
            </div>
            <div className="view-orders-btn">
              <p className="view-orders-btn-text">View Orders</p>
            </div>
          </div>
          <div className="data-container">
            <div className="text-with-icon">
              <img
                src="https://img.icons8.com/ios-filled/34/FF772C/paper-plane.png"
                alt="paper-plane"
              />
              <p className="data-container-subtext">Total Orders</p>
            </div>
            <div className="aeroplane-container">
              <img
                src="https://i.ibb.co/DVKV00G/aeroplane-right.png"
                alt="aeroplane-right"
                className="aeroplane-right"
              />
              <h1>20</h1>
              <img
                src="https://i.ibb.co/BtW4Nx4/aeroplane-left.png"
                alt="aeroplane-left"
                className="aeroplane-left"
              />
            </div>
            <div className="view-orders-btn">
              <p className="view-orders-btn-text">View Orders</p>
            </div>
          </div>
        </div>
        <div className="profile-middle-bottom-container">
          <div className="earnings-text-container">
            <div className="text-item">
              <h1>Earnings</h1>
            </div>
            <div className="text-item">
              <p>Balance Breakdown</p>
            </div>
          </div>
          <div className="chart">
            <ChartData />
          </div>
          <div className="chart">
            <ChartData />
          </div>
          <div className="withdraw-btn-and-cost">
            <div className="withdraw-btn">
              <p className="withdraw-btn-text">Withdraw</p>
            </div>
            <div className="withdraw-cost">
              <p className="withdraw-cost-text">₹2567</p>
            </div>
          </div>
        </div>
        <div className="profile-bottom-container">
          <div className="profile-bottom-top-container">
            <h1>Upcoming Orders</h1>
            <div className="profile-dates-container">
              {dates.map((date, index) => (
                <div key={index} className="profile-dates-item">
                  <p className="profile-dates-item-text">{date}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="profile-bottom-bottom-container">
            <div className="profile-bottom-header-container">
              <h1 className="profile-bottom-header">Recent Reviews</h1>
              <div className="profile-avg-ratings-container">
                <h1 className="profile-bottom-header">Average Ratings</h1>
                <p className="profile-avg-ratings">⭐⭐⭐⭐⭐ 5/5</p>
                <p className="show-all-ratings">Show All</p>
              </div>
            </div>
            <div className="profile-rating-items">
              <div className="profile-reviewer">
                <p className="profile-review-text">Reviewer</p>
              </div>
              <div className="profile-ratings">
                <p className="profile-review-text">Ratings</p>
              </div>
              <div className="profile-review">
                <p className="profile-review-text">Review</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudioOwnerProfile;
