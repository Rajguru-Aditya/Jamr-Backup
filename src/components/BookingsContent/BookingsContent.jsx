import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles.css";
import BookingDetailsContext from "../../Context/BookingDetailsContext";
import Modal from "react-modal";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const BookingsContent = () => {
  const { setTransactionId } = useContext(BookingDetailsContext);
  const { setOrderId } = useContext(BookingDetailsContext);
  const { setTrnStudioId } = useContext(BookingDetailsContext);
  const { setOtp } = useContext(BookingDetailsContext);
  const [LSTransactionId, setLSTransactionId] = useState(null);
  const [uid, setUid] = useState(null);
  const [starClicked, setStarClicked] = useState(0);
  const [trnIdForReview, setTrnIdForReview] = useState(null);
  const [sidForReview, setSidForReview] = useState(null);

  let [transactionDetails, setTransactionDetails] = useState(null);

  const navigate = useNavigate();

  const fetchBookingData = async () => {
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${
        process.env.REACT_APP_DOMAIN
      }/orders/studio/all?userid=${window.localStorage.getItem("userId")}`,
      {
        //TESTING
        // await fetch(`http://localhost:3000/studio/details/?type=L`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Transaction history ----->", data);
          setTransactionDetails(data);
        } else {
          alert("Failed", data.message);
        }
      })
      .catch((error) => {
        console.error("ERROR: ", error);
      });
  };

  // FETCHING DATA FROM LOCAL STORAGE

  useEffect(() => {
    if (
      window.localStorage.getItem("userId") !== null ||
      window.localStorage.getItem("userId") !== undefined ||
      window.localStorage.getItem("userId") !== ""
    ) {
      setUid(window.localStorage.getItem("userId"));
    }
  }, []);

  useEffect(() => {
    console.log("UID", uid);
  }, [uid]);

  const getLSTrnID = window.localStorage.getItem("transactionId");

  useEffect(() => {
    if (
      window.localStorage.getItem("transactionId") !== null ||
      window.localStorage.getItem("transactionId") !== undefined ||
      window.localStorage.getItem("transactionId") !== ""
    ) {
      setLSTransactionId(window.localStorage.getItem("transactionId"));
    }
  }, [getLSTrnID]);

  useEffect(() => {
    fetchBookingData();
  }, [LSTransactionId]);

  useEffect(() => {
    console.log("TRANSACTION", transactionDetails);
  }, [transactionDetails]);

  useEffect(() => {
    console.log("Star clicked", starClicked);
  }, [starClicked]);

  const openOrderHistory = () => {
    navigate("/order-history");
  };

  const RenderBookingDetails = (transaction) => {
    return (
      <div
        className="bookings"
        onClick={() => {
          setOrderId(transaction.orderId);
          setTrnStudioId(transaction.sid);
          setTransactionId(transaction.trnId);
          setOtp(transaction.otp);
          window.localStorage.setItem("orderId", transaction.orderId);
          window.localStorage.setItem("otp", transaction.otp);
          window.localStorage.setItem("trnStudioId", transaction.sid);
          window.localStorage.setItem("transactionId", transaction.trnId);

          openOrderHistory();
        }}
      >
        <div className="bookings-header">
          <h1 className="bookings-header-title">StudioName</h1>
          <h1 className="bookings-header-title">{transaction.cost}</h1>
        </div>
        <div className="bookings-body">
          <div className="bookings-body-item">
            <h1 className="bookings-body-item-name">Order Number:</h1>
            <h1 className="bookings-body-item-value">#{transaction.orderId}</h1>
          </div>
          <div className="bookings-body-item">
            <h1 className="bookings-body-item-name">Date:</h1>
            <h1 className="bookings-body-item-value">
              {moment(transaction.date).format("MMMM Do YYYY")}
            </h1>
          </div>
          <div className="bookings-body-item">
            <h1 className="bookings-body-item-name">Duration:</h1>
            <h1 className="bookings-body-item-value">3 hours</h1>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="content-bookings">
      <div className="bookings-container">
        {/* Bookings */}
        {transactionDetails &&
          transactionDetails
            .slice(0)
            .reverse()
            .map((transaction, index) => (
              <RenderBookingDetails
                key={index}
                cost={transaction.netamount}
                orderNo={transaction.OrderNumber}
                orderId={transaction.id}
                date={transaction.bookingdate}
                trnId={transaction.id}
                sid={transaction.studioid}
                otp={transaction.otp}
              />
            ))}
      </div>
    </div>
  );
};

export default BookingsContent;
