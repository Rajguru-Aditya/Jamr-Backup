import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/index.js";
import BookingDetailsContext from "../../BookingDetailsContext";
import { ReBookingModal } from "../../components/ReBookingModal/ReBookingModal.jsx";
import OtpInput from "react-otp-input";
import { FileUploader } from "react-drag-drop-files";

function OrderHistory() {
  const [allRequests, setallRequests] = useState([]);
  const [studioRequests, setstudioRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [relatedOrders, setRelatedOrders] = useState([]);
  const [LSOrderId, setLSOrderId] = useState(null);
  const [LSStudioId, setLSStudioId] = useState(null);
  const [LSTrnId, setLSTrnId] = useState(null);
  const [LSOtp, setLSOtp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newSlots, setNewSlots] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState();

  //File Upload
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
    console.log("Selected file", file);
  };

  const getLSOrderID = window.localStorage.getItem("orderId");

  useEffect(() => {
    if (
      window.localStorage.getItem("orderId") !== null ||
      window.localStorage.getItem("orderId") !== undefined ||
      window.localStorage.getItem("orderId") !== ""
    ) {
      setLSOrderId(window.localStorage.getItem("orderId"));
    }
  }, [getLSOrderID]);

  const getTrnStudioId = window.localStorage.getItem("trnStudioId");

  useEffect(() => {
    if (
      window.localStorage.getItem("trnStudioId") !== null ||
      window.localStorage.getItem("trnStudioId") !== undefined ||
      window.localStorage.getItem("trnStudioId") !== ""
    ) {
      setLSStudioId(window.localStorage.getItem("trnStudioId"));
    }
  }, [getTrnStudioId]);

  const getLSTrnID = window.localStorage.getItem("transactionId");

  useEffect(() => {
    if (
      window.localStorage.getItem("transactionId") !== null ||
      window.localStorage.getItem("transactionId") !== undefined ||
      window.localStorage.getItem("transactionId") !== ""
    ) {
      setLSTrnId(window.localStorage.getItem("transactionId"));
    }
  }, [getLSTrnID]);

  const getLSOTP = window.localStorage.getItem("otp");

  useEffect(() => {
    if (
      window.localStorage.getItem("otp") !== null ||
      window.localStorage.getItem("otp") !== undefined ||
      window.localStorage.getItem("otp") !== ""
    ) {
      setLSOtp(window.localStorage.getItem("otp"));
    }
  }, [getLSOTP]);

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
    // console.log("STUDIO REQUEST", studioRequests);
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
    // console.log("RELATED ORDERS", relatedOrders);
    relatedOrders.map((order) => {
      console.log("ORDER", order);
      console.log("ORDER ID", order.orderId);
      console.log("ORDER LS ID", LSOrderId);
      console.log("ORDER State", order.orderDetails.state);
      // return order.orderId === LSOrderId;
    });
  }, [LSOrderId, relatedOrders]);

  useEffect(() => {
    // console.log("RELATED ORDERS", relatedOrders);
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

  // File upload api

  const UploadFile = async (data) => {
    const formData = new FormData();

    formData.append("file_name", data.name);
    formData.append("order_id", LSOrderId);
    formData.append("upload_file", data);

    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/order/files/upload`,
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
        },
        body: formData,
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.isError) {
          console.log("File uploading ----->", data);
          setDownloadUrl(data.downloadUrl);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
              <h1 className="request-status">
                {relatedOrders.map((order) => {
                  return order.orderDetails.state === -1
                    ? "Pending"
                    : order.orderDetails.state === 1
                    ? "Order Accepted"
                    : order.orderDetails.state === 0
                    ? "Order Rejected"
                    : "Error";
                })}
              </h1>
            </div>
            <div className="request-status-container">
              <h2>OTP</h2>
              <OtpInput
                value={LSOtp}
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
              <div>
                <FileUploader
                  handleChange={handleFileChange}
                  name="file"
                  types={fileTypes}
                  classes="file-upload-box"
                  maxSize={1024}
                  children={
                    <>
                      <h2>Drag and Drop a File here</h2>
                      <h2>OR</h2>
                      <h3 className="modalBtn modalBtn2">
                        Click here to select a file
                      </h3>
                      <p>Max file size 1GB</p>
                    </>
                  }
                />
              </div>
            </div>
            {file ? (
              <>
                <div className="selected-file-container">
                  <div className="selected-file">
                    <h1 className="detail">{file.name}</h1>
                  </div>
                </div>
                <button
                  className="modalBtn modalBtn2"
                  onClick={() => {
                    UploadFile(file);
                  }}
                >
                  Upload Selected File
                </button>
              </>
            ) : null}
            {downloadUrl ? (
              <div className="uploaded-file-container">
                <h3>Uploaded Files</h3>
                <div className="uploaded-file">
                  <a
                    className="file-link"
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h1 className="detail">{file.name}</h1>
                  </a>
                </div>
              </div>
            ) : null}
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
