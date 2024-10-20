import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  const navStyle = {
    color: "white",
  };

  return (
    <div className="navigation">
      <nav>
        <ul className="navigation-links">
          <Link style={navStyle} to="/calendar">
            <li>Calendar</li>
          </Link>
          <Link style={navStyle} to="/">
            <li>Home</li>
          </Link>
          <Link style={navStyle} to="/info">
            <li>Info</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
