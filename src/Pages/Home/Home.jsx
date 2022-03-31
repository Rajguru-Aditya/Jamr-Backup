import React, { useEffect, useState } from "react";
import "./homeStyles.css";

function Home(props) {
  const [studios, setStudios] = useState([]);
  const [studiosList, setStudiosList] = useState([]);
  const [studioNames, setStudiosNames] = useState([]);
  const [studioId, setStudioId] = useState(null);

  useEffect(() => {
    fetchStudioList();
    fetchStudios();
  }, []);

  useEffect(() => {
    console.log("==GET DATA==", studios);
    console.log("==GET DATA List==", studiosList);
  }, [studios, studiosList]);

  const fetchStudios = async () => {
    await fetch(`http://localhost:3000/studio/details?type=S&id=0}`, {
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
          setStudios(data.data);
          console.log("studiosData ----->", data.data);
          // studios.map((studio, index) => {
          //   console.log("====================================");
          //   console.log("studio ----->", studio.studioName);
          //   console.log("====================================");
          // });
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchStudioList = async () => {
    await fetch(`http://localhost:3000/studio/details?type=L&id=0}`, {
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
          setStudiosList(data.data);
          console.log("studiosData ----->", studiosList);
          studiosList.map((studio, index) => {
            setStudiosNames(studio.studioName);
            // console.log("=================NAME===================", studio);
          });
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onClickMusicStudio = async (id) => {
    // fetchStudios();
    setStudioId(id);
    console.log("id", id);
  };

  const onClickStudioList = async () => {
    // fetchStudioList();
    console.log("------->studio list", studiosList);
  };

  // console.log("====================================");
  // console.log("studioNames ----->", studioNames);
  // console.log("====================================");

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
        <div onClick={onClickStudioList} className="service-container">
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
              src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/500/000000/external-guitar-stay-home-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
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
      {/* MUSIC STUDIOS */}
      <div className="studios">
        <h1 className="title">Music Studios</h1>
        <div className="studios-main-container">
          <div className="studio-container" onClick={onClickMusicStudio}>
            <div className="studio-upperContainer">
              <img
                className="studio-img"
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Studio-1"
              />
            </div>
            <div className="studio-lowerContainer">
              <p className="studio-name">Studio 1</p>
              <p className="studio-rating">⭐⭐⭐⭐</p>
            </div>
          </div>
          <div className="studio-container" onClick={onClickMusicStudio}>
            <div className="studio-upperContainer">
              <img
                className="studio-img"
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Studio-1"
              />
            </div>
            <div className="studio-lowerContainer">
              <p className="studio-name">Studio 1</p>
              <p className="studio-rating">⭐⭐⭐⭐</p>
            </div>
          </div>
          <div className="studio-container" onClick={onClickMusicStudio}>
            <div className="studio-upperContainer">
              <img
                className="studio-img"
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Studio-1"
              />
            </div>
            <div className="studio-lowerContainer">
              <p className="studio-name">Studio 1</p>
              <p className="studio-rating">⭐⭐⭐⭐</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
