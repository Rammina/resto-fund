import React, { useState, useEffect } from "react";
import CreateProjectForm from "../../../forms/project/CreateProject/CreateProject";

import "./CreateProjectButton.scss";

const CreateProjectButton = (props) => {
  const [isModalShown, setIsModalShown] = useState(false);
  useEffect(() => {
    // code to run on first render
  }, []);

  const onClickHandler = () => {
    setIsModalShown(true);
  };

  const onModalCloseHandler = () => {
    setIsModalShown(false);
  };

  const getClassName = () => (props.className ? props.className : "");

  const renderButton = () => {
    // render different things based on screen size
    if (props.isMobile)
      return (
        <button
          className={`btn btn--create ${getClassName()}`}
          id="create-project-button"
          onClick={onClickHandler}
          type="button"
        >
          <span style={{ position: "relative", bottom: "0.15rem" }}>+</span>
        </button>
      );
    // if on non-mobile resolution, render a different type of button
    return (
      <button
        className={`btn btn--create ${getClassName()}`}
        id="create-project-button"
        onClick={onClickHandler}
        type="button"
      >
        Create Fundraiser
      </button>
    );
  };

  const renderModal = () => {
    if (!isModalShown) return null;

    return <CreateProjectForm onModalClose={onModalCloseHandler} />;
  };

  return (
    <>
      {renderModal()}
      {renderButton()}
    </>
  );
};

export default CreateProjectButton;
