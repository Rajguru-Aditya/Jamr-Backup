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
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudioDetails;
