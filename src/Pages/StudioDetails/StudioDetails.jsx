import React, { useEffect, useState, useContext } from "react";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import SlotsData from "../../Data/SlotsData";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import UserDetailsContext from "../../UserDetailsContext";
import BookingDetailsContext from "../../BookingDetailsContext";

function StudioDetails(props) {
  const [studioData, setStudioData] = useState();
  const [equipmentData, setEquipmentData] = useState();
  const equipmentKeys = [];
  const equipmentValues = [];
  const [loading, setLoading] = useState(true);
  const [packageSelected, setPackageSelected] = useState(false);
  const [packageName, setPackageName] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [dateClicked, setDateClicked] = useState(false);
  const [dateState, setDateState] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const bookedSlotsArray = [];
  const [reviews, setReviews] = useState([]);
  const { ids } = useContext(UserDetailsContext);
  // const studioId = ids.studioId;

  const { setDetails } = useContext(BookingDetailsContext);

  // console.log("studioId ->", studioId);

  const changeDate = (date) => {
    setDateState(date);
  };

  useEffect(() => {
    if (
      window.localStorage.getItem("studioId") === null ||
      window.localStorage.getItem("studioId") === undefined ||
      window.localStorage.getItem("studioId") === ""
    ) {
      window.localStorage.setItem("studioId", ids.studioId);
    } else {
      if (
        ids.studioId !== "" &&
        window.localStorage.getItem("studioId") !== ids.studioId
      ) {
        window.localStorage.setItem("studioId", ids.studioId);
      }
    }
  }, []);

  console.log("LOCALSTORAGE", window.localStorage.getItem("studioId"));

  const color = "#FF782C";

  // Horizontal Scroll Menu

  useEffect(() => {
    document.title = "Jamr | Studio Details";
    fetchStudioData();
    fetchReviews();
  }, []);

  useEffect(() => {
    bookedSlots.map((slot) => {
      console.log("slot ->", slot.SlotBooked);
      return bookedSlotsArray.push(slot.SlotBooked);
    });
    console.log("bookedSlotsArray ->", bookedSlotsArray);
    SlotsComponent();
  }, [bookedSlots]);

  useEffect(() => {
    console.log("==GET STUDIO DATA==", studioData);
    console.log("==GET EQUIPMENT DATA==", equipmentData);
    getEquipment();
  }, [equipmentData, studioData]);

  useEffect(() => {
    console.log(equipmentKeys);
    console.log(equipmentValues);
  }, [equipmentKeys, equipmentValues]);

  useEffect(() => {
    getStartTime();
  }, [selectedSlots]);

  useEffect(() => {
    fetchBookedSlots();
  }, [dateState]);

  useEffect(() => {
    console.log("REVIEWS========>", reviews);
  }, [reviews]);

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
  console.log("today", date.toISOString());

  const onClickPackage = (title) => {
    setPackageName(title);
    setPackageSelected(!packageSelected);
  };

  console.log("DATE ->>>", moment(dateState).format("YYYY-MM-DD"));

  const fetchBookedSlots = async () => {
    //Production
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${
        process.env.REACT_APP_DOMAIN
      }/slots?id=${
        localStorage.getItem("studioId")
          ? localStorage.getItem("studioId")
          : ids.studioId
      }&date=${moment(dateState).format("YYYY-MM-DD")}`,
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
        if (data.data) {
          console.log("BOOKED SLOTS", data);
          console.log("BOOKED SLOTS LIST ->", data.data);
          setBookedSlots(data.data);
        } else {
          console.log("Something went wrong", data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchStudioData = async () => {
    //Production
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${
        process.env.REACT_APP_DOMAIN
      }/studio/details?type=D&id=${
        localStorage.getItem("studioId")
          ? localStorage.getItem("studioId")
          : ids.studioId
      }`,
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
        if (!data.isError) {
          // console.log("=========>", data.data[0]);
          console.log("STUDIO DATA=========>", data.data);
          setStudioData(data.data[0].studio);
          setEquipmentData(data.data[0].equipment);
          // console.log("studioData ----->", data.data);
          // console.log("Equipment Data in states ----->", equipmentData);
          setLoading(false);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //FETCHING REVIEWS

  const fetchReviews = async () => {
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/review/get`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          listing: "S",
          sid: localStorage.getItem("studioId")
            ? localStorage.getItem("studioId")
            : ids.studioId,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.isError) {
          // console.log("=========>", data.data[0]);
          console.log("STUDIO REVIEWS=========>", data.data);
          setReviews(data.data);
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
  console.log("selectedSlotsTIME", startTime, endTime);

  const getStartTime = () => {
    if (!selectedSlots.length) {
      return;
    } else {
      selectedSlots.sort((a, b) => a - b);
      let startT = SlotsData[selectedSlots[0] - 1].start;
      let endT =
        SlotsData[
          selectedSlots[
            selectedSlots.length > 1
              ? selectedSlots.length - 2
              : selectedSlots.length - 1
          ]
        ].end;
      setStartTime(startT);
      setEndTime(endT);
    }
  };

  const onDateClicked = () => {
    setDateClicked(!dateClicked);
  };

  const getEquipment = () => {
    for (var key in equipmentData) {
      if (equipmentData.hasOwnProperty(key)) {
        console.log("key", key);
        console.log("value", equipmentData[key]);
        equipmentKeys.push(key);
        equipmentValues.push(equipmentData[key]);
      }
    }
  };

  let navigate = useNavigate();

  const EquipmentsComponent = () => {
    for (var key in equipmentData) {
      if (equipmentData.hasOwnProperty(key)) {
        console.log("key", key);
        console.log("value", equipmentData[key]);
        equipmentKeys.push(key);
        equipmentValues.push(equipmentData[key]);
        return (
          <div className="equipment">
            <p className="bulletpoint">·</p>
            <p className="equipment-name">
              Headphones-2 x Pioneer HRM-5 Headphones
            </p>
          </div>
        );
      }
    }
  };

  const RenderReviews = (reviews) => {
    return (
      <div className="reviews-container">
        <div className="review-user-container">
          <div className="review-user-img" />
          <p className="review-username">{reviews.fullname}</p>
          <div className="reviewsContainer">
            <p className="review-text">{"⭐".repeat(reviews.ratings)}</p>
          </div>
        </div>
        <p className="review-text">{reviews.reviewText}</p>
      </div>
    );
  };

  // Render Slots
  const SlotsComponent = () => (
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
              className={[
                bookedSlotsArray.includes(slot.id)
                  ? "disabled-slots"
                  : selectedSlots.includes(slot.id)
                  ? "selected-slot-circle"
                  : "slot-circle",
              ]}
            ></div>
            <p>
              {slot.start}:00 - {slot.end}:00
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const proceedBooking = () => {
    if (
      window.localStorage.getItem("userId") === null ||
      window.localStorage.getItem("userId") === undefined ||
      window.localStorage.getItem("userId") === ""
    ) {
      alert("Please Login/Register to proceed");
      navigate("/login");
    } else {
      setDetails({
        bookingDate: dateState,
        selectedSlots: selectedSlots,
        totalPrice:
          selectedSlots.length *
          (studioData.studioPrice !== "0.00"
            ? studioData.studioPrice
            : studioData.jampadPrice),
        pricePerHour:
          studioData.studioPrice !== "0.00"
            ? studioData.studioPrice
            : studioData.jampadPrice,
        startTime: startTime,
        endTime: endTime,
        studioName: studioData.studioName,
        studioAddress: studioData.locality + " , " + studioData.city,
      });
      navigate("/Payment");
    }
  };
  console.log(dateState.toISOString());

  console.log("Studio Name", studioData ? studioData : null);

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
              className="wavy-orange-details"
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
                  <div onClick={onDateClicked} className="date-inner-container">
                    <p>
                      {dateState
                        ? moment(dateState).format("MMMM Do YYYY")
                        : today}
                    </p>
                  </div>
                  {dateClicked ? (
                    <Calendar
                      value={dateState}
                      onChange={changeDate}
                      className="calendar"
                    />
                  ) : null}
                </div>
                <div className="time-duration-container">
                  <div className="time-container">
                    <p className="time-title">Start Time</p>
                    <div className="time-inner-container">
                      <p>{startTime ? startTime + ":00" : "00:00"}</p>
                    </div>
                  </div>
                  <div className="duration-container">
                    <p className="duration-title">Duration</p>
                    <div className="duration-inner-container">
                      <p>{selectedSlots.length} hrs</p>
                    </div>
                  </div>
                </div>
                {/* SLOTS */}
                {/* <div className="slots-container">
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
                            bookedSlotsArray.includes(slot.id)
                              ? "disabled-slots"
                              : selectedSlots.includes(slot.id)
                              ? "selected-slot-circle"
                              : "slot-circle"
                          }
                          PointerEvents="none"
                        ></div>
                        <p>
                          {slot.start}:00 - {slot.end}:00
                        </p>
                      </div>
                    ))}
                  </div>
                </div> */}
                <SlotsComponent />
                <div onClick={proceedBooking} className="book-now-btn">
                  <p>Book Now</p>
                </div>
              </div>
            </div>
            <div className="studioDetails-right-container">
              <div className="studioDetails-info">
                <div className="studioDetails-info-title">
                  <h1 className="title">
                    {studioData ? studioData.studioName : null}
                  </h1>
                </div>
                <div className="studioDetails-info-address">
                  <p className="address">
                    {studioData ? studioData.address : null},{" "}
                    {studioData ? studioData.locality : null},{" "}
                    {studioData ? studioData.city : null}
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
                      ₹
                      {studioData
                        ? studioData.studioPrice !== "0.00"
                          ? studioData.studioPrice
                          : studioData.jampadPrice
                        : null}
                      /hr
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
                  {/* <div className="equipment">
                    <p className="bulletpoint">·</p>
                    <p className="equipment-name">
                      Condenser Microphone- SE Electronics SE2300
                    </p>
                  </div> */}
                  {/* 1 */}
                  {/* <div className="equipment">
                    <p className="bulletpoint">·</p>
                    <p className="equipment-name">
                      External USB mouse & keyboard
                    </p>
                  </div> */}
                  {/* 1 */}
                  {/* <div className="equipment">
                    <p className="bulletpoint">·</p>
                    <p className="equipment-name">
                      Headphones-2 x Pioneer HRM-5 Headphones
                    </p>
                  </div> */}
                  <EquipmentsComponent />
                </div>
                {/* <div className="service-ratings-reviews-container">
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
                </div> */}
                <p className="reviews-title">Reviews</p>
                {reviews &&
                  reviews.map((review, index) => (
                    <RenderReviews
                      key={index}
                      fullname={review.FullName}
                      reviewText={review.ReviewText}
                      ratings={review.ReviewScore}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudioDetails;
