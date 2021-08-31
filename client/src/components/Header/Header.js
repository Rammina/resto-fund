import SupportImage from "../../assets/icons/support.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavMenu from "./NavMenu/NavMenu";

import "./Header.scss";

const Header = (props) => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  return (
    <header className="header">
      <section className="header__section">
        {/*page title & link to home*/}
        <div id="header__website-title-div" className="header__div">
          <Link to="/" id="header__title-link">
            <img
              id="header__title-icon"
              src={SupportImage}
              alt="Hands holding heart image"
            />
            <span>RestoFund</span>
          </Link>
        </div>
        {/*hamburger & navmenu*/}
        <div className="header__div">
          <NavMenu />
        </div>
      </section>
    </header>
  );
};

export default Header;
