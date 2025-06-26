import React, { useRef } from "react";
import navCss from "./../nav/Nav.module.css";
import { Link } from "react-router-dom";
import nav_logo from "./../../assets/img/logo.png";
import Cookies from "js-cookie";

function Navbar() {
  const menu = useRef();
  const authCookie = Cookies.get("auth");

  const MenuHandler = () => {
    menu.current.classList.toggle(navCss.showMenu);
  };

  return (
    <nav className={`navbar shadow-custom fixed-top ${navCss.nav_wrapper}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center px-xl-5">
        
        {/* Logo */}
        <div className={navCss.logo}>
          <Link
            to="/"
            className="d-flex justify-content-center align-items-center gap-1"
          >
            <span className="text-uppercase">Expensio</span>
            <img src={nav_logo} alt="nav-icon" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul ref={menu} className="menu-area d-xl-flex d-none m-0 p-0">
          <li>
            <Link className={navCss.nav_item} to="/">
              home
            </Link>
          </li>
          <li>
            <Link className={navCss.nav_item} to="/about">
              about
            </Link>
          </li>
          <li>
            <Link className={navCss.nav_item} to="/services">
              services
            </Link>
          </li>
          <li>
            <Link className={navCss.nav_item} to="/contact">
              contact
            </Link>
          </li>
          <li className="d-block d-sm-none">
              <Link to={authCookie ? "/dashboard" : "/login"}>
                <button className="main-btn d-xl-inline-flex">
                  {authCookie ? "Dashboard" : "Get Started"}{" "}
                  <i className="ri-instance-line ms-0"></i>
                </button>
          </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className={`${navCss.Nav_btns} d-flex d- align-items-center`}>
          <Link to={authCookie ? "/dashboard" : "/login"}>
            <button className="nav-btn d-sm-inline-flex ">
              {authCookie ? "Dashboard" : "Get Started"}{" "}
              <i className="ri-instance-line ms-0"></i>
            </button>
          </Link>

          {/* Mobile Menu Icon */}
          <i
            className={`fas fa-bars rounded rounded-pill d-inline-flex d-xl-none ${navCss.bars}`}
            id={`${navCss.bars}`}
            onClick={MenuHandler}
          ></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
