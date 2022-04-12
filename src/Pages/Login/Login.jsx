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
  const [navItem, setNavItem] = useState("login");

  // STATES FOR REGISTRASTION
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    username: "",
  });

  const phoneNumber = `+91${phone}`;
  console.log(phoneNumber);

  const navHandler = (nav) => {
    if (nav === "register") {
      setNavItem("register");
    }
    if (nav === "login") {
      setNavItem("login");
    }
  };

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

  const onPressSendOtp = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      authenticateUserWithPhone(phone);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(
        authentication,
        phoneNumber,
        window.recaptchaVerifier
      )
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
          setUserExists(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const verifyOtp = (e) => {
    e.preventDefault();
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
          if (userExists) {
            // User exists
            // Redirect to home page
            window.location.href = "/";
          } else {
            // User does not exist
            // Redirect to signup page
            alert("User does not exist");
          }
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };

  const onClickRegister = (e) => {
    e.preventDefault();
    if (
      userDetails.name &&
      userDetails.email &&
      userDetails.password &&
      userDetails.confirmPassword &&
      userDetails.phone &&
      userDetails.username
    ) {
      if (userDetails.password === userDetails.confirmPassword) {
        // Register user
        console.log("====================================");
        console.log("User details", userDetails);
        console.log("====================================");
        registerUser();
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  const registerUser = () => {
    fetch("http://localhost:3000/user/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: userDetails.name,
        username: userDetails.username,
        password: userDetails.password,
        mobile: userDetails.phone,
        email: userDetails.email,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(
        //   "POST Response",
        //   "Response Body -> " + JSON.stringify(responseData.data)
        // );
        // setUserId(responseData.data.userId);
        if (!responseData.isError) {
          // props.navigation.navigate("Home");
          alert("Registration Successful");
          window.location.href = "/";
        } else {
          alert("Something went wrong", responseData.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginForm = () => (
    <div className="login-container">
      <div className="login-left">
        <img
          src="https://i.ibb.co/sHHJ1h1/Login-BGHigher-Res.png"
          alt="Login-BGHigher-Res"
          className="login-left-img"
        />
      </div>
      <div className="login-right">
        <form className="login-form">
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
        </form>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );

  const registrationForm = () => (
    <div className="login-container">
      <div className="login-left">
        <img
          src="https://i.ibb.co/6DPp9sg/verification-BG.png"
          alt="registration-illustration"
          className="login-left-img"
        />
      </div>
      <div className="login-right">
        <form className="login-form">
          <h1 className="login-title">Hey user,</h1>
          <p className="login-text">
            Please enter your Mobile number to Login/Signup
          </p>
          <div className="inputs">
            <div className="text-input-container">
              <input
                className="text-input"
                type="text"
                placeholder="Full Name"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
              />
            </div>
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
                value={userDetails.phone}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
                maxLength="10"
              />
            </div>
            <div className="text-input-container">
              <input
                className="text-input"
                type="text"
                placeholder="Create Username"
                value={userDetails.username}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
              />
            </div>
            <div className="text-input-container">
              <input
                className="text-input"
                type="password"
                placeholder="Password"
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
              />
            </div>
            <div className="text-input-container">
              <input
                className="text-input"
                type="password"
                placeholder="Confirm Password"
                value={userDetails.confirmPassword}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="text-input-container">
              <input
                className="text-input"
                type="text"
                placeholder="Email Address"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="login-actions">
            <button className="login-page-btn" onClick={onClickRegister}>
              Register
            </button>
          </div>
        </form>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );

  console.log("NUMBER", phone);

  return (
    <div className="login">
      <div className="login-nav">
        <div
          onClick={() => {
            navHandler("login");
          }}
          className={
            navItem === "login" ? "login-nav-item-selected" : "login-nav-item"
          }
        >
          <p className="login-nav-text">Login</p>
        </div>
        <div
          onClick={() => {
            navHandler("register");
          }}
          className={
            navItem === "register"
              ? "login-nav-item-selected"
              : "login-nav-item"
          }
        >
          <p className="login-nav-text">Register</p>
        </div>
      </div>
      {navItem === "login" ? loginForm() : registrationForm()}
    </div>
  );
}

export default Login;
