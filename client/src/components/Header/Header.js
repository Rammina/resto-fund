import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavMenu from "./NavMenu/NavMenu";

import "./Header.scss";

const Header = (props) => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  return (
    <header className="header">
      {/*page title & link to home*/}
      <div id="header__website-title" className="header__div">
        <Link to="/" id="header__title-link">
          RestoFund
        </Link>
      </div>
      {/*hamburger & navmenu*/}
      <div className="header__div">
        <NavMenu />
      </div>
    </header>
  );
};

export default Header;
