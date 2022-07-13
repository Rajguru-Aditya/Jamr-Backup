import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./homeStyles.css";
import UserDetailsContext from "../../UserDetailsContext";
import ScaleLoader from "react-spinners/ScaleLoader";
import Slider from "react-slick";

function Home(props) {
  const [studiosJampads, setStudiosJampads] = useState([]);
  const [studios, setStudios] = useState([]);
  const [jampads, setJampads] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ids, setIds } = useContext(UserDetailsContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const color = "#FF782C";

  useEffect(() => {
    document.title = "Jamr | Home";
    fetchStudios();
  }, []);

  useEffect(() => {
    console.log("==GET DATA==", studios);
  }, [studios]);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
  }, []);

  useEffect(() => {
    let studioList = studiosJampads.filter((studio) => studio.studio.isStudio);
    let jampadList = studiosJampads.filter((jampad) => jampad.studio.isJampad);
    setStudios(studioList);
    setJampads(jampadList);
  }, [studiosJampads]);

  useEffect(() => {
    if (
      (window.localStorage.getItem("userId") === null ||
        window.localStorage.getItem("userId") === undefined ||
        window.localStorage.getItem("userId") === "") &&
      ids.userId !== null
    ) {
      window.localStorage.setItem("userId", ids.userId);
    }
    // else {
    //   if (
    //     ids.userId !== "" &&
    //     window.localStorage.getItem("userId") !== ids.userId
    //   ) {
    //     window.localStorage.setItem("userId", ids.userId);
    //   }
    // }
  }, []);

  const fetchStudios = async () => {
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/studio/details?type=L&id=0}`,
      {
        //TESTING
        // await fetch(`http://localhost:3000/studio/details/?type=L`, {
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
        if (!data.isError) {
          console.log("studiosData ----->", data.data);
          setStudiosJampads(data.data);
          // studios.map((studio, index) => {
          //   console.log("====================================");
          //   console.log("studio ----->", studio.studioName);
          //   console.log("====================================");
          // });
          setLoading(false);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const StudioContainer = (studio) => {
    const id = studio.id;
    return (
      <Link className={"studio-link-home"} to="/studio-details" state={id}>
        <div
          className={
            screenWidth > 600 ? "studio-container" : "studio-container-mobile"
          }
          onClick={() => {
            setIds({
              studioId: id,
            });
            console.log(id);
          }}
          // key={studio.key}
        >
          <div
            className={
              screenWidth > 600
                ? "studio-upperContainer"
                : "studio-upperContainer-mobile"
            }
          >
            <img
              className={screenWidth > 600 ? "studio-img" : "studio-img-mobile"}
              src={studio.image}
              alt="Studio-1"
            />
          </div>
          <div
            className={
              screenWidth > 600
                ? "studio-lowerContainer"
                : "studio-lowerContainer-mobile"
            }
          >
            <p className="studio-name">{studio.name}</p>
            <p className="studio-rating">⭐⭐⭐⭐</p>
          </div>
        </div>
      </Link>
    );
  };

  const SliderStudioContainer = (studio) => {
    const id = studio.id;
    return (
      <Link className={"studio-link-home"} to="/studio-details" state={id}>
        <div
          className={"studio-container-mobile"}
          onClick={() => {
            setIds({
              studioId: id,
            });
            console.log(id);
          }}
          // key={studio.key}
        >
          <div className={"studio-upperContainer-mobile"}>
            <img
              className={"studio-img-mobile"}
              src={studio.image}
              alt="Studio-1"
            />
          </div>
          <div className={"studio-lowerContainer-mobile"}>
            <p className="studio-name">{studio.name}</p>
            <p className="studio-rating">⭐⭐⭐⭐</p>
          </div>
        </div>
      </Link>
    );
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          height: "30px",
          width: "30px",
          display: "flex",
          background: "black",
          borderRadius: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          height: "30px",
          width: "30px",
          display: "flex",
          background: "black",
          borderRadius: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      />
    );
  }

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
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
        <div className="home">
          <img
            src="https://i.ibb.co/RycX0TC/wavy-Orange.png"
            alt="wavy-Orange"
            className="wavy-orange-vector"
          ></img>
          {/* Banner Image */}
          <div className="banner">
            <img
              src="https://i.ibb.co/yVnjNLr/Rectangle-Orange.png"
              alt="Rectangle-Orange"
              className="banner-bg"
            />
          </div>

          {/* Services */}
          <div className="services">
            <Link className="service-link" to="/studio-listing">
              <div className="service-container">
                <div className="service-upperContainer">
                  {/* <img
                      src="https://img.icons8.com/external-konkapp-flat-konkapp/500/000000/external-headphone-electronic-devices-konkapp-flat-konkapp.png"
                      alt="headphone"
                      className="service-icon"
                    /> */}
                  <img
                    src="https://i.ibb.co/h16KyH9/vector1.png"
                    className="service-icon"
                    alt="vector1"
                  />
                </div>
                <div className="service-lowerContainer">
                  <p>Music Studios</p>
                </div>
              </div>
            </Link>
            <Link className="service-link" to="/jampad-listing">
              <div className="service-container">
                <div className="service-upperContainer">
                  {/* <img
                      src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/500/000000/external-guitar-stay-home-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
                      alt="guitar"
                      className="service-icon"
                    /> */}
                  <img
                    src="https://i.ibb.co/b67hL01/vector2.png"
                    alt="vector2"
                    className="service-icon"
                  />
                </div>
                <div className="service-lowerContainer">
                  <p>JamPads</p>
                </div>
              </div>
            </Link>
            <Link className="service-link" to="/studio-listing">
              <div className="service-container">
                <div className="service-upperContainer">
                  {/* <img
                      src="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/500/000000/external-mixer-radio-vitaliy-gorbachev-flat-vitaly-gorbachev.png"
                      alt="mixer"
                      className="service-icon"
                    /> */}
                  <img
                    src="https://i.ibb.co/dBbyZH2/vector3.png"
                    alt="vector3"
                    className="service-icon"
                  />
                </div>
                <div className="service-lowerContainer">
                  <p>Mixing & Mastering</p>
                </div>
              </div>
            </Link>
          </div>
          {/* MUSIC STUDIOS */}
          <div className="studios">
            <div className="studio-title-main-container">
              <div className="studios-title-container">
                <div className="title-container">
                  <h1 id="title">Music Studios</h1>
                </div>
                <div className="ideText-container">
                  <Link className="service-link" to="/studio-listing">
                    <h1 className="sideText">View More</h1>
                  </Link>
                </div>
              </div>
            </div>
            {screenWidth > 600 ? (
              <div className="studios-main-container">
                {studios.slice(0, 3).map((studio, index) => (
                  <StudioContainer
                    id={studio.studio.locationId}
                    image={studio.studio.imageLocationLinks[0]}
                    name={studio.studio.studioName}
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <Slider {...sliderSettings} className="slider-main-container">
                {studios.slice(0, 3).map((studio, index) => (
                  <SliderStudioContainer
                    id={studio.studio.locationId}
                    image={studio.studio.imageLocationLinks[0]}
                    name={studio.studio.studioName}
                    key={index}
                  />
                ))}
              </Slider>
              // </div>
            )}
          </div>
          {/* JAMPADS */}
          <div className="studios">
            <div className="studio-title-main-container">
              <div className="studios-title-container">
                <div className="title-container">
                  <h1 id="title">Jampads</h1>
                  {/* <h1 className="subtitle">Top Picks 🔥</h1> */}
                </div>
                <div>
                  <Link className="service-link" to="/studio-listing">
                    <h1 className="sideText">View More</h1>
                  </Link>
                </div>
              </div>
            </div>
            {screenWidth > 600 ? (
              <div className="studios-main-container">
                {jampads.slice(0, 3).map((jampad, index) => (
                  <SliderStudioContainer
                    id={jampad.studio.locationId}
                    image={jampad.studio.imageLocationLinks[0]}
                    name={jampad.studio.studioName}
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <Slider {...sliderSettings} className="slider-main-container">
                {jampads.slice(0, 3).map((jampad, index) => (
                  <SliderStudioContainer
                    id={jampad.studio.locationId}
                    image={jampad.studio.imageLocationLinks[0]}
                    name={jampad.studio.studioName}
                    key={index}
                  />
                ))}
              </Slider>
              // </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
