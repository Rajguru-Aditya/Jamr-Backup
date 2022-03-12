import React from "react";
import "./styles.css";

function FilterBar() {
  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        <div className="bar-items">
          <h1 className="item-text">Availability</h1>
          <img
            src="https://img.icons8.com/ios-glyphs/100/000000/sort-down.png"
            alt="dropdown-arrow"
            className="dropdown-arrow"
          />
        </div>
        <div className="bar-items">
          <h1 className="item-text">All Filters</h1>
          <img
            src="https://img.icons8.com/ios-glyphs/100/000000/sort-down.png"
            alt="dropdown-arrow"
            className="dropdown-arrow"
          />
        </div>
        <div className="bar-items">
          <h1 className="item-text">Sort By</h1>
          <img
            src="https://img.icons8.com/ios-glyphs/100/000000/sort-down.png"
            alt="dropdown-arrow"
            className="dropdown-arrow"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
