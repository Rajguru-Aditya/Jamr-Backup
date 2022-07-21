import React, { useContext, useState } from "react";
import "./styles.css";
import { MenuItem, Menu } from "@mui/material/";
import SortingContext from "../../Context/SortingContext";

function FilterBar() {
  const [anchorElSort, setAnchorElSort] = useState(null);
  const [anchorElAll, setAnchorElAll] = useState(null);
  const { setSortOrder } = useContext(SortingContext);
  const ITEM_HEIGHT = 42;
  const openSort = Boolean(anchorElSort);
  const openAll = Boolean(anchorElAll);
  const handleClickSort = (event) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleClickAll = (event) => {
    setAnchorElAll(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElSort(null);
    setAnchorElAll(null);
  };

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        <div className="bar-items">
          <h1 className="item-text">Sort By</h1>
          <img
            src="https://img.icons8.com/ios-glyphs/100/000000/sort-down.png"
            alt="dropdown-arrow"
            className="dropdown-arrow"
            onClick={handleClickSort}
          />
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorElSort}
          open={openSort}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setSortOrder("low-high");
              handleClose();
            }}
          >
            Low to High
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSortOrder("high-low");
              handleClose();
            }}
          >
            High to Low
          </MenuItem>
        </Menu>
        <div className="bar-items">
          <h1 className="item-text">All Filters</h1>
          <img
            src="https://img.icons8.com/ios-glyphs/100/000000/sort-down.png"
            alt="dropdown-arrow"
            className="dropdown-arrow"
            onClick={handleClickAll}
          />
          <Menu
            id="long-menu"
            anchorEl={anchorElAll}
            open={openAll}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                setSortOrder("availability");
                handleClose();
              }}
            >
              Availability
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortOrder("distance");
                handleClose();
              }}
            >
              Distance
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortOrder("low-high");
                handleClose();
              }}
            >
              Low to High
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortOrder("high-low");
                handleClose();
              }}
            >
              High to Low
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortOrder("a-z");
                handleClose();
              }}
            >
              A - Z
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortOrder("z-a");
                handleClose();
              }}
            >
              Z - A
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
