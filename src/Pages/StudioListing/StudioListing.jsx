import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import UserDetailsContext from "../../Context/UserDetailsContext";
import ScaleLoader from "react-spinners/ScaleLoader";

function StudioListing(props) {
  const [studiosList, setStudiosList] = useState([]);
  const [studios, setStudios] = useState([]);
  const { setIds } = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(true);
  const color = "#FF782C";

  useEffect(() => {
    document.title = "Jamr | Studios";
    fetchStudioList();
  }, []);

  useEffect(() => {
    console.log(process.env);
    console.log("==GET DATA List==", studiosList);
  }, [studiosList]);

  useEffect(() => {
    let studioList = studiosList.filter((studio) => studio.studioprice > 0);
    setStudios(studioList);
  }, [studiosList]);

  //PRODUCTION
  const fetchStudioList = async () => {
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/studio`,
      {
        //TESTIN
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
        if (!data.message) {
          setStudiosList(data);
          console.log("studiosData ----->", studiosList);
          setLoading(false);
        } else {
          console.log("Failed", data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const StudioContainer = (studio) => {
    const id = studio.id;
    return (
      <Link className="studio-link" to="/studio-details">
        <div
          className="studio"
          onClick={() => {
            console.log("id", id);
            setIds({
              studioId: id,
            });
          }}
        >
          <div className="upper-container">
            <img
              className="studio-listing-image"
              src={"studio.image"}
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
                ₹{studio.price}/hr
              </p>
              {/* <p id="studio-ratings" className="studio-text">
                {"⭐".repeat(studio.ratings)}
              </p> */}
              <p id="studio-ratings">⭐⭐⭐⭐</p>
            </div>
          </div>
          <div className="bookNow-btn">
            <p className="bookNow-text">Book Now</p>
          </div>
        </div>
      </Link>
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
        <div className="studioListing">
          <div className="studioListing-image">
            <img
              src="https://i.ibb.co/RycX0TC/wavy-Orange.png"
              alt="wavy-Orange"
              className="wavy-orange-vector"
            ></img>
            <img
              src="https://i.ibb.co/p2ZTCq0/listing-Page-Vector.png"
              alt="listing-Page-Vector"
              className="listing-page-vector"
            ></img>
            <h1 className="header">Music Studios</h1>
          </div>
          <div className="studio-listings">
            {studios.map((studio, index) => (
              // <Link
              //   className="studio-link"
              //   to={{ pathname: "/studio-details", data: studio.LocationId }}
              // >
              // {console.log(studio.LocationId)}
              <StudioContainer
                id={studio.id}
                name={studio.name}
                address={studio.locality + ", " + studio.city}
                price={
                  studio.studioprice !== 0
                    ? studio.studioprice
                    : studio.jampadprice
                }
                // image={studio.studio.imageLocationLinks[0]}
                key={index}
              />
              // </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudioListing;
