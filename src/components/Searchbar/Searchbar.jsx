import React from "react";
import "./styles.css";

function Searchbar() {
  return (
    <div className="searchbar">
      <img
        src="https://img.icons8.com/ios-glyphs/30/777777/search--v1.png"
        alt="search"
      />
      <input
        type="text"
        placeholder="Search for music studios, jampads..."
        className="search-input"
      />
    </div>
  );
}

export default Searchbar;
