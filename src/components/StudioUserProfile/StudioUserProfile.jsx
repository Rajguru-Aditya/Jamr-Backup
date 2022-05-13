import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import UserDetailsContext from "../../UserDetailsContext";

function StudioUserProfile() {
  const { ids } = useContext(UserDetailsContext);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const color = "#FF782C";

  const userIdForProfile = window.localStorage.getItem("userId");

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setUserData(userData);
  }, [userData]);

  console.log("SHOW USER DATA", userData);

  const fetchUserData = async () => {
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${
        process.env.REACT_APP_DOMAIN
      }/user/profile/${userIdForProfile ? userIdForProfile : 0}`,
      {
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
          setUserData(data.data);
          console.log("USER DETAILS ----->", data.data);
          setLoading(false);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
        <div className="studioUserProfile">
          <div className="profile-upper-container">
            <div className="profile-upper-left-container">
              <div className="profile-img-container">
                <img
                  className="profile-image"
                  src="https://images.unsplash.com/photo-1507114845806-0347f6150324?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  alt="profile"
                />
              </div>
              <p>Add or Edit profile picture</p>
            </div>
            <div className="profile-upper-right-container">
              <div className="inputs">
                <div className="input-fields-container">
                  <input
                    className="input-fields"
                    type="text"
                    placeholder="Name"
                    value={userData[0] ? userData[0].Fullname : ""}
                    disabled={true}
                  />
                  <img
                    src="https://img.icons8.com/fluency-systems-filled/48/000000/edit.png"
                    alt="edit"
                    className="edit-icon"
                  />
                </div>
                <div className="input-fields-container">
                  <input
                    className="input-fields"
                    type="text"
                    placeholder="Mobile Number"
                    value={userData[0] ? userData[0].MobileNumber : ""}
                    disabled={true}
                  />
                  <img
                    src="https://img.icons8.com/fluency-systems-filled/48/000000/edit.png"
                    alt="edit"
                    className="edit-icon"
                  />
                </div>
                <div className="input-fields-container">
                  <input
                    className="input-fields"
                    type="text"
                    placeholder="Email Address"
                    value={userData[0] ? userData[0].EmailId : ""}
                    disabled={true}
                  />
                  <img
                    src="https://img.icons8.com/fluency-systems-filled/48/000000/edit.png"
                    alt="edit"
                    className="edit-icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="profile-middle-container">
            <div className="inputs">
              <textarea
                className="textarea-field"
                type="text"
                placeholder="Add your Bio"
              />
              <textarea
                className="textarea-field"
                type="text"
                placeholder="Address"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudioUserProfile;
