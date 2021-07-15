import HamburgerImage from "../../../assets/icons/hamburger.png";

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePicture from "../../UIComponents/ProfilePicture/ProfilePicture";
import DropdownMenu from "../../UIComponents/DropdownMenu/DropdownMenu";
import GoogleAuth from "../../../components/GoogleAuth/GoogleAuth";
import CloseButton from "../../UIComponents/buttons/CloseButton";
import { WindowContext } from "../../../AppContext";
import "./NavMenu.scss";

const NavMenu = (props) => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const user = useSelector((state) => state.user.info);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showUserDropdownMenu, setShowUserDropdownMenu] = useState(false);
  const [showFundraisersDropdownMenu, setShowFundraisersDropdownMenu] =
    useState(false);
  const { isNonMobileWidth, isNonMobileHeight } = useContext(WindowContext);

  const getNavMenuClass = () => (showNavMenu ? "show" : "hide");
  const getUserProfilePictureClass = () =>
    showUserDropdownMenu ? "active" : "";

  // event handler functions
  const navmenuOnOpenHandler = () => {
    setShowNavMenu(true);
  };

  const navmenuOnCloseHandler = () => {
    setShowNavMenu(false);
  };

  const userProfilePictureonClickHandler = (e) => {
    e.stopPropagation();
    if (!showUserDropdownMenu) setShowUserDropdownMenu(true);
    else setShowUserDropdownMenu(false);
  };

  const userDropdownMenuOnCloseHandler = () => {
    setShowUserDropdownMenu(false);
  };

  const renderFundraisersDropdownMenu = () => {
    if (!showFundraisersDropdownMenu) return null;
    return (
      <DropdownMenu
        style={{ position: "absolute", top: "3.6rem", minWidth: "12rem" }}
      >
        <Link to={`/fundraisers`} className="dropdown__button">
          All fundraisers
        </Link>
        <Link
          to={`/fundraisers?sort=amount_donated`}
          className="dropdown__button"
        >
          Top fundraisers
        </Link>
        <Link to={`/fundraisers?sort=created`} className="dropdown__button">
          New fundraisers
        </Link>
        <Link
          to={`/fundraisers?filter=finished&sort=amount_donated`}
          className="dropdown__button"
        >
          Finished fundraisers
        </Link>
      </DropdownMenu>
    );
  };

  const renderUserDropdownMenu = () => {
    if (!showUserDropdownMenu) return null;
    return (
      <DropdownMenu
        style={{ right: "1rem", top: "3.6rem", minWidth: "12rem" }}
        onClose={userDropdownMenuOnCloseHandler}
      >
        <div class="dropdown__item--flex" id="dropdown__profile">
          <div class="dropdown__img-div">
            <ProfilePicture className="user-dropdown" />
          </div>
          <div class="dropdown__text-div">
            <h4 className="dropdown__user">{user && user.username}</h4>
          </div>
        </div>
        {/*<Link to={`/dashboard/profile`} className="dropdown__button">
          Your profile
        </Link>*/}
        <Link to={`/dashboard/fundraising`} className="dropdown__button">
          Your fundraisers
        </Link>
        <Link to={`/dashboard/donations`} className="dropdown__button">
          Supported fundraisers
        </Link>
        <Link to={`/dashboard/payout`} className="dropdown__button">
          Payout
        </Link>
        {/*<button to={`/dashboard/`} className="dropdown__button">
          Toggle appearance: Dark
        </button>
        <Link to={`/dashboard/settings`} className="dropdown__button">
          Settings
        </Link>*/}
        <GoogleAuth
          className="dropdown__button"
          onClickHandler={userDropdownMenuOnCloseHandler}
        />
      </DropdownMenu>
    );
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
        {!isNonMobileWidth && (
          <GoogleAuth
            className="navmenu__item"
            onClickHandler={navmenuOnCloseHandler}
          />
        )}
        {isNonMobileWidth && (
          <ProfilePicture
            className={`navmenu ${getUserProfilePictureClass()}`}
            onClick={userProfilePictureonClickHandler}
          />
        )}
      </>
    );
  // render component
  return (
    <>
      {renderUserDropdownMenu()}
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
          <Link to="/fundraisers" className="navmenu__item">
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
    <Link to="/fundraisers">New  Projects</Link>
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
