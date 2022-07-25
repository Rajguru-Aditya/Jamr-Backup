import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./homeStyles.css";
import UserDetailsContext from "../../Context/UserDetailsContext";
import ScaleLoader from "react-spinners/ScaleLoader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [studiosJampads, setStudiosJampads] = useState([]);
  const [studios, setStudios] = useState([]);
  const [jampads, setJampads] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ids, setIds } = useContext(UserDetailsContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const color = "#FF782C";
  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    document.title = "Jamr | Home";
    fetchStudios();
  }, []);

  useEffect(() => {
    console.log("==GET STUDIOS DATA==", studios);
    console.log("==GET JAMPADS DATA==", jampads);
  }, [jampads, studios]);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
  }, []);

  useEffect(() => {
    let studioList = studiosJampads.filter((studio) => studio.studioprice > 0);
    let jampadList = studiosJampads.filter(
      (jampad) => jampad.jampadApplicable === true
    );
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
  }, []);

  const fetchStudios = async () => {
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/studio`,
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
        if (data) {
          console.log("studiosData ----->", data);
          setStudiosJampads(data);
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
      // <Link className={"studio-link-home"} to="/studio-details" state={id}>
      <div
        className={
          screenWidth > 600 ? "studio-container" : "studio-container-mobile"
        }
        onClick={() => {
          setIds({
            studioId: id,
          });
          navigate("/studio-details");
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
      // </Link>
    );
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
            <Carousel
              containerClass="studios-main-container"
              responsive={responsive}
            >
              {studios.slice(0, 3).map((studio, index) => (
                <StudioContainer
                  id={studio.id}
                  // image={studio.studio.imageLocationLinks[0]}
                  name={studio.name}
                  key={index}
                />
              ))}
            </Carousel>
          </div>
          {/* JAMPADS */}
          <div className="studios">
            <div className="studio-title-main-container">
              <div className="studios-title-container">
                <div className="title-container">
                  <h1 id="title">Jampads</h1>
                </div>
                <div>
                  <Link className="service-link" to="/studio-listing">
                    <h1 className="sideText">View More</h1>
                  </Link>
                </div>
              </div>
            </div>
            <Carousel
              containerClass="studios-main-container"
              responsive={responsive}
            >
              {jampads.slice(0, 3).map((jampad, index) => (
                <StudioContainer
                  id={jampad.id}
                  // image={jampad.studio.imageLocationLinks[0]}
                  name={jampad.name}
                  key={index}
                />
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
