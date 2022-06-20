import React, { useEffect, useState, useContext } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import UserDetailsContext from "../../UserDetailsContext";
import NavigationContext from "../../NavigationContext";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { ids } = useContext(UserDetailsContext);
  const { setOpenComponent } = useContext(NavigationContext);

  // useEffect(() => {
  //   if (
  //     window.localStorage.getItem("userId") === null ||
  //     window.localStorage.getItem("userId") === undefined ||
  //     window.localStorage.getItem("userId") === ""
  //   ) {
  //     window.localStorage.setItem("userId", ids.userId);
  //   } else {
  //     if (
  //       ids.userId !== "" &&
  //       window.localStorage.getItem("userId") !== ids.userId
  //     ) {
  //       window.localStorage.setItem("userId", ids.userId);
  //     } else {
  //       if (
  //         window.localStorage.getItem("userId") === undefined &&
  //         ids.userId === ""
  //       ) {
  //         setIdExists(false);
  //       } else {
  //         setIdExists(true);
  //       }
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
          <div className="faq">
            <p className="faq-text"> FAQs </p>
          </div>
          {(
            ids.userId
              ? ids.userId
              : window.localStorage.getItem("userId")
              ? window.localStorage.getItem("userId")
              : false
          ) ? (
            <div
              className="nav-bookings"
              onClick={() => {
                setOpenComponent("Bookings");
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
        </div>
      )}
      {(
        ids.userId
          ? ids.userId
          : window.localStorage.getItem("userId")
          ? window.localStorage.getItem("userId")
          : false
      ) ? (
        <div
          className="profileIcon"
          onClick={() => {
            setOpenComponent("Profile");
            navigate("/dashboard");
          }}
        ></div>
      ) : null}
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
