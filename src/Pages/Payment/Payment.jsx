import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import moment from "moment";
import ScaleLoader from "react-spinners/ScaleLoader";
import BookingDetailsContext from "../../BookingDetailsContext";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [pressed, setPressed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { details } = useContext(BookingDetailsContext);
  const [storeDetails, setStoreDetails] = useState();
  const color = "#FF782C";
  let LSItems;
  let navigate = useNavigate();

  useEffect(() => {
    if(window.localStorage.getItem("details") !== null) {
      LSItems = JSON.parse(window.localStorage.getItem("details"));
      console.log("LSItems", LSItems.bookingDate);
      if(LSItems.bookingDate === null ||
        LSItems.bookingDate === undefined ||
        LSItems.bookingDate === ""){
          window.localStorage.setItem("details", JSON.stringify(details));
          // setStoreDetails(JSON.parse(window.localStorage.getItem("details")));
      } else {
        if( details.bookingDate !== "" && LSItems.bookingDate !== details.bookingDate){
          window.localStorage.setItem("details", JSON.stringify(details));
        }
      }
    } else {
      window.localStorage.setItem("details", JSON.stringify(details));
    }

  }, []);

  useEffect(() => {
    if(LSItems !== undefined || LSItems !== null || LSItems !== "") {
      setStoreDetails(LSItems);
    }
  }, [LSItems]);
  

  useEffect(() => {
    document.title = "Jamr | Payment";
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  console.log("LOCAL STORAGE details", JSON.parse(window.localStorage.getItem("details")));


  const transaction = async () => {
    //PRODUCTION
    await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/transaction/new`, {
    //TESTING  
    // await fetch(`http://localhost:3000/studio/details/?type=L`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        studioId: window.localStorage.getItem("studioId"),
        clientId: window.localStorage.getItem("userId"),
        date: details.bookingDate ? details.bookingDate : storeDetails?.bookingDate,
        basePrice: details.pricePerHour ? details.pricePerHour : storeDetails?.pricePerHour,
        paymentMode: "test card",
        isJamr: 0,
        slots: details.selectedSlots ? details.selectedSlots : storeDetails?.selectedSlots,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.isError) {
          console.log("Transaction history ----->", data.data);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log("storeDetails", storeDetails);


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
      <div
        className="proceed-payment-btn"
        onClick={() => {
            transaction();
        }}
      >
        <p>Proceed to pay</p>
      </div>
    </div>
  );

  return (
    <div className="payment">
      {loading ? (
        <div className="loader">
          <ScaleLoader
            color={color}
            loading={loading}
            height={100}
            width={20}
            radius={100}
            margin={10}
          />
        </div>
      ) : (
        <>
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
                  <h1 className="title">{details.studioName ? details.studioName : storeDetails?.studioName }</h1>
                </div>
                <div className="studioDetails-info-address">
                  <p className="address">{details.studioAddress ? details.studioAddress : storeDetails?.studioAddress }</p>
                </div>
              </div>
              <div className="date-time-container">
                <p className="date">
                  {moment(details.bookingDate ? details.bookingDate : storeDetails?.bookingDate ).format("MMMM Do YYYY")}
                </p>
                <p className="time">
                  {details.startTime ? details.startTime : storeDetails?.startTime }pm to {details.endTime ? details.endTime : storeDetails?.endTime }pm
                </p>
              </div>
              <div className="payment-breakdown-container">
                <p className="subtitle">Payment Breakdown</p>
                <div className="cost-container">
                  <p className="title">Total</p>
                  <p className="title">₹{details.totalPrice ? details.totalPrice : storeDetails?.totalPrice }</p>
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
        </>
      )}
    </div>
  );
}

export default Payment;
