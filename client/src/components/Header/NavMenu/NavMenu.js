import HamburgerImage from "../../../assets/icons/hamburger.png";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GoogleAuth from "../../../components/GoogleAuth/GoogleAuth";
import CloseButton from "../../UIComponents/buttons/CloseButton";

import "./NavMenu.scss";

const NavMenu = (props) => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const [showNavMenu, setShowNavMenu] = useState(false);
  /*
  // change classes for hamburger and items when past mobile width
  const resizeHandler = () => {
    if (window.innerWidth >= 768) {
      setShowNavMenu(true);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
*/

  const getNavMenuClass = () => (showNavMenu ? "show" : "hide");

  // event handler functions
  const navmenuOnOpenHandler = () => {
    setShowNavMenu(true);
  };

  const navmenuOnCloseHandler = () => {
    setShowNavMenu(false);
  };

  // renderConditionalItems
  const renderConditionalItems = () =>
    !isSignedIn ? (
      <Link to="/login" className="navmenu__item">
        Login
      </Link>
    ) : (
      <>
        {/*only allow access to dashboard & logout if user is signed in*/}
        <Link to="/dashboard" className="navmenu__item">
          Dashboard
        </Link>{" "}
        <GoogleAuth className="navmenu__item" />
      </>
    );
  // render component
  return (
    <>
      {/*hamburger*/}
      <button
        className="navmenu__button"
        id="navmenu__hamburger"
        onClick={navmenuOnOpenHandler}
      >
        <img
          className=""
          id="navmenu__hamburger-image"
          src={HamburgerImage}
          alt="hamburger icon"
        />
      </button>
      {/*navmenu container &items*/}
      <div
        class={`navmenu__backdrop backdrop mobile-only ${getNavMenuClass()}`}
        onClick={navmenuOnCloseHandler}
      ></div>
      <div className={`navmenu__outer-container ${getNavMenuClass()}`}>
        <div className="navmenu__title-close-container">
          <Link to="/" id="navmenu__title-link">
            RestoFund
          </Link>
          <CloseButton
            hideOnDesktop={true}
            className="navmenu__close"
            onClickHandler={navmenuOnCloseHandler}
          />
        </div>
        <ul className="navmenu__items">
          <Link to="/" className="navmenu__item">
            Home
          </Link>
          <Link to="/allprojects" className="navmenu__item">
            Fundraisers
          </Link>
          {renderConditionalItems()}
        </ul>
      </div>
    </>
  );
};

export default NavMenu;

/*
<div className={toggleHeader}>
  <p className={toggleIcon} onClick={handleClose}>
    X
  </p>
  <section className="nav">
    <Link to="/allprojects">All Projects</Link>
    {!isSignedIn ?
    <Link to="/login">Login</Link> : null}
    {isSignedIn ? (
      <>
        <Link to="/dashboard">Dashboard</Link>{" "}
        <GoogleAuth className="user-nav__link" />
      </>
    ) : null}
  </section>
</div>
*/
