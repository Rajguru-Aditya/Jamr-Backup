import React, { useState } from "react";
import "./styles.css";
import { authentication } from "../../config";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [userExists, setUserExists] = useState(false);

  const phoneNumber = `+91${phone}`;
  console.log(phoneNumber);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const onPressSendOtp = () => {
    if (phone.length === 10) {
      authenticateUserWithPhone(phone);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message.
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error);
        });
    } else {
      alert("Please enter a valid phone number");
    }
  };

  const authenticateUserWithPhone = (userPhone) => {
    fetch(`http://localhost:3000/user/exists?identify=${userPhone}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Success");
          setUserExists(true);
        } else {
          console.log("Failed");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const verifyOtp = (e) => {
    if (otp.length === 6) {
      console.log("Otp", otp);
      // Verify otp
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user + "signed in");
          alert("User signed in successfully");
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };

  console.log("NUMBER", phone);

  return (
    <div className="login">
      <div className="login-nav">
        <div className="login-nav-item">
          <p>Login</p>
        </div>
        <div className="login-nav-item">
          <p>Register</p>
        </div>
      </div>
      <div className="login-container">
        <div className="login-left">
          <img
            src="https://i.ibb.co/sHHJ1h1/Login-BGHigher-Res.png"
            alt="Login-BGHigher-Res"
            className="login-left-img"
          />
        </div>
        <div className="login-right">
          <div className="login-form">
            <h1 className="login-title">Hey user,</h1>
            <p className="login-text">
              Please enter your Mobile number to Login/Signup
            </p>
            <div className="inputs">
              <div className="mobile-number">
                <div className="country-code">
                  <img
                    src="https://img.icons8.com/color/96/000000/india.png"
                    alt="flag"
                    className="flag"
                  />
                  <h1>+91</h1>
                </div>
                <input
                  className="mobile-number-input"
                  type="text"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength="10"
                />
                <button onClick={onPressSendOtp} className="send-otp-btn">
                  Send OTP
                </button>
              </div>
              <div className="mobile-otp">
                <div className="country-code">
                  <h1>OTP</h1>
                </div>
                <input
                  className="mobile-otp-input"
                  type="text"
                  placeholder="Mobile Number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                />
              </div>
            </div>
            <div className="login-actions">
              <div className="text-container">
                <p className="login-with">Login with</p>
                <p className="username-pass">Username and password</p>
              </div>
              <button className="login-page-btn" onClick={verifyOtp}>
                Login
              </button>
            </div>
          </div>
          <div id="recaptcha-container"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
