import React, { useEffect, useState } from "react";
import "./styles.css";

function Payment() {
  const [pressed, setPressed] = useState(false);

  const PromoCode = () => (
    <div className="promotional-code">
      <p className="subtitle">Apply a promotional code</p>
      <div className="input-btn-container">
        <input type="text" className="promotional-code-input"></input>
        <div className="promotional-code-btn">Apply</div>
      </div>
    </div>
  );

  const PaymentDetails = () => (
    <div className="payment-details-container">
      <p className="subtitle">Your Card Details</p>
      <div className="card-input-container">
        <div>
          <p className="info-text">Card Number</p>
          <input type="text" className="payment-input"></input>
        </div>
        <div>
          <p className="info-text">Express Checkout</p>
          <input type="text" className="payment-input"></input>
        </div>
      </div>
      <div className="card-input-container">
        <div>
          <p className="info-text">Expiry Date</p>
          <input type="text" className="payment-input"></input>
        </div>
        <div>
          <p className="info-text">CVV</p>
          <input type="text" className="payment-input"></input>
        </div>
      </div>
      <div className="card-input-container">
        <div>
          <p className="info-text">Postal Number</p>
          <input type="text" className="payment-input"></input>
        </div>
      </div>
    </div>
  );

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
          {pressed ? <PaymentDetails /> : <PromoCode />}
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
          <div
            className="payment-btn"
            onClick={() => {
              setPressed(true);
              console.log(pressed);
            }}
          >
            <p>Continue to payment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
