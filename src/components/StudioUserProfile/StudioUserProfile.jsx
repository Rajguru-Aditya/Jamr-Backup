import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import ReferralContent from "../../components/ReferralContent/ReferralContent";
import Alert from "@mui/material/Alert";

function StudioUserProfile() {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [editIconClicked, setEditIconClicked] = useState({
    name: false,
    phone: false,
    email: false,
  });
  const [editedDetail, setEditedDetail] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const color = "#FF782C";

  const name = useRef("");
  const mobile = useRef("");
  const email = useRef("");

  useEffect(() => {
    setUserId(window.localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    console.log("LS USER ID >>", userId);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    setUserData(userData);
  }, [userData]);

  useEffect(() => {
    setTimeout(() => setShowAlert(false), 4000);
  }, [showAlert]);

  console.log("SHOW USER DATA", userData);

  const fetchUserData = async () => {
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/user/${userId}`,
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
        console.log("USER ID", userId);
        console.log("Response Body -> ", JSON.parse(JSON.stringify(data)));

        if (!data.isError) {
          setUserData(data);
          console.log("USER DETAILS ----->", data);
          setEditedDetail({
            name: data.name,
            phone: data.mobile,
            email: data.email,
          });
          name.current = data.name;
          mobile.current = data.mobile;
          email.current = data.email;
          setLoading(false);
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const UpdateUser = async () => {
    //PRODUCTION
    await fetch(
      `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/user/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${
            editedDetail.name !== userData.name &&
            editedDetail.name !== undefined
              ? editedDetail.name
              : name.current
          }`,
          mobile: `${
            editedDetail.phone !== userData.mobile &&
            editedDetail.phone !== undefined
              ? editedDetail.phone
              : mobile.current
          }`,
          email: `${
            editedDetail.email !== userData.email &&
            editedDetail.email !== undefined
              ? editedDetail.email
              : email.current
          }`,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.isError) {
          console.log("Update detail ----->", data);
          setShowAlert(true);
          handleCancleEdit();
        } else {
          console.log("Failed", data.isError);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancleEdit = () => {
    setEditIconClicked({
      name: false,
      phone: false,
      email: false,
    });
  };

  const handleUpdateUser = () => {
    console.log("original data: ", name.current);
    console.log("original data: ", mobile.current);
    console.log("original data: ", email.current);
    console.log("Edited data: ", editedDetail.name);
    console.log("Edited data: ", editedDetail.phone);
    console.log("Edited data: ", editedDetail.email);
    UpdateUser();
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
        <>
          <div className="studioUserProfile">
            <div className="profile-upper-container">
              <div className="profile-upper-left-container">
                <div className="profile-img-container">
                  <img
                    className="user-profile-image"
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
                      value={editedDetail ? editedDetail.name : ""}
                      onChange={(text) =>
                        setEditedDetail({ name: text.target.value })
                      }
                      disabled={!editIconClicked.name}
                    />
                    <img
                      src="https://img.icons8.com/fluency-systems-filled/48/000000/edit.png"
                      alt="edit"
                      className="edit-icon"
                      onClick={() => setEditIconClicked({ name: true })}
                    />
                  </div>
                  <div className="input-fields-container">
                    <input
                      className="input-fields"
                      type="text"
                      placeholder="Mobile Number"
                      value={editedDetail ? editedDetail.phone : ""}
                      onChange={(text) =>
                        setEditedDetail({ phone: text.target.value })
                      }
                      disabled={!editIconClicked.phone}
                    />
                    <img
                      src="https://img.icons8.com/fluency-systems-filled/48/000000/edit.png"
                      alt="edit"
                      className="edit-icon"
                      onClick={() => setEditIconClicked({ phone: true })}
                    />
                  </div>
                  <div className="input-fields-container">
                    <input
                      className="input-fields"
                      type="text"
                      placeholder="Email Address"
                      value={editedDetail ? editedDetail.email : ""}
                      onChange={(text) =>
                        setEditedDetail({ email: text.target.value })
                      }
                      disabled={!editIconClicked.email}
                    />
                    <img
                      src="https://img.icons8.com/fluency-systems-filled/48/000000/edit.png"
                      alt="edit"
                      className="edit-icon"
                      onClick={() => setEditIconClicked({ email: true })}
                    />
                  </div>
                </div>
                {editIconClicked.name ||
                editIconClicked.phone ||
                editIconClicked.email ? (
                  <div className="edit-btn-container">
                    <div
                      onClick={handleUpdateUser}
                      className="edit-save-cancel-btn"
                      id="edit-save-btn"
                    >
                      Save changes
                    </div>
                    <div
                      onClick={handleCancleEdit}
                      className="edit-save-cancel-btn"
                      id="edit-cancel-btn"
                    >
                      Cancel
                    </div>
                  </div>
                ) : null}
                {showAlert ? (
                  <Alert severity="success">
                    User Details Updated Successfully!
                  </Alert>
                ) : null}
              </div>
            </div>
            <div className="profile-middle-container">
              <div className="textarea-inputs">
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
          <ReferralContent userReferralCode={userData.referralCode} />
        </>
      )}
    </div>
  );
}

export default StudioUserProfile;
