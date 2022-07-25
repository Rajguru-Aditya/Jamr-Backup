import React, { useEffect, useState } from "react";
import "./styles.css";
import { authentication } from "../../config";
import { useNavigate } from "react-router-dom";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";
import { useContext } from "react";
import UserDetailsContext from "../../Context/UserDetailsContext";

function Login() {
  let navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [navItem, setNavItem] = useState("login");
  const [uid, setUid] = useState("");
  const { ids, setIds } = useContext(UserDetailsContext);
  const [token, setToken] = useState();
  // STATES FOR REGISTRASTION
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    username: "",
  });

  useEffect(() => {
    if (
      window.localStorage.getItem("userId") === null ||
      window.localStorage.getItem("userId") === undefined ||
      window.localStorage.getItem("userId") === ""
    ) {
      window.localStorage.setItem("userId", ids.userId);
    } else {
      if (
        ids.userId !== "" &&
        window.localStorage.getItem("userId") !== ids.userId
      ) {
        window.localStorage.setItem("userId", ids.userId);
      }
    }
  }, []);

  useEffect(() => {
    document.title = "Jamr | Login";
  }, []);

  const phoneNumber = `+91${phone}`;
  // console.log(phoneNumber);

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
      generateRecaptcha();
      // let appVerifier = window.recaptchaVerifier;
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

  const authenticateUserWithPhone = (idToken) => {
    fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/auth/login/phone`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          token: idToken,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code) {
          console.log("Failed");
          alert("No User found, Please Register first");
          setUserExists(false);
        } else {
          console.log("Success", data);
          setUid(data.id);
          setIds({
            userId: data.id,
          });
          setUserExists(true);
          alert("Welcome back", data.name);
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
          console.log("User", user);
          let jwtToken = onAuthStateChanged(function (user) {
            console.log("Firebase User", user);
            if (user) {
              user.getIdToken().then(function (idToken) {
                // <------ Check this line
                alert(idToken); // It shows the Firebase token now
                return idToken;
              });
            }
          });
          console.log("JWT", jwtToken);
          // console.log(user + "signed in");
          console.log("Result", result);
          console.log("Result TOKEN", result._tokenResponse.idToken);
          authenticateUserWithPhone(result._tokenResponse.idToken);
          // if (userExists) {
          //   // User exists
          //   // Redirect to home page
          //   alert("User signed in successfully");
          //   setIds({
          //     userId: uid,
          //   });
          //   navigate("/");
          // } else {
          //   // User does not exist
          //   // Redirect to signup page
          //   alert("No user found. Please register first");
          // }
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert("ERROR Occurred", error);
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
      } else {
        alert("Password and confirm password do not match");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  const onClickLogout = () => {
    window.localStorage.removeItem("userId");
    navigate("/");
  };

  const registerUser = () => {
    fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/user/`,
      {
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
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Body -> ", JSON.parse(JSON.stringify(data)));
        // setdata(data.data.UserId);
        if (!data.isError) {
          // props.navigation.navigate("Home");
          alert("Registration Successful");
          setIds({
            userId: data.id,
          });
          window.localStorage.setItem("userId", data.id);
          console.log("USER ID", data);
          navigate("/");
        } else {
          alert("Something went wrong", data.message);
          console.log("Something went wrong", data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginwithusername = () => {
    fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/auth/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userDetails.username,
          password: userDetails.password,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Body -> ", JSON.parse(JSON.stringify(data)));
        // setdata(data.data.UserId);
        if (!data.message) {
          // props.navigation.navigate("Home");
          console.log(data);
          alert("Login Successful");
          setIds({
            userId: data.id,
          });
          window.localStorage.setItem("userId", data.id);
          console.log("USER ID", data);
          navigate("/");
        } else {
          alert("Something went wrong", data.message);
          console.log("Something went wrong", data);
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
              <div className="country-code-and-input">
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
              </div>
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
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
              />
            </div>
          </div>
          <div className="login-actions">
            <div
              className="text-container"
              onClick={() => setNavItem("username")}
            >
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
            Please enter your details to Login/Signup
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
            <div className="register-mobile-number">
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
            <div className="text-input-container">
              <input
                className="text-input"
                type="text"
                placeholder="Referral Code"
                // value={userDetails.email}
                // onChange={(e) =>
                //   setUserDetails({ ...userDetails, email: e.target.value })
                // }
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

  const userpassLogin = () => (
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
            Please enter your details to Login/Signup
          </p>
          <div className="inputs">
            <div className="text-input-container">
              <input
                className="text-input"
                type="text"
                placeholder="Username"
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
          </div>
          <div className="login-actions">
            <button className="login-page-btn" onClick={loginwithusername}>
              Login
            </button>
          </div>
        </form>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );

  // console.log("NUMBER", phone);

  return (
    <>
      {window.localStorage.getItem("userId") ? (
        <div className="logout-container">
          <h1>You are already logged in</h1>
          <h3>Would you like to Logout?</h3>
          <button className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="login">
          <div className="login-nav">
            <div
              onClick={() => {
                navHandler("login");
              }}
              className={
                navItem === "login"
                  ? "login-nav-item-selected"
                  : "login-nav-item"
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
          {navItem === "login"
            ? loginForm()
            : navItem === "register"
            ? registrationForm()
            : navItem === "username"
            ? userpassLogin()
            : null}
        </div>
      )}
    </>
  );
}

export default Login;
