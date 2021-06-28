import "./AuthLoader.scss";

import React, { useState, useEffect } from "react";

import LoadingSpinner from "../loaders/LoadingSpinner";

const AuthLoader = (props) => {
  // trigger CSS changes to change opacity
  const [fadeLoader, setFadeLoader] = useState(false);
  // handle rendering
  const [renderComponent, setRenderComponent] = useState(false);

  const handleLoadingStateChanges = () => {
    if (props.isLoadingUser) {
      console.log("render the loader");
      setFadeLoader(false);
      setRenderComponent(true);
    } else {
      console.log("fade the loader");
      setFadeLoader(true);
      setTimeout(() => {
        console.log("do not render the loader");
        setRenderComponent(false);
      }, 300);
    }
  };

  useEffect(() => {
    handleLoadingStateChanges();
  }, [props.isLoadingUser]);

  const getLoaderContainerClass = () => (fadeLoader ? "hide" : "");

  const renderLoader = () => {
    return <LoadingSpinner className="auth-loader" showLoader={true} />;
  };

  return !renderComponent ? null : (
    <div
      id="auth-loader-outer-container"
      className={`${getLoaderContainerClass()}`}
    >
      <div id={`auth-loader-inner-container`}>
        {renderLoader()}
        <span id="auth-loader-text"> Initializing</span>
      </div>
    </div>
  );
};

export default AuthLoader;
