import CloseIconImg from "../../../assets/icons/close-icon.png";
import "./CloseButton.scss";

import React, { useEffect } from "react";

const CloseButton = (props) => {
  useEffect(() => {
    // code to run on first render
  }, []);

  const onClickHandler = (e) => {
    if (props.onClickHandler) {
      props.onClickHandler(e);
    }
  };

  const getButtonId = () => (props.buttonId ? props.buttonId : "");
  const getImageId = () => (props.imageId ? props.imageId : "");
  const getHideOnMobileClass = () =>
    props.hideOnMobile ? "hide-on-mobile" : "";
  const getHideOnDesktopClass = () =>
    props.hideOnDesktop ? "hide-on-desktop" : "";

  const renderButtonLabel = () =>
    props.buttonLabel ? props.buttonLabel : null;

  return (
    <React.Fragment>
      <div
        className={`close-button-container ${
          props.className || ""
        } ${getHideOnMobileClass()} ${getHideOnDesktopClass()}`}
      >
        <button
          className={`close-button ${
            props.className || ""
          } ${getHideOnMobileClass()} ${getHideOnDesktopClass()}`}
          id={`${getButtonId()}`}
          onClick={onClickHandler}
          type="button"
          onKeyDown={(e) => {
            if (e.shiftKey && e.key === "Tab") {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <img
            id={`${getImageId()}`}
            className={`close-icon-img ${props.className || ""}`}
            src={CloseIconImg}
            alt="X Icon"
          />
        </button>
        {renderButtonLabel()}
      </div>
    </React.Fragment>
  );
};

export default CloseButton;
