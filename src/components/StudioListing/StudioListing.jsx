import React from "react";
import StudioData from "../../Data/StudioData";
import "./styles.css";

function StudioListing() {
  return (
    <div className="studioListing">
      <div className="studioListing-image">
        <img
          src="https://i.ibb.co/RycX0TC/wavy-Orange.png"
          alt="wavy-Orange"
          className="wavy-orange"
        ></img>
        <img
          src="https://i.ibb.co/p2ZTCq0/listing-Page-Vector.png"
          alt="listing-Page-Vector"
          className="listing-Page-Vector"
        ></img>
        <h1 className="header">Music Studios</h1>
      </div>
      <div className="studios">
        {StudioData.map((studio, index) => (
          <div className="studio">
            <div className="upper-container">
              <img
                className="studio-image"
                src={studio.image}
                alt={studio.name}
              />
            </div>
            <div className="lower-container">
              <p id="studio-name" className="studio-text">
                {studio.name}
              </p>
              <p id="studio-address" className="studio-text">
                {studio.address}
              </p>
              <div className="bottom-container">
                <p id="studio-cost" className="studio-text">
                  ₹{studio.cost}/hr
                </p>
                <p id="studio-ratings" className="studio-text">
                  {"⭐".repeat(studio.ratings)}
                </p>
              </div>
            </div>
            <div className="bookNow-btn">
              <p className="bookNow-text">Book Now</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudioListing;
