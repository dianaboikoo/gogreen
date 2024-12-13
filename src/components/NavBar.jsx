import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/styles.css";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <Link
        to="/mealplan"
        className={`nav-item ${location.pathname === "/mealplan" ? "active" : ""}`}
      >
        <i className="fas fa-calendar-alt"></i>
      </Link>
      <Link
        to="/search"
        className={`nav-item ${location.pathname === "/search" ? "active" : ""}`}
      >
        <i className="fas fa-search"></i>
      </Link>
      <Link
        to="/shoppinglist"
        className={`nav-item ${location.pathname === "/shoppinglist" ? "active" : ""}`}
      >
        <i className="fas fa-shopping-cart"></i>
      </Link>
      <Link
        to="/account"
        className={`nav-item ${location.pathname === "/account" ? "active" : ""}`}
      >
        <i className="fas fa-user"></i>
      </Link>
    </nav>
  );
};

export default NavBar;
