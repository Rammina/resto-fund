import "./DropdownMenu.scss";

import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";

const DropdownMenu = (props) => {
  const [menuLeft, setMenuLeft] = useState(-200);
  const [menuTop, setMenuTop] = useState(-200);

  let dropdownMenuDiv = useRef(null);

  let clickCoordsX;
  let clickCoordsY;
  // const getClassName = () => (props.className ? props.className : "");

  // updated positionMenu function
  const positionMenu = () => {
    const menu = dropdownMenuDiv.current;
    if (menu === null) return null;
    clickCoordsX = props.clientX;
    clickCoordsY = props.clientY;

    let menuWidth = menu.offsetWidth + 10;
    let menuHeight = menu.offsetHeight + 10;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    if (windowWidth - clickCoordsX < menuWidth) {
      setMenuLeft(windowWidth - menuWidth);
    } else {
      setMenuLeft(clickCoordsX);
    }

    if (windowHeight - clickCoordsY < menuHeight) {
      setMenuTop(windowHeight - menuHeight);
    } else {
      setMenuTop(clickCoordsY);
    }
  };

  const handleClick = function (e) {
    console.log(e.target);
    if (dropdownMenuDiv && !dropdownMenuDiv.current.contains(e.target)) {
      console.log("clicking outside DropdownMenu");
      if (props.onClose) props.onClose();
    }
  };

  const handleResize = () => {
    if (props.onClose) props.onClose();
  };

  useEffect(() => {
    dropdownMenuDiv.current.focus();
    document.body.addEventListener("click", handleClick);
    document.body.addEventListener("contextmenu", handleClick);
    window.addEventListener("resize", handleResize);
    // clean up function
    return () => {
      document.body.removeEventListener("click", handleClick);
      document.body.removeEventListener("contextmenu", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (dropdownMenuDiv.current === null) return null;
    positionMenu();
  }, [dropdownMenuDiv.current]);

  const menuOnMouseEnterHandler = (e) => {
    if (props.onMouseEnterStopPropagation) e.stopPropagation();
  };

  const content = (
    <div
      className={`dropdown__outer-div ${props.className || ""}`}
      onMouseEnter={menuOnMouseEnterHandler}
    >
      <div
        className={`dropdown__middle-div ${props.className || ""}`}
        onMouseEnter={menuOnMouseEnterHandler}
        style={
          // it is either custom style or based on click/hover event
          props.style || {
            left: `${menuLeft || 0}px`,
            top: `${menuTop || 0}px`,
          }
        }
        tabIndex="0"
        ref={dropdownMenuDiv}
        autoFocus={true}
      >
        <ul
          className={`dropdown__ul ${props.className || ""}`}
          onMouseEnter={menuOnMouseEnterHandler}
        >
          {props.children}
        </ul>
      </div>
    </div>
  );

  // normal rendering without portal
  if (props.noReactPortal) {
    return content;
  }
  // rendering via portal
  return ReactDOM.createPortal(
    content,
    document.getElementById("dropdown-menu")
  );
};
export default DropdownMenu;
