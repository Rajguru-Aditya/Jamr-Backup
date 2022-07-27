import React, { useEffect, useState } from "react";
import "./styles.css";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/index.js";
import OtpInput from "react-otp-input-rc-17";
import { FileUploader } from "react-drag-drop-files";
import ScaleLoader from "react-spinners/ScaleLoader";
import Rating from "@material-ui/lab/Rating";
import Alert from "@mui/material/Alert";
import { FaFileAudio } from "react-icons/fa";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

function OrderHistory() {
  const [LSOrderId, setLSOrderId] = useState(null);
  const [LSUserId, setLSUserId] = useState(null);
  const [LSStudioId, setLSStudioId] = useState(null);
  const [LSTrnId, setLSTrnId] = useState(null);
  const [LSOtp, setLSOtp] = useState(null);
  const [newSlots, setNewSlots] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState();
  const [uploading, setUploading] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [ratingValue, setRatingValue] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertReview, setShowAlertReview] = useState(false);
  const [reviewText, setReviewText] = useState();
  const [messageText, setMessageText] = useState();
  const [chatMessages, setChatMessages] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderMessages, setOrderMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //File Upload
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
    console.log("Selected file", file);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    justifyContent: "center",
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

  const getLSUserID = window.localStorage.getItem("orderId");

  useEffect(() => {
    if (
      window.localStorage.getItem("userId") !== null ||
      window.localStorage.getItem("userId") !== undefined ||
      window.localStorage.getItem("userId") !== ""
    ) {
      setLSUserId(window.localStorage.getItem("userId"));
    }
  }, [getLSUserID]);

  //Fetching order details from Firebase
  useEffect(() => {
    onValue(
      ref(
        db,
        `/${window.localStorage.getItem(
          "trnStudioId"
        )}/orders/${window.localStorage.getItem("order-id")}`
      ),
      (snapshot) => {
        setOrderDetails([]);
        const data = snapshot.val();
        if (data !== null) {
          setOrderDetails(data);
        }
      }
    );
  }, []);

  useEffect(() => {
    onValue(
      ref(
        db,
        `/${window.localStorage.getItem(
          "trnStudioId"
        )}/messages/${window.localStorage.getItem("order-id")}`
      ),
      (snapshot) => {
        setOrderMessages([]);
        const data = snapshot.val();
        if (data !== null) {
          setOrderMessages(data);
        }
      }
    );
  }, []);

  useEffect(() => {
    console.log("Firebase Data order", orderDetails);
  }, [orderDetails]);

  useEffect(() => {
    console.log("Firebase Data order Messages", orderMessages);
  }, [orderMessages]);

  useEffect(() => {
    setChatMessages([]);

    Object.values(orderMessages).forEach((value) => {
      // console.log("Message Value", value);
      return setChatMessages((msg) => [...msg, value]);
    });
  }, [LSOrderId, orderMessages]);

  useEffect(() => {
    // console.log("RELATED ORDERS", relatedOrders);
    chatMessages.map((msg) => {
      console.log("Message ----->", msg);
      console.log("Message From", msg.from);
      console.log("Chat Message", msg.message);
      // return order.orderId === LSOrderId;
    });
  }, [chatMessages]);

  useEffect(() => {
    console.log("LS TRN ID", LSTrnId);
  }, [LSTrnId]);

  useEffect(() => {
    GetUploadedFiles();
  }, [LSOrderId, downloadUrl]);

  useEffect(() => {
    setTimeout(() => setShowAlert(false), 4000);
  }, [showAlert]);
  useEffect(() => {
    setTimeout(() => setShowAlertReview(false), 4000);
  }, [showAlertReview]);

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

    formData.append("name", data.name);
    formData.append("upload_file", data);

    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${
        process.env.REACT_APP_DOMAIN
      }/orders/studio/${window.localStorage.getItem("order-id")}/files/upload`,
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
          setUploading(false);
          setDownloadUrl(data.downloadUrl);
          setShowAlert(true);
          setFile(null);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Get uploaded files
  const GetUploadedFiles = async () => {
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/order/files?order_id=${LSOrderId}`,
      {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.isError) {
          console.log("GET uploaded files ----->", data.files);
          setAllFiles(data.files);
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

  const Review = async () => {
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/review`,
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sid: LSStudioId,
          ratings: ratingValue,
          uid: LSUserId,
          trnId: LSTrnId,
          review: reviewText,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          setReviewText("");
        }
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

  const Message = async (e) => {
    e.preventDefault();
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/order/message`,
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sid: LSStudioId,
          order_id: LSOrderId,
          msg_owner: "client",
          trnid: LSTrnId,
          message: messageText,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          setMessageText("");
        }
        return response.json();
      })
      .then((data) => {
        if (!data.isError) {
          console.log("Message ----->", data);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitReview = () => {
    if (ratingValue && reviewText) {
      Review();
    } else {
      alert("Please Rate the studio and add review text");
    }
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
                {orderDetails.state === -1
                  ? "Pending"
                  : orderDetails.state === 1
                  ? "Order Accepted"
                  : orderDetails.state === 0
                  ? "Order Rejected"
                  : "Error"}
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
          {orderDetails.state === -1 ? null : orderDetails.state === 1 ? (
            <>
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
                      className="modalBtn modalBtn3"
                      onClick={() => {
                        setUploading(true);
                        UploadFile(file);
                      }}
                    >
                      {uploading ? (
                        <div>
                          <ScaleLoader
                            color={"#fff"}
                            loading={uploading}
                            height={20}
                            width={5}
                            radius={50}
                          />
                        </div>
                      ) : (
                        <p>Upload File</p>
                      )}
                    </button>
                  </>
                ) : null}
                {showAlert ? (
                  <Alert severity="success">File Uploaded Successfully!</Alert>
                ) : null}
                {allFiles ? (
                  <div className="uploaded-file-container">
                    <h3>Uploaded Files</h3>
                    <div className="file-container">
                      {allFiles.map((file) => {
                        let fileName = file.name;
                        return (
                          <div className="uploaded-file" key={file.downloadUrl}>
                            <a
                              className="file-link"
                              href={file.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaFileAudio size={26} color={"#888"} />
                              <p className="file-name">
                                {fileName.slice(0, -4)}
                              </p>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="message-container">
                <div className="message-text-content">
                  <div className="message-box">
                    <h2>Write a message to the host</h2>
                    <form
                      className="message-form"
                      onSubmit={(event) => {
                        event.preventDefault();
                      }}
                    >
                      <textarea
                        rows={6}
                        name="message"
                        className="textarea"
                        value={messageText}
                        onChange={(text) => {
                          setMessageText(text.target.value);
                        }}
                      ></textarea>
                    </form>
                    <div className="message-btn-container">
                      <button className="modalBtn modalBtn2" onClick={Message}>
                        Send Message
                      </button>
                      <button
                        className="modalBtn modalBtn4"
                        onClick={handleOpen}
                      >
                        Open Chat
                      </button>
                    </div>
                  </div>
                </div>
                <div className="help-btn-container">
                  <h2>Need Help?</h2>
                  <div className="buttons-container">
                    <button className="contact-btn live-chat-btn">
                      Live Chat
                    </button>
                    <button className="contact-btn call-us-btn">Call Us</button>
                  </div>
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modalStyle}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Text in a modal
                    </Typography>
                    <div className="chat-area">
                      {chatMessages.map((msg) => (
                        <>
                          {msg.from === "client" ? (
                            <div className="message-text-box">
                              <p style={{ margin: 0 }}>Client</p>
                              <p className="chat-text-user">{msg.message}</p>
                            </div>
                          ) : (
                            <div className="message-text-box">
                              <p style={{ margin: 0 }}>Studio</p>
                              <p className="chat-text-studio">{msg.message}</p>
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                    <div className="chat-input">
                      <TextField
                        className="outlined-basic"
                        label="Type your message ..."
                        variant="outlined"
                        onChange={(text) => {
                          console.log("Chat Text", messageText);
                          setMessageText(text.target.value);
                        }}
                      />
                      <Button
                        onClick={Message}
                        className="chat-send-btn"
                        variant="contained"
                      >
                        Send
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </div>
              <div className="review-container">
                <div className="review-items-container">
                  <div className="review-stars-container">
                    <h2>Rate the Studio</h2>
                    <Rating
                      name="no-value"
                      value={ratingValue}
                      onChange={(event, newValue) => {
                        console.log("Ratings", newValue);
                        setRatingValue(newValue);
                      }}
                      size="large"
                    />
                  </div>
                  <div className="review-text-content">
                    <div className="review-box">
                      <h2>Write a Review</h2>
                      <form>
                        <textarea
                          rows={6}
                          name="review"
                          className="textarea"
                          value={reviewText}
                          onChange={(text) => {
                            console.log("Review", text.target.value);
                            setReviewText(text.target.value);
                          }}
                        ></textarea>
                      </form>
                    </div>
                  </div>
                </div>
                <button className="modalBtn modalBtn2" onClick={submitReview}>
                  Submit Review
                </button>
              </div>
            </>
          ) : orderDetails.state === 0 ? (
            <div className="rebooking-container">
              <div className="rebooking-inner-container">
                <h1 className="detail rebooking-text">
                  The studio owner has rejected your order. Please Rebook your
                  order with different slots
                </h1>
                <button className="modalBtn modalBtn2" onClick={submitReview}>
                  Rebook Slots
                </button>
              </div>
            </div>
          ) : (
            "Error"
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
