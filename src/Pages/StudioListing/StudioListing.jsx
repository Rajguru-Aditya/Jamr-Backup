import React, { useEffect, useState } from "react";
import StudioData from "../../Data/StudioData";
import "./styles.css";

function StudioListing() {
  const [studiosList, setStudiosList] = useState([]);

  useEffect(() => {
    fetchStudioList();
  }, []);

  useEffect(() => {
    console.log("==GET DATA List==", studiosList);
  }, [studiosList]);

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
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const StudioContainer = (studio) => {
    return (
      <div className="studio" key={studio.key}>
        <div className="upper-container">
          <img className="studio-image" src={studio.image} alt={studio.name} />
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
              ₹{studio.price}/hr
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
    );
  };

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
        {studiosList.map((studio, index) => (
          <StudioContainer
            name={studio.JAMRStudioName}
            address={studio.Locality}
            price={studio.PricePerHourStudio}
            image={studio.LocationImageLinks[1]}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default StudioListing;
