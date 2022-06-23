import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles.css";
import BookingDetailsContext from "../../BookingDetailsContext";
import Modal from "react-modal";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const BookingsContent = () => {
  const { transactionId, setTransactionId } = useContext(BookingDetailsContext);
  const { orderId, setOrderId } = useContext(BookingDetailsContext);
  const { trnStudioId, setTrnStudioId } = useContext(BookingDetailsContext);
  const [LSTransactionId, setLSTransactionId] = useState(null);
  const [uid, setUid] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [starClicked, setStarClicked] = useState(0);
  const [trnIdForReview, setTrnIdForReview] = useState(null);
  const [sidForReview, setSidForReview] = useState(null);
  const [LSTrnId, setLSTrnId] = useState(null);
  const [LSOrderId, setLSOrderId] = useState(null);
  const [LSStudioId, setLSStudioId] = useState(null);

  let [transactionDetails, setTransactionDetails] = useState(null);

  const navigate = useNavigate();

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

  // FETCHING DATA FROM LOCAL STORAGE

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
    if (window.localStorage.getItem("orderId") !== null) {
      if (LSOrderId === null || LSOrderId === undefined || LSOrderId === "") {
        window.localStorage.setItem("orderId", JSON.stringify(orderId));
        // setStoreDetails(JSON.parse(window.localStorage.getItem("details")));
      } else {
        if (orderId !== "") {
          window.localStorage.setItem("orderId", JSON.stringify(orderId));
        }
      }
    } else {
      window.localStorage.setItem("orderId", JSON.stringify(orderId));
    }
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("trnStudioId") !== null) {
      if (
        LSStudioId === null ||
        LSStudioId === undefined ||
        LSStudioId === ""
      ) {
        window.localStorage.setItem("trnStudioId", JSON.stringify(trnStudioId));
        // setStoreDetails(JSON.parse(window.localStorage.getItem("details")));
      } else {
        if (trnStudioId !== "") {
          window.localStorage.setItem(
            "trnStudioId",
            JSON.stringify(trnStudioId)
          );
        }
      }
    } else {
      window.localStorage.setItem("trnStudioId", JSON.stringify(trnStudioId));
    }
  }, []);

  useEffect(() => {
    if (orderId !== null) {
      setLSOrderId(orderId);
    } else {
      if (
        window.localStorage.getItem("orderId") !== null ||
        window.localStorage.getItem("orderId") !== undefined ||
        window.localStorage.getItem("orderId") !== ""
      ) {
        setLSOrderId(window.localStorage.getItem("orderId"));
      }
    }
  }, [orderId]);

  useEffect(() => {
    if (trnStudioId !== null) {
      setLSStudioId(trnStudioId);
    } else {
      if (
        window.localStorage.getItem("trnStudioId") !== null ||
        window.localStorage.getItem("trnStudioId") !== undefined ||
        window.localStorage.getItem("trnStudioId") !== ""
      ) {
        setLSStudioId(window.localStorage.getItem("studioId"));
      }
    }
  }, [trnStudioId]);

  useEffect(() => {
    fetchBookingData();
  }, [LSTransactionId]);

  useEffect(() => {
    console.log("TRANSACTION", transactionDetails);
  }, [transactionDetails]);

  useEffect(() => {
    console.log("Star clicked", starClicked);
  }, [starClicked]);

  const AddReview = async () => {
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/review`,
      {
        //TESTING
        // await fetch(`http://localhost:3000/studio/details/?type=L`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          sid: sidForReview,
          uid: window.localStorage.getItem("userId"),
          ratings: starClicked,
          // review: reviewRef.current.value,
          trnId: trnIdForReview,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.isError) {
          alert("Review added successfully");
          navigate("/");
          console.log("AFTER REVIEW ----->", data.data);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          {/* <div className="bookings-body-item">
            <h1 className="bookings-body-item-name">Time:</h1>
            <h1 className="bookings-body-item-value">March 30, 2022</h1>
          </div> */}
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
          transactionDetails
            .slice(0)
            .reverse()
            .map((transaction, index) => (
              <RenderBookingDetails
                key={index}
                // studioName={transaction.studioName}
                cost={transaction.NetAmount}
                orderNo={transaction.OrderNumber}
                orderId={transaction.order_id}
                date={transaction.DateOfBooking}
                trnId={transaction.id}
                sid={transaction.studioId}
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
