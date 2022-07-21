import React, { useEffect, useState, useContext } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import SlotsData from "../../Data/SlotsData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import UserDetailsContext from "../../Context/UserDetailsContext";
import BookingDetailsContext from "../../Context/BookingDetailsContext";
import { Modal, Box, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

//Date Time Slots Component

const DateTimeSlots = ({
  handleSlotClick,
  proceedBooking,
  today,
  dateState,
  setDateState,
  startTime,
  selectedSlots,
  screenWidthChanged,
  bookedSlots,
}) => {
  return (
    <div className="date-time-slots-container">
      <div className="date-container">
        <p className="date-title">Date</p>
        <DatePicker
          selected={dateState}
          onChange={(date) => setDateState(date)}
          className="date-inner-container datePicker"
          minDate={moment().toDate()}
          dateFormat="dd MMMM yyyy"
        />
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
      <SlotsComponent
        slots={SlotsData}
        onSlotClick={handleSlotClick}
        selectedSlots={selectedSlots}
        screenWidthChanged={screenWidthChanged}
        bookedSlots={bookedSlots}
      />
      <div onClick={proceedBooking} className="book-now-btn">
        <p>Book Now</p>
      </div>
    </div>
  );
};

// Render Slots
function SlotsComponent({
  slots,
  selectedSlots,
  onSlotClick,
  screenWidthChanged,
  bookedSlots,
}) {
  console.log("Screen Width Changed", screenWidthChanged);
  return (
    <div className="slots-container">
      {!screenWidthChanged ? (
        <div className="slots-inner-container">
          {slots.map((slot, index) => (
            <div
              onClick={() => onSlotClick(slot.id)}
              className="slot-items"
              key={index}
            >
              <div
                className={[
                  bookedSlots.filledSlots.length > 0
                    ? bookedSlots.filledSlots.includes(slot.id) &&
                      "disabled-slots"
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
      ) : (
        <div className="slots-inner-container-mobile">
          {slots.map((slot, index) => (
            <div
              onClick={() => onSlotClick(slot.id)}
              className="slot-items-mobile"
              key={index}
            >
              <div
                className={[
                  bookedSlots.filledSlots.length > 0
                    ? bookedSlots.filledSlots.includes(slot.id) &&
                      "disabled-slots"
                    : selectedSlots.includes(slot.id)
                    ? "selected-slot-circle"
                    : "slot-circle",
                ]}
              ></div>
              <p>
                {slot.start}:00 - {slot.end}:00
              </p>
              <p>Select</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Equipments data
const EquipmentsComponent = (eqData) => {
  return (
    <>
      {/* {Object.values(eqData).forEach((key) => {
        Object.entries(key).forEach(([key, value]) => {
          console.log("---key---", key);
          console.log("---value---", value);
          return (
            <div className="equipment">
              <p className="bulletpoint">·</p>
              <p className="equipment-name">{key}</p>
            </div>
          );
        });
      })} */}
    </>
  );
};

function StudioDetails(props) {
  const [studioData, setStudioData] = useState();
  const [equipmentData, setEquipmentData] = useState([]);
  const [filteredEquipmentData, setFilteredEquipmentData] = useState();
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
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setDetails } = useContext(BookingDetailsContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
    justifyContent: "center",
  };

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
    console.log("bookedSlots ->", bookedSlots.filledSlots);
    // SlotsComponent();
  }, [bookedSlots]);

  useEffect(() => {
    console.log("==GET STUDIO DATA==", studioData);
    console.log("==GET EQUIPMENT DATA==", equipmentData);
  }, [equipmentData, studioData]);

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

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
  }, []);

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
      }/studio/${localStorage.getItem("studioId")}/slots?date=${moment(
        dateState
      ).format("YYYY-MM-DD")}`,
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
          console.log("BOOKED SLOTS", data);
          setBookedSlots(data);
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
      }/studio/${localStorage.getItem("studioId")}`,
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
          console.log("STUDIO DATA=========>", data);
          setStudioData(data);
          setEquipmentData(data);
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

  //Filtered equipment data

  // useEffect(() => {
  //   Object.entries(equipmentData).map(([key, value]) => {
  //     console.log("---New key---", key);
  //     console.log("---New value---", value);
  //   });
  // }, [equipmentData]);

  // Add and delete slots

  const handleSlotClick = (slot) => {
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

  const proceedBooking = () => {
    setDetails({
      bookingDate: dateState,
      selectedSlots: selectedSlots,
      totalPrice:
        selectedSlots.length *
        (studioData.studioprice !== 0
          ? studioData.studioprice
          : studioData.jampadprice),
      pricePerHour:
        studioData.studioprice !== 0
          ? studioData.studioprice
          : studioData.jampadprice,
      startTime: startTime,
      endTime: endTime,
      studioName: studioData.name,
      studioAddress: studioData.locality + " , " + studioData.city,
    });
    console.log("BOOKING DETAILS: ", studioData.studioprice, studioData.name);
    navigate("/Payment");
  };

  console.log(dateState.toISOString());

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
                className="studio-detail-image"
              />
              {/* Button to toggle date time slots modal. Only visible when screen size is < 600px */}
              {screenWidth < 600 && (
                <button onClick={handleOpen} className="slots-modal-btn">
                  Book Slots
                </button>
              )}

              {screenWidth > 600 && (
                <DateTimeSlots
                  selectedSlots={selectedSlots}
                  startTime={startTime}
                  setDateState={setDateState}
                  dateState={dateState}
                  today={today}
                  proceedBooking={proceedBooking}
                  handleSlotClick={handleSlotClick}
                  bookedSlots={bookedSlots}
                />
              )}

              {/* DateTimeSlots Modal - toggles when book slots button is clicked */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <Close onClick={handleClose} />
                  </Typography>
                  <div className="modal-inner-container">
                    <DateTimeSlots
                      selectedSlots={selectedSlots}
                      startTime={startTime}
                      setDateState={setDateState}
                      dateState={dateState}
                      today={today}
                      proceedBooking={proceedBooking}
                      handleSlotClick={handleSlotClick}
                      screenWidthChanged={screenWidth > 600 ? false : true}
                    />
                  </div>
                </Box>
              </Modal>
            </div>
            <div className="studioDetails-right-container">
              <div className="studioDetails-info">
                <div className="studioDetails-info-title">
                  <h1 className="title">{studioData?.name}</h1>
                </div>
                <div className="studioDetails-info-address">
                  <p className="address">
                    {studioData?.address}, {studioData?.locality},{" "}
                    {studioData?.city}, {studioData?.state}
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
                        ? studioData.studioprice !== 0
                          ? studioData.studioprice
                          : studioData.jampadprice
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
                  <EquipmentsComponent eqData={equipmentData} />
                </div>
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
