import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserDetailsContext from "../../UserDetailsContext";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { ids } = useContext(UserDetailsContext);

  // useEffect(() => {
  //   if(window.localStorage.getItem("userId") === null || window.localStorage.getItem("userId") === undefined || window.localStorage.getItem("userId") === ""){
  //       window.localStorage.setItem("userId", ids.userId);
  //   } else {
  //     if( ids.userId !== "" && window.localStorage.getItem("userId") !== ids.userId){
  //       window.localStorage.setItem("userId", ids.userId);
  //     }
  //   }
  // }, []);

  console.log(ids.userId);

  const menuClicked = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
  }, []);

  const onClickLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="navbar">
      <img
        src="https://i.ibb.co/TP8VqHk/Whats-App-Image-2022-02-01-at-21-17-1.png"
        alt="jamr-logo"
        className="jamr-logo"
        onClick={() => {
          navigate("/");
        }}
      />
      {(toggleMenu || screenWidth > 900) && (
        <div className="navbar-items">
          <div className="location">
            <img
              src="https://img.icons8.com/ios-filled/100/FF782C/marker.png"
              alt="location-marker"
              className="location-marker"
            />
            <h2 className="location-text"> Mumbai </h2>
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/sort-down.png"
              alt="dropdown-arrow"
              className="dropdown-arrow"
            />
          </div>
          <div className="bookSlots">
            <p className="bookSlots-text"> Book Slots </p>
          </div>
          <div className="faq">
            <p className="faq-text"> FAQs </p>
          </div>
          {(ids.userId ? ids.userId : window.localStorage.getItem("userId")) ? (
            <div
              className="nav-bookings"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <p className="nav-bookings-text"> Bookings </p>
            </div>
          ) : (
            <div className="login-btn" onClick={onClickLogin}>
              <p className="login-btn-text"> Login / Register </p>
            </div>
          )}
          {(ids.userId ? ids.userId : window.localStorage.getItem("userId")) ? (
            <div
              className="profileIcon"
              onClick={() => {
                navigate("/dashboard");
              }}
            ></div>
          ) : null}
        </div>
      )}
      <img
        src="https://img.icons8.com/ios-glyphs/100/ff782c/menu--v1.png"
        alt="menu"
        className="menu"
        onClick={menuClicked}
      />
    </div>
  );
}

export default Navbar;
