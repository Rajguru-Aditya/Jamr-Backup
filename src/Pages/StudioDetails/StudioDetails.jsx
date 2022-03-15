import React from "react";
import "./styles.css";

function StudioDetails() {
  return (
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
              <p className="date">Tuesday 15 March, 2022</p>
              <p className="time">4pm to 7pm (3hrs)</p>
            </div>
            <div className="date-container">
              <p className="date-title">Date</p>
              <div className="date-inner-container">
                <p>Tuesday 15 March, 2022</p>
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
            <div className="slots-container"></div>
            <div className="book-now-btn">
              <p>Book Now</p>
            </div>
          </div>
        </div>
        <div className="studioDetails-right-container">
          <div className="studioDetails-info">
            <div className="studioDetails-info-title">
              <h1 className="title">Studio Name</h1>
            </div>
            <div className="studioDetails-info-address">
              <p className="address">Church Road, Bandra</p>
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
                <p className="cost">₹700/hr</p>
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
                <p className="equipment-name">External USB mouse & keyboard</p>
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
                <div utton className="service-review-btn">
                  Write a Review
                </div>
              </div>
            </div>
            <p className="reviews-title">Reviews</p>
            <div className="reviews-container">
              <div className="review-user-container">
                <div className="review-user-img" />
                <p className="review-username">Aditya Rajguru</p>
              </div>
              <p className="review-text">
                "I had a wonderful experience working with the Sound Engineer
                and Associates."
              </p>
            </div>
            <div className="reviews-container">
              <div className="review-user-container">
                <div className="review-user-img" />
                <p className="review-username">Aditya Rajguru</p>
              </div>
              <p className="review-text">
                "I had a wonderful experience working with the Sound Engineer
                and Associates."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudioDetails;
