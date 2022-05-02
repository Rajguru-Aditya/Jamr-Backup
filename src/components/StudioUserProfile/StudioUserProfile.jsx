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
        <div className="profile-upper-right-container"></div>
      </div>
    </div>
  );
}

export default StudioUserProfile;
