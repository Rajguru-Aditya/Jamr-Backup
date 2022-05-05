import React from "react";
import "./styles.css";

function StudioUserProfile() {
  return (
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
              <input className="input-fields" type="text" placeholder="Name" />
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
  );
}

export default StudioUserProfile;
