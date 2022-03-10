import React from "react";
import "./homeStyles.css";

function Home() {
  return (
    <div className="home">
      {/* Banner Image */}
      <div className="banner">
        <img
          src="https://i.ibb.co/DbzFf5y/Orange-Rectangle.png"
          alt="Orange-Rectangle"
          className="banner-bg"
        />
        <img
          src="https://i.ibb.co/sHHJ1h1/Login-BGHigher-Res.png"
          alt="Login-BGHigher-Res"
          className="banner-img"
        ></img>
      </div>

      {/* Services */}
      <div className="services">
        <div className="service-container">
          <div className="service-upperContainer">
            <img
              src="https://img.icons8.com/external-konkapp-flat-konkapp/500/000000/external-headphone-electronic-devices-konkapp-flat-konkapp.png"
              alt="headphone"
              className="service-icon"
            />
          </div>
          <div className="service-lowerContainer">
            <p>Music Studios</p>
          </div>
        </div>
        <div className="service-container">
          <div className="service-upperContainer">
            <img
              src="https://img.icons8.com/color/500/000000/guitar.png"
              alt="guitar"
              className="service-icon"
            />
          </div>
          <div className="service-lowerContainer">
            <p>Jam Pads</p>
          </div>
        </div>
        <div className="service-container">
          <div className="service-upperContainer">
            <img
              src="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/500/000000/external-mixer-radio-vitaliy-gorbachev-flat-vitaly-gorbachev.png"
              alt="mixer"
              className="service-icon"
            />
          </div>
          <div className="service-lowerContainer">
            <p>Mixing & Mastering</p>
          </div>
        </div>
        <div className="service-container">
          <div className="service-upperContainer">
            <img
              src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/500/000000/external-video-advertising-xnimrodx-lineal-color-xnimrodx-6.png"
              alt="video"
              className="service-icon"
            />
          </div>
          <div className="service-lowerContainer">
            <p>Videos</p>
          </div>
        </div>
        <div className="service-container">
          <div className="service-upperContainer">
            <img
              src="https://img.icons8.com/color/500/000000/teaching.png"
              alt="teaching"
              className="service-icon"
            />
          </div>
          <div className="service-lowerContainer">
            <p>Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
