import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/index.js";
import BookingDetailsContext from "../../BookingDetailsContext";
import { ReBookingModal } from "../../components/ReBookingModal/ReBookingModal.jsx";

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
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setallRequests([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).forEach((request) => {
          setallRequests((requests) => [...requests, request]);
        });
      }
    });
  }, []);

  useEffect(() => {
    setstudioRequests(allRequests[parseInt(LSStudioId - 1)]);
  }, [allRequests]);

  useEffect(() => {
    console.log("STUDIO REQUEST", studioRequests);
    setOrders(studioRequests ? studioRequests.orders : []);
  }, [orders, studioRequests]);

  useEffect(() => {
    console.log("ORDERS", orders);
  }, [orders]);

  useEffect(() => {
    setRelatedOrders([]);
    if (orders) {
      Object.entries(orders).forEach(([key, value]) => {
        return key === LSOrderId
          ? setRelatedOrders((relatedOrders) => [
              ...relatedOrders,
              {
                orderId: key,
                orderDetails: value,
              },
            ])
          : null;
      });
    }
  }, [orders]);

  useEffect(() => {
    console.log("RELATED ORDERS", relatedOrders);
    relatedOrders.map((order) => {
      console.log("ORDER", order);
      console.log("ORDER ID", order.orderId);
      console.log("ORDER LS ID", LSOrderId);
      console.log("ORDER Date", order.orderDetails.booking_date);
      //   return order.orderId === LSOrderId;
    });
  }, [LSOrderId, relatedOrders]);

  useEffect(() => {
    console.log("RELATED ORDERS", relatedOrders);
    relatedOrders.filter((order) => {
      return order.orderId === LSOrderId;
    });
  }, [LSOrderId, relatedOrders]);

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
      {/* OLD ORDER HISTORY PAGE */}
      {/* <h1>Order History</h1>
      <div className="orderDetails">
        <div className="orderDetails-content">
          <h3>Status:</h3>
          <h2 className="content-text">
            {relatedOrders[0]?.orderDetails.state === 1
              ? "Accepted"
              : relatedOrders[0]?.orderDetails.state === 1
              ? "Pending"
              : relatedOrders[0]?.orderDetails.state === 0
              ? "Rejected"
              : null}
          </h2>
        </div>
      </div>
      {relatedOrders[0]?.orderDetails.state === 0 ? (
        <>
          <p>Your order has been rejected by the studio owner.</p>
          <h3>Would you like to book diffferent slots?</h3>
          <button className="modalBtn" onClick={openModal}>
            Book slots
          </button>

          <button className="modalBtn" onClick={showData}>
            Show Data
          </button>

          <button className="modalBtn" onClick={Rebooking}>
            Confirm Booking
          </button>
        </>
      ) : null}
      {showModal ? (
        <ReBookingModal setNewSlots={setNewSlots} setShowModal={setShowModal} />
      ) : null} */}

      {/* NEW ORDER HISTORY PAGE */}

      <div className="main-container">
        <div className="left-main-container"></div>
        <div className="right-main-container"></div>
      </div>
    </div>
  );
}

export default OrderHistory;
