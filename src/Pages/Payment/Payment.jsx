import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import moment from "moment";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [storeDetails, setStoreDetails] = useState();
  const [paymentLoading, setPaymentLoading] = useState(false);
  let receiptId = [];
  let LSItems;
  let navigate = useNavigate();

  const getLSItems = window.localStorage.getItem("details");

  useEffect(() => {
    if (
      window.localStorage.getItem("details") !== null ||
      window.localStorage.getItem("details") !== undefined ||
      window.localStorage.getItem("details") !== ""
    ) {
      setStoreDetails(JSON.parse(window.localStorage.getItem("details")));
    }
  }, [getLSItems]);

  useEffect(() => {
    console.log("store Details =>>>", storeDetails);
  }, [storeDetails]);

  // useEffect(() => {
  //   if (
  //     window.localStorage.getItem("transactionId") !== null ||
  //     window.localStorage.getItem("transactionId") !== "" ||
  //     window.localStorage.getItem("transactionId") !== undefined
  //   ) {
  //     let tempLSTrnId = window.localStorage.getItem("transactionId");
  //     setLSTransactionId(tempLSTrnId);
  //     console.log("transactionId", LSTransactionId);
  //     if (
  //       LSTransactionId === null ||
  //       LSTransactionId === undefined ||
  //       LSTransactionId === ""
  //     ) {
  //       window.localStorage.setItem(
  //         "transactionId",
  //         JSON.stringify(transactionId)
  //       );
  //       // setStoreDetails(JSON.parse(window.localStorage.getItem("details")));
  //     } else {
  //       if (transactionId !== "" && LSTransactionId !== transactionId) {
  //         window.localStorage.setItem(
  //           "transactionId",
  //           JSON.stringify(transactionId)
  //         );
  //       }
  //     }
  //   } else {
  //     window.localStorage.setItem(
  //       "transactionId",
  //       JSON.stringify(transactionId)
  //     );
  //   }
  // }, [LSTransactionId, transactionId]);

  // useEffect(() => {
  //   if (LSItems !== undefined || LSItems !== null || LSItems !== "") {
  //     setStoreDetails(LSItems);
  //   }
  //   if (
  //     LSTransactionId !== undefined ||
  //     LSTransactionId !== null ||
  //     LSTransactionId !== ""
  //   ) {
  //     setStoreTrnId(LSTransactionId);
  //   }
  // }, [LSItems, LSTransactionId]);

  useEffect(() => {
    document.title = "Jamr | Payment";
  }, []);

  useEffect(() => {
    console.log("RECEIPT ID", receiptId);
  }, [receiptId]);

  console.log(
    "LOCAL STORAGE details",
    JSON.parse(window.localStorage.getItem("details"))
  );

  // const transaction = async (response) => {
  //   //PRODUCTION
  //   await fetch(
  //     `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/transaction/new`,
  //     {
  //       method: "Post",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify({
  //         studioId: window.localStorage.getItem("studioId"),
  //         clientId: window.localStorage.getItem("userId"),
  //         date: storeDetails?.bookingDate,
  //         basePrice: storeDetails?.pricePerHour,
  //         paymentMode: "test card",
  //         isJamr: 0,
  //         slots: storeDetails?.selectedSlots,
  //         couponCode: "",
  //         order_id: response.razorpay_order_id,
  //         receipt_id: receiptId[0],
  //         payment_id: response.razorpay_payment_id,
  //         paymentSignature: response.razorpay_signature,
  //       }),
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (!data.isError) {
  //         console.log("Transaction history ----->", data.data);
  //         console.log("Order Id", response.razorpay_order_id);
  //         alert("Transaction Successful");
  //         setTransactionId(data.data.transactionId);
  //         window.localStorage.setItem("transactionId", transactionId);
  //         navigate("/dashboard");
  //       } else {
  //         console.log("Failed", data.isError);
  //         alert("Transaction Failed");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // PAYMENT

  const PaymentInitiate = async () => {
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/payment/initiate`,
      // `https://backend.jamr.online/payment/gateway/initiate`,
      {
        //TESTING
        // await fetch(`http://localhost:3000/studio/details/?type=L`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          amount: window.localStorage.getItem("netAmount"),
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("payment api called ----->", data);
          // alert("Transaction Successful");
          // navigate("/");
          // RazorPayPayment(data);
          // receiptId.push(data.receipt);
          window.localStorage.setItem("orderId", data.gatewayorderid);
          window.localStorage.setItem("payment-id", data.id);
          RazorPayPayment();
        } else {
          console.log("Failed", data);
          setPaymentLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log("storeDetails", storeDetails);
  console.log("storeDetails DATE", storeDetails?.bookingDate.substring(0, 10));

  // RAZORPAY PAYMENT

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
        setPaymentLoading(false);
      };

      document.body.appendChild(script);
    });
  };

  const RazorPayPayment = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Something went wrong");
      return;
    }

    const options = {
      key: "rzp_test_JQQLKxhPmex7o8", // Enter the Key ID generated from the Dashboard
      amount: window.localStorage.getItem("netAmount"), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "JAMR",
      description: "Test Transaction",
      image:
        "https://i.ibb.co/TP8VqHk/Whats-App-Image-2022-02-01-at-21-17-1.png",
      order_id: window.localStorage.getItem("orderId"), //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        setPaymentLoading(false);
        alert("SUCCESS");
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        console.log(response);
        PaymentSuccess();
      },
      theme: {
        color: "#FF782C",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      setPaymentLoading(false);
      alert(response.error.code);
      alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  //----------> New APIs <-----------

  const NewOrder = async () => {
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/orders/studio/new`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          studioid: window.localStorage.getItem("studioId"),
          userid: window.localStorage.getItem("userId"),
          bookingdate: (storeDetails?.bookingDate).substring(0, 10),
          priceperhour: parseInt(storeDetails?.pricePerHour),
          isjamrpackage: false,
          starttime:
            storeDetails?.startTime > 9
              ? storeDetails?.startTime + ":00:00"
              : "0" + storeDetails?.startTime + ":00:00",
          endtime:
            storeDetails?.endTime > 9
              ? storeDetails?.endTime + ":00:00"
              : "0" + storeDetails?.endTime + ":00:00",
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.netamount) {
          console.log("Order history ----->", data);
          // console.log("Order Id", response.razorpay_order_id);
          // alert("Transaction Successful");
          // setTransactionId(data.data.transactionId);
          window.localStorage.setItem("netAmount", data.netamount);
          window.localStorage.setItem("order-id", data.id);
          // navigate("/dashboard");
          PaymentInitiate();
        } else {
          console.log("Failed", data.message);
          alert("Transaction Failed");
          setPaymentLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Payment Success
  const PaymentSuccess = async () => {
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/orders/studio/status/success`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          orderid: window.localStorage.getItem("order-id"),
          paymentid: window.localStorage.getItem("payment-id"),
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          console.log("Failed", data.message);
          alert(data.message);
        } else {
          setPaymentLoading(false);
          console.log("Order Details Success ----->", data);
          alert("Payment Successful");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error(error);
        setPaymentLoading(false);
      });
  };

  const PromoCode = () => (
    <div className="promotional-code">
      <p className="subtitle-promo-code">Apply a promotional code</p>
      <div className="input-btn-container">
        <input type="text" className="promotional-code-input" />
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
        id="payment-button"
        onClick={() => {
          NewOrder();
        }}
      >
        <p>Proceed to pay</p>
      </div>
    </div>
  );

  return (
    <div className="payment">
      <div className="payment-image">
        <img
          src="https://i.ibb.co/RycX0TC/wavy-Orange.png"
          alt="wavy-Orange"
          className="wavy-orange-payment"
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
          <PromoCode />
        </div>
        <div className="payment-studioDetails-right-container">
          <div className="payment-studioDetails-info">
            <div className="studioDetails-info-title">
              <h1 className="title">{storeDetails?.studioName}</h1>
            </div>
            <div className="studioDetails-info-address">
              <p className="address">{storeDetails?.studioAddress}</p>
            </div>
          </div>
          <div className="date-time-container">
            <p className="date">
              {moment(storeDetails?.bookingDate).format("MMMM Do YYYY")}
            </p>
            <p className="time">
              {storeDetails?.startTime}
              pm to {storeDetails?.endTime}
              pm
            </p>
          </div>
          <div className="payment-breakdown-container">
            <p className="subtitle">Payment Breakdown</p>
            <div className="cost-container">
              <p className="title">Total</p>
              <p className="title">₹{storeDetails?.totalPrice}</p>
            </div>
          </div>
          <div
            className="payment-btn"
            onClick={() => {
              NewOrder();
              setPaymentLoading(true);
            }}
          >
            {paymentLoading ? (
              <div className="loader-payment">
                <ScaleLoader
                  color={"#fff"}
                  loading={paymentLoading}
                  height={50}
                  width={10}
                  radius={50}
                  margin={5}
                />
              </div>
            ) : (
              <p>Continue to payment</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
