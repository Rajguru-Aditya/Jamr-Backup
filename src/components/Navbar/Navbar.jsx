import React, { useEffect, useState, useContext } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { MenuItem, Menu } from "@mui/material/";
import UserDetailsContext from "../../Context/UserDetailsContext";
import NavigationContext from "../../Context/NavigationContext";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { ids } = useContext(UserDetailsContext);
  const { setOpenComponent } = useContext(NavigationContext);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const ITEM_HEIGHT = 42;
  const openCities = Boolean(anchorEl);
  const handleClickCities = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  useEffect(() => {
    GetCities();
  }, []);

  const GetCities = async () => {
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/studio/cities/unique`,
      {
        //Testing
        // await fetch(`http://localhost:3000/studio/details/?type=D&id=${studioId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("CITY LIST ->", data);
          setCities(data);
        } else {
          console.log("Something went wrong", data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            <h2 className="location-text">
              {" "}
              {selectedCity === "" ? "Mumbai" : selectedCity}{" "}
            </h2>
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/sort-down.png"
              alt="dropdown-arrow"
              className="dropdown-arrow"
              onClick={handleClickCities}
            />
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={openCities}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {cities.map((city) => (
                <MenuItem
                  onClick={() => {
                    setSelectedCity(city);
                    handleClose();
                  }}
                  key={city}
                >
                  {city}
                </MenuItem>
              ))}
            </Menu>
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
