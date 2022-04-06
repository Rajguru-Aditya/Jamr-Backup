import React from "react";
import "./styles.css";

function Login() {
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
                />
              </div>
              <div className="mobile-otp">
                <div className="country-code">
                  <h1>OTP</h1>
                </div>
                <input
                  className="mobile-otp-input"
                  type="text"
                  placeholder="Mobile Number"
                />
              </div>
            </div>
            <div className="login-actions">
              <div className="text-container">
                <p className="login-with">Login with</p>
                <p className="username-pass">Username and password</p>
              </div>
              <button className="login-page-btn">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
