import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

function Searchbar() {

  const [path, setPath] = useState("/");

  useEffect(() => {
    console.log(window.location.pathname)
    setPath(window.location.pathname);
  }, [])
  

  return (
    <div className={ (path === "/login") ? "searchbar-hidden" : "searchbar"}>
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
