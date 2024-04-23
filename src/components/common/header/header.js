// src/components/common/Header.js
import React from "react";
import "./css/Header.css";
import logo from "../../../img/logo.png";
function Header({ title, name }) {
  return (
    <header className="containerHeader">
        <div className="contentLogo">
          <img
          className="logo"
            src={logo}
            alt="Logo"
          />
          <label className="labelTitle">{title}</label>
        </div>
        <div className="title"></div>
        <div className="navbar">
            <ul>
                <li>
                <a href="/">Home</a>
                </li>
                <li>
                <a href="/product/find">Productos</a>
                </li>
                <li>
                <a href="/staff/find">Staff</a>
                </li>
            </ul>
        </div>
    </header>
  );
}

export default Header;
