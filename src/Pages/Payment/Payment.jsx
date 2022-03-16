import React from "react";
import "./styles.css";

function Payment() {
  return (
    <div className="payment">
      <div className="payment-image">
        <img
          src="https://i.ibb.co/RycX0TC/wavy-Orange.png"
          alt="wavy-Orange"
          className="wavy-orange"
        ></img>
        <img
          src="https://i.ibb.co/2FdvSgs/Studio-Details-Img.png"
          alt="payment-page-Img"
          className="payment-Page-Vector"
        ></img>
      </div>
      <div className="payment-studioDetails">
        <div className="payment-studioDetails-left-container">
          <img
            src="https://cdn.pixabay.com/photo/2016/03/30/05/41/music-1290087_960_720.jpg"
            alt="studio"
            className="studio-image"
          />
          <div className="promotional-code">
            <p className="subtitle">Apply a promotional code</p>
            <div className="input-btn-container">
              <input type="text" className="promotional-code-input"></input>
              <div className="promotional-code-btn">Apply</div>
            </div>
          </div>
        </div>
        <div className="payment-studioDetails-right-container">
          <div className="payment-studioDetails-info">
            <div className="studioDetails-info-title">
              <h1 className="title">Studio Name</h1>
            </div>
            <div className="studioDetails-info-address">
              <p className="address">Church Road, Bandra</p>
            </div>
          </div>
          <div className="date-time-container">
            <p className="date">Tuesday 15 March, 2022</p>
            <p className="time">4pm to 7pm (3hrs)</p>
          </div>
          <div className="payment-breakdown-container">
            <p className="subtitle">Payment Breakdown</p>
            <div className="cost-container">
              <p className="title">Total</p>
              <p className="title">$100</p>
            </div>
          </div>
          <div className="payment-btn">
            <p>Continue to payment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
