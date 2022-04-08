import React, { useEffect, useState } from "react";
import "./styles.css";
import ScaleLoader from "react-spinners/ScaleLoader";

function UserDashboard() {
  const [navItemName, setNavItemName] = useState("Bookings");
  const [referralCode, setReferralCode] = useState("");
  const [getReferralData, setReferralData] = useState("");
  const [loading, setLoading] = useState(true);
  const color = "#FF782C";

  const onClickNavItem = (name) => {
    setNavItemName(name);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchReferralCode();
  }, []);

  useEffect(() => {
    setReferralCode(getReferralData[0]?.ReferralCode);
  }, [getReferralData]);

  const fetchReferralCode = async () => {
    await fetch(`http://localhost:3000/referral/2`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.isError) {
          setReferralData(data.data);
          console.log("REFERRALCODE ----->", data.data);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const BookingsContent = () => (
    <div className="content-bookings">
      <div className="content-left">
        {/* Bookings */}
        <div className="bookings">
          <div className="bookings-header">
            <h1 className="bookings-header-title">JAMR Studio Name</h1>
            <h1 className="bookings-header-title">$0</h1>
          </div>
          <div className="bookings-body">
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Order Number:</h1>
              <h1 className="bookings-body-item-value">#73645976245</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Date:</h1>
              <h1 className="bookings-body-item-value">March 30, 2022</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Time:</h1>
              <h1 className="bookings-body-item-value">12pm</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Duration:</h1>
              <h1 className="bookings-body-item-value">3 hours</h1>
            </div>
          </div>
        </div>
        {/* Bookings */}
        <div className="bookings">
          <div className="bookings-header">
            <h1 className="bookings-header-title">JAMR Studio Name</h1>
            <h1 className="bookings-header-title">$0</h1>
          </div>
          <div className="bookings-body">
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Order Number:</h1>
              <h1 className="bookings-body-item-value">#73645976245</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Date:</h1>
              <h1 className="bookings-body-item-value">March 30, 2022</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Time:</h1>
              <h1 className="bookings-body-item-value">12pm</h1>
            </div>
            <div className="bookings-body-item">
              <h1 className="bookings-body-item-name">Duration:</h1>
              <h1 className="bookings-body-item-value">3 hours</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="content-right-first">
          <h1 className="bookings-title">Upcoming Orders</h1>
          <p className="bookings-subtitle">0</p>
        </div>
        <div className="content-right-last">
          <h1 className="bookings-title">Completed Orders</h1>
          <p className="bookings-subtitle">0</p>
        </div>
      </div>
    </div>
  );

  const PromotionsContent = (name) => (
    <div className="content-promotions">
      <div className="promotion-content-container">
        <div className="promotion-left">
          <h1 className="promotion-title">Refer and get FREE services</h1>
          <div className="referral-code-container">
            <p className="referral-code-text">Your Code: </p>
            <p className="referral-code">{referralCode ? referralCode : ""}</p>
          </div>
          <p className="promotion-text">
            Invite your friends to Jamr. They get instant ₹100 off. You win upto
            ₹5000 in rewards.
          </p>
          <div className="promotion-refer-via">
            <div className="promotion-refer-via-item"></div>
            <p className="refer">Refer Via</p>
            <div className="promotion-refer-via-item"></div>
          </div>
          <div className="promotion-refer-platforms">
            <div className="promotion-refer-platforms-item"></div>
            <div className="promotion-refer-platforms-item"></div>
            <div className="promotion-refer-platforms-item"></div>
          </div>
        </div>
        <div className="promotion-right">
          <img
            className="promotion-img"
            src="https://i.ibb.co/9cj4bTR/Screenshot-346-1.png"
            alt="promotion"
          />
        </div>
      </div>
      <div className="promotion-bottom">
        <div className="promotion-bottom-title">
          <h1 className="promotion-title">
            Refer everyone- the most generous referral program
          </h1>
        </div>
        <div className="promotion-data">
          <div className="promotion-data-item">
            <img
              className="promotion-data-icon"
              src="https://i.ibb.co/QJ0NXCq/Frame.png"
              alt="Frame"
              border="0"
            />
            <p className="promotion-data-text">
              Invite all friends even if they have tried us. You will get
              rewarded everytime.
            </p>
          </div>
          <div className="promotion-data-item">
            <img
              className="promotion-data-icon"
              src="https://i.ibb.co/6wPsc4S/Group-45.png"
              alt="Group-45"
              border="0"
            ></img>
            <p className="promotion-data-text">
              Upon inviting, we’ll give them rewards for the services they
              havent tried yet.
            </p>
          </div>
          <div className="promotion-data-item">
            <img
              className="promotion-data-icon"
              src="https://i.ibb.co/W2w3P0d/Vector.png"
              alt="Vector"
              border="0"
            />
            <p className="promotion-data-text">
              For every successful signup, you can win upto ₹5000, and minimum
              ₹100
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectsContent = (name) => (
    <div className="content">
      <h1>Projects</h1>
    </div>
  );

  const ProfileContent = (name) => (
    <div className="content">
      <h1>Profile</h1>
    </div>
  );

  const DisplayContent = () => {
    switch (navItemName) {
      case "Bookings":
        return <BookingsContent />;
      case "Promotions":
        return <PromotionsContent />;
      case "Projects":
        return <ProjectsContent />;
      case "Profile":
        return <ProfileContent />;
      default:
        return <BookingsContent />;
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loader">
          <ScaleLoader
            color={color}
            loading={loading}
            height={100}
            width={20}
            radius={100}
            margin={10}
          />
        </div>
      ) : (
        <div className="user-dashboard">
          <div className="banner-image">
            <img
              src="https://i.ibb.co/RycX0TC/wavy-Orange.png"
              alt="wavy-Orange"
              className="wavy-orange"
            ></img>
          </div>
          <div className="user-dashboard-navbar">
            <div
              onClick={() => {
                onClickNavItem("Bookings");
              }}
              className="navbar-item-container"
            >
              <div
                className={
                  navItemName === "Bookings"
                    ? "navbar-item-selected"
                    : "navbar-item"
                }
              >
                <p className="navbar-text">Bookings</p>
              </div>
            </div>
            <div
              onClick={() => {
                onClickNavItem("Promotions");
              }}
              className="navbar-item-container"
            >
              <div
                className={
                  navItemName === "Promotions"
                    ? "navbar-item-selected"
                    : "navbar-item"
                }
              >
                <p className="navbar-text">Promotions</p>
              </div>
            </div>
            <div
              onClick={() => {
                onClickNavItem("Projects");
              }}
              className="navbar-item-container"
            >
              <div
                className={
                  navItemName === "Projects"
                    ? "navbar-item-selected"
                    : "navbar-item"
                }
              >
                <p className="navbar-text">Projects</p>
              </div>
            </div>
            <div
              onClick={() => {
                onClickNavItem("Profile");
              }}
              className="navbar-item-container"
            >
              <div
                className={
                  navItemName === "Profile"
                    ? "navbar-item-selected"
                    : "navbar-item"
                }
              >
                <p className="navbar-text">Profile</p>
              </div>
            </div>
          </div>
          {DisplayContent()}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
