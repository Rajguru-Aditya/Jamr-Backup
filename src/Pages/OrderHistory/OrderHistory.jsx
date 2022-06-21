import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/index.js";
import BookingDetailsContext from "../../BookingDetailsContext";
import { ReBookingModal } from "../../components/ReBookingModal/ReBookingModal.jsx";
import OtpInput from "react-otp-input";

function OrderHistory() {
  const [details, setDetails] = useState([]);
  const [allRequests, setallRequests] = useState([]);
  const [requestKeys, setRequestKeys] = useState([]);
  const [requestValues, setRequestValues] = useState([]);
  const [studioRequests, setstudioRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [relatedOrders, setRelatedOrders] = useState([]);
  const { orderId } = useContext(BookingDetailsContext);
  const { trnStudioId } = useContext(BookingDetailsContext);
  const [LSOrderId, setLSOrderId] = useState(null);
  const [LSStudioId, setLSStudioId] = useState(null);
  const [LSTrnId, setLSTrnId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { transactionId, setTransactionId } = useContext(BookingDetailsContext);
  const [newSlots, setNewSlots] = useState([]);
  const [otp, setOtp] = useState();

  useEffect(() => {
    console.log("New Slots ->", newSlots);
  }, [newSlots]);

  useEffect(() => {
    if (window.localStorage.getItem("orderId") !== null) {
      if (LSOrderId === null || LSOrderId === undefined || LSOrderId === "") {
        window.localStorage.setItem("orderId", JSON.stringify(orderId));
        // setStoreDetails(JSON.parse(window.localStorage.getItem("details")));
      } else {
        if (orderId !== "" && LSOrderId !== details) {
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
        if (trnStudioId !== "" && LSStudioId !== details) {
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
    if (window.localStorage.getItem("transactionId") !== null) {
      if (LSTrnId === null || LSTrnId === undefined || LSTrnId === "") {
        window.localStorage.setItem(
          "transactionId",
          JSON.stringify(transactionId)
        );
        // setStoreDetails(JSON.parse(window.localStorage.getItem("details")));
      } else {
        if (transactionId !== "") {
          window.localStorage.setItem(
            "transactionId",
            JSON.stringify(transactionId)
          );
        }
      }
    } else {
      window.localStorage.setItem(
        "transactionId",
        JSON.stringify(transactionId)
      );
    }
  }, []);

  useEffect(() => {
    if (LSTrnId !== null) {
      setLSTrnId(transactionId);
    } else {
      if (
        window.localStorage.getItem("transactionId") !== null ||
        window.localStorage.getItem("transactionId") !== undefined ||
        window.localStorage.getItem("transactionId") !== ""
      ) {
        setLSTrnId(window.localStorage.getItem("transactionId"));
      }
    }
  }, [transactionId]);

  //Fetching all requests from Firebase
  // useEffect(() => {
  //   onValue(ref(db), (snapshot) => {
  //     setallRequests([]);
  //     const data = snapshot.val();
  //     if (data !== null) {
  //       Object.values(data).forEach((request) => {
  //         setallRequests((requests) => [...requests, request]);
  //       });
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   setstudioRequests(allRequests[parseInt(LSStudioId - 1)]);
  // }, [allRequests]);

  // useEffect(() => {
  //   // console.log("STUDIO REQUEST", studioRequests);
  //   setOrders(studioRequests ? studioRequests.orders : []);
  // }, [orders, studioRequests]);

  // useEffect(() => {
  //   console.log("ORDERS", orders);
  // }, [orders]);

  // useEffect(() => {
  //   setRelatedOrders([]);
  //   if (orders) {
  //     Object.entries(orders).forEach(([key, value]) => {
  //       return key === LSOrderId
  //         ? setRelatedOrders((relatedOrders) => [
  //             ...relatedOrders,
  //             {
  //               orderId: key,
  //               orderDetails: value,
  //             },
  //           ])
  //         : null;
  //     });
  //   }
  // }, [orders]);

  // useEffect(() => {
  //   // console.log("RELATED ORDERS", relatedOrders);
  //   relatedOrders.map((order) => {
  //     console.log("ORDER", order);
  //     console.log("ORDER ID", order.orderId);
  //     console.log("ORDER LS ID", LSOrderId);
  //     console.log("ORDER Date", order.orderDetails.booking_date);
  //     //   return order.orderId === LSOrderId;
  //   });
  // }, [LSOrderId, relatedOrders]);

  // useEffect(() => {
  //   // console.log("RELATED ORDERS", relatedOrders);
  //   relatedOrders.filter((order) => {
  //     return order.orderId === LSOrderId;
  //   });
  // }, [LSOrderId, relatedOrders]);

  useEffect(() => {
    console.log("LS TRN ID", LSTrnId);
  }, [LSTrnId]);

  const options = {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // trn_id: transactionId ? transactionId : LSTrnId,
      // slots: newSlots,
      slots: newSlots,
      trn_id: LSTrnId,
    }),
  };

  const Rebooking = async () => {
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/transaction/reject-transaction`,
      options
    )
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

  const openModal = () => {
    setShowModal(true);
  };

  const showData = () => {
    console.log("Get LS TRN ID", LSTrnId);
    console.log("Get TRN ID", transactionId);
    console.log("Get New Slots", newSlots);
  };

  return (
    <div className="orderHistory">
      <div className="main-container">
        <div className="left-main-container">
          <div className="order-profile-container">
            <div className="profile-image">
              <img
                src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt="profile"
                className="profile-pic"
              />
            </div>
            <div className="profile-details">
              <h1 className="name">Aditya Rajguru</h1>
              <div className="contact-container">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/new-post.png"
                  alt="email"
                  className="contact-icons"
                />
                <h2 className="email">abc123@gmail.com</h2>
              </div>
              <div className="contact-container">
                <img
                  src="https://img.icons8.com/material-outlined/50/ffffff/iphone--v1.png"
                  alt="phone"
                  className="contact-icons"
                />
                <h2 className="phone">1234567899</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="right-main-container">
          <div className="right-top-container">
            <div className="request-status-container">
              <h2>Order Status</h2>
              <h1 className="request-status">Order Accepted</h1>
            </div>
            <div className="request-status-container">
              <h2>OTP</h2>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                // separator={<span> - </span>}
                containerStyle={"otp-container"}
                inputStyle={"otp-input"}
              />
            </div>
          </div>
          <div className="order-details-container">
            <div className="order-details-text-content">
              <div id="text-container">
                <div className="order-details-content">
                  <p className="detail-title">Recording Date: </p>
                  <h1 className="detail">20th July 2022</h1>
                </div>
                <div className="order-details-content">
                  <p className="detail-title">Time: </p>
                  <h1 className="detail">1pm - 4pm</h1>
                </div>
                <div className="order-details-content">
                  <p className="detail-title">Payment Type: </p>
                  <h1 className="detail">UPI</h1>
                </div>
              </div>
            </div>
            <div className="order-details-btn-container">
              <button className="modalBtn">Call the studio</button>
              <button className="modalBtn">Get directions</button>
            </div>
          </div>
          {/* <div className="rebooking-container">
            <button className="modalBtn" onClick={openModal}>
              Book slots
            </button>
            {showModal ? (
              <ReBookingModal
                setNewSlots={setNewSlots}
                setShowModal={setShowModal}
              />
            ) : null}
            <button className="modalBtn detail" onClick={Rebooking}>
              Confirm Booking
            </button>
          </div> */}
          <div className="file-upload-container">
            <div className="file-upload-inner-container">
              <div className="file-upload-box">
                <form>
                  <input type="file" name="file" className="modalBtn" />
                </form>
                <h2>Or Drag and Drop a File here</h2>
                <p>Max file size 1GB</p>
              </div>
            </div>
            <button className="modalBtn">Upload Selected File</button>
          </div>
          <div className="message-container">
            <div className="message-text-content">
              <div className="message-box">
                <h2>Write a message to the host</h2>
                <form className="message-form">
                  <textarea
                    rows={6}
                    name="message"
                    className="textarea"
                  ></textarea>
                </form>
              </div>
            </div>
            <div className="message-btn-container">
              <h2>Need Help?</h2>
              <div className="buttons-container">
                <button className="contact-btn live-chat-btn">Live Chat</button>
                <button className="contact-btn call-us-btn">Call Us</button>
              </div>
            </div>
          </div>
          <div className="review-container">
            <div className="review-btn-container">
              <h2>Rate the Studio</h2>
              <div className="buttons-container">
                <h1>⭐</h1>
                <h1>⭐</h1>
                <h1>⭐</h1>
                <h1>⭐</h1>
                <h1>⭐</h1>
              </div>
            </div>
            <div className="review-text-content">
              <div className="review-box">
                <h2>Write a Review</h2>
                <form>
                  <textarea
                    rows={6}
                    name="review"
                    className="textarea"
                  ></textarea>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
