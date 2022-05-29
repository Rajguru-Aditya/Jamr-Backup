import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import BookingDetailsContext from "../../BookingDetailsContext";

const BookingsContent = () => {
  const { transactionId } = useContext(BookingDetailsContext);
  const [LSTransactionId, setLSTransactionId] = useState(null);
  const [uid, setUid] = useState(null);
  let [transactionDetails, setTransactionDetails] = useState(null);

  const fetchBookingData = async () => {
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/transaction/history`,
      {
        //TESTING
        // await fetch(`http://localhost:3000/studio/details/?type=L`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          listType: "S",
          transactionId: LSTransactionId,
          uid: uid,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.isError) {
          console.log("Transaction history ----->", data.data);
          setTransactionDetails(data.data);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (transactionId !== null) {
      setLSTransactionId(transactionId);
    } else {
      if (
        window.localStorage.getItem("transactionId") !== null ||
        window.localStorage.getItem("transactionId") !== undefined
      ) {
        setLSTransactionId(window.localStorage.getItem("transactionId"));
      }
    }
  }, [transactionId]);

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
    fetchBookingData();
  }, [LSTransactionId]);

  useEffect(() => {
    console.log("TRANSACTION", transactionDetails);
  }, [fetchBookingData]);

  const RenderBookingDetails = (transaction) => {
    return (
      <div className="bookings">
        <div className="bookings-header">
          <h1 className="bookings-header-title">StudioName</h1>
          <h1 className="bookings-header-title">{transaction.cost}</h1>
        </div>
        <div className="bookings-body">
          <div className="bookings-body-item">
            <h1 className="bookings-body-item-name">Order Number:</h1>
            <h1 className="bookings-body-item-value">#{transaction.orderNo}</h1>
          </div>
          <div className="bookings-body-item">
            <h1 className="bookings-body-item-name">Date:</h1>
            <h1 className="bookings-body-item-value">{transaction.date}</h1>
          </div>
          <div className="bookings-body-item">
            <h1 className="bookings-body-item-name">Time:</h1>
            <h1 className="bookings-body-item-value">March 30, 2022</h1>
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
      <div className="content-left">
        {/* Bookings */}
        {transactionDetails &&
          transactionDetails.map((transaction, index) => (
            <RenderBookingDetails
              key={index}
              // studioName={transaction.studioName}
              cost={transaction.NetAmount}
              orderNo={transaction.OrderNumber}
              date={transaction.DateOfBooking}
            />
          ))}
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
};

export default BookingsContent;
