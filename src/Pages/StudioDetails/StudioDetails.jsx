import React, { useEffect, useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import SlotsData from "../../Data/SlotsData";

function StudioDetails(props) {
  const [studioData, setStudioData] = useState();
  const [equipmentData, setEquipmentData] = useState();
  const equipments = [];
  const [equipmentName, setEquipmentName] = useState();
  const [loading, setLoading] = useState(true);
  const [packageSelected, setPackageSelected] = useState(false);
  const [packageName, setPackageName] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);

  const location = useLocation();
  const studioId = location.state;
  console.log("data", studioId);
  const color = "#FF782C";

  // Horizontal Scroll Menu

  useEffect(() => {
    fetchStudioData();
  }, []);

  useEffect(() => {
    console.log("==GET STUDIO DATA==", studioData);
    console.log("==GET EQUIPMENT DATA==", equipmentName);
    setTimeout(() => {
      getEquipment();
    }, 2000);
  }, [studioData]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = days[date.getDay()];
  const currentDate = date.getDate();
  const today = `${day} ${currentDate} ${month}, ${year}`;
  console.log("today", today);

  const onClickPackage = (title) => {
    setPackageName(title);
    setPackageSelected(!packageSelected);
  };

  const fetchStudioData = async () => {
    await fetch(`http://localhost:3000/studio/details?type=D&id=${studioId}`, {
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
          setStudioData(data.data);
          setEquipmentData(data.data[0].equipment);
          console.log("studioData ----->", data.data);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // console.log("studioData", studioData[0].studio.JAMRStudioName);

  const slotClicked = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((item) => item !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };
  console.log("selectedSlots", selectedSlots);

  const Equipments = (name, desc) => {
    return (
      <div className="equipment">
        <p className="bulletpoint">·</p>
        <p className="equipment-name">{name}</p>
        <p className="equipment-name">{desc}</p>
      </div>
    );
  };

  const getEquipment = () => {
    Object.keys(equipmentData).map((key) => {
      return equipments.push(key);
    });
    setEquipmentName([...equipments]);
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
        <div className="studioDetails">
          <div className="studioDetails-image">
            <img
              src="https://i.ibb.co/RycX0TC/wavy-Orange.png"
              alt="wavy-Orange"
              className="wavy-orange"
            ></img>
            <img
              src="https://i.ibb.co/2FdvSgs/Studio-Details-Img.png"
              alt="Studio-Details-Img"
              className="details-Page-Vector"
            ></img>
          </div>
          <div className="studioDetails-content">
            <div className="studioDetails-left-container">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/30/05/41/music-1290087_960_720.jpg"
                alt="studio"
                className="studio-image"
              />

              <div className="date-time-slots-container">
                <div className="date-time-container">
                  <p className="date">{today}</p>
                  <p className="time">4pm to 7pm (3hrs)</p>
                </div>
                <div className="date-container">
                  <p className="date-title">Date</p>
                  <div className="date-inner-container">
                    <p>{today}</p>
                  </div>
                </div>
                <div className="time-duration-container">
                  <div className="time-container">
                    <p className="time-title">Start Time</p>
                    <div className="time-inner-container">
                      <p>16:00</p>
                    </div>
                  </div>
                  <div className="duration-container">
                    <p className="duration-title">Duration</p>
                    <div className="duration-inner-container">
                      <p>3 hrs</p>
                    </div>
                  </div>
                </div>
                {/* SLOTS */}
                <div className="slots-container">
                  <div className="slots-inner-container">
                    {SlotsData.map((slot, index) => (
                      <div
                        onClick={() => {
                          slotClicked(slot.id);
                        }}
                        className="slot-items"
                        key={index}
                      >
                        <div
                          className={
                            selectedSlots.includes(slot.id)
                              ? "selected-slot-circle"
                              : "slot-circle"
                          }
                        ></div>
                        <p>
                          {slot.start}:00 - {slot.end}:00
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="book-now-btn">
                  <p>Book Now</p>
                </div>
              </div>
            </div>
            <div className="studioDetails-right-container">
              <div className="studioDetails-info">
                <div className="studioDetails-info-title">
                  <h1 className="title">{studioData[0].studio.studioName}</h1>
                </div>
                <div className="studioDetails-info-address">
                  <p className="address">
                    {studioData[0].studio.address},{" "}
                    {studioData[0].studio.locality}, {studioData[0].studio.city}
                  </p>
                </div>
                <div className="studioDetails-rating-cost-container">
                  <div className="studioDetails-rating">
                    <img
                      src="https://img.icons8.com/ios-glyphs/20/ffffff/star--v1.png"
                      alt="star"
                    />
                    <p className="rating">4.5</p>
                  </div>
                  <div className="studioDetails-cost">
                    <p className="cost">
                      ₹{studioData[0].studio.studioPrice}/hr
                    </p>
                  </div>
                </div>
                <p className="services-title">Services</p>
                <div className="studioDetails-services-container">
                  {/* 1 */}
                  <div className="studioDetails-service">
                    <div className="service-img-container"></div>
                    <p className="service-name">Jampad</p>
                  </div>
                  {/* 1 */}
                  <div className="studioDetails-service">
                    <div className="service-img-container"></div>
                    <p className="service-name">Mixing & Mastering</p>
                  </div>
                  {/* 1 */}
                  <div className="studioDetails-service">
                    <div className="service-img-container"></div>
                    <p className="service-name">Recording</p>
                  </div>
                  {/* 1 */}
                  <div className="studioDetails-service">
                    <div className="service-img-container"></div>
                    <p className="service-name">Dubbing</p>
                  </div>
                </div>
                {/* Packages */}
                <p className="equipments-title">Additional Packages</p>
                <div className="additional-packages-container">
                  <div
                    className="additional-packages-item"
                    onClick={() => {
                      onClickPackage("Session Audio Engineer");
                    }}
                  >
                    <p className="package-title">Session Audio Engineer</p>
                    <p className="package-text">
                      This studio requires and includes an in-house Engineer in
                      each booking.
                    </p>
                    {packageName === "Session Audio Engineer" &&
                    packageSelected ? (
                      <div className="package-included">
                        <img
                          alt="tick mark"
                          src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/30/ffffff/external-checkbox-tick-mark-accept-your-checklist-queries-basic-color-tal-revivo.png"
                        />
                        <p className="package-included-text">
                          Package Included
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="additional-packages-item"
                    onClick={() => {
                      onClickPackage("Mixing/Mastering Services");
                    }}
                  >
                    <p className="package-title">Mixing/Mastering Services</p>
                    <p className="package-text">
                      Looking for help with mixing or mastering? This studio
                      offers additional services that you can add to your studio
                      booking.
                    </p>
                    {packageName === "Mixing/Mastering Services" &&
                    packageSelected ? (
                      <div className="package-included">
                        <img
                          alt="tick mark"
                          src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/30/ffffff/external-checkbox-tick-mark-accept-your-checklist-queries-basic-color-tal-revivo.png"
                        />
                        <p className="package-included-text">
                          Package Included
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <p className="equipments-title">Equipments</p>
                <div className="equipments-container">
                  {/* 1 */}
                  <div className="equipment">
                    <p className="bulletpoint">·</p>
                    <p className="equipment-name">
                      Condenser Microphone- SE Electronics SE2300
                    </p>
                  </div>
                  {/* 1 */}
                  <div className="equipment">
                    <p className="bulletpoint">·</p>
                    <p className="equipment-name">
                      External USB mouse & keyboard
                    </p>
                  </div>
                  {/* 1 */}
                  <div className="equipment">
                    <p className="bulletpoint">·</p>
                    <p className="equipment-name">
                      Headphones-2 x Pioneer HRM-5 Headphones
                    </p>
                  </div>
                </div>
                <div className="service-ratings-reviews-container">
                  <div className="service-overall-ratings">
                    <div className="ratings-container">
                      <p className="service-ratings-number">4.0/5</p>
                      <p className="service-ratings-text">Overall Ratings</p>
                    </div>
                    <div className="verified-ratings">
                      <p>⭐⭐⭐⭐</p>
                      <p className="verified-ratings-text">
                        1000+ verified ratings
                      </p>
                    </div>
                  </div>
                  <div className="service-review-btn-container">
                    <div className="service-review-btn">Write a Review</div>
                  </div>
                </div>
                <p className="reviews-title">Reviews</p>
                <div className="reviews-container">
                  <div className="review-user-container">
                    <div className="review-user-img" />
                    <p className="review-username">Aditya Rajguru</p>
                  </div>
                  <p className="review-text">
                    "I had a wonderful experience working with the Sound
                    Engineer and Associates."
                  </p>
                </div>
                <div className="reviews-container">
                  <div className="review-user-container">
                    <div className="review-user-img" />
                    <p className="review-username">Aditya Rajguru</p>
                  </div>
                  <p className="review-text">
                    "I had a wonderful experience working with the Sound
                    Engineer and Associates."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudioDetails;
