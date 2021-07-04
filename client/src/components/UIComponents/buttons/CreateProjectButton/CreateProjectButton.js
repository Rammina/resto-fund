import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CreateProjectForm from "../../../forms/project/CreateProject/CreateProject";
import history from "../../../../history";

import "./CreateProjectButton.scss";

const CreateProjectButton = (props) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const user = useSelector((state) => state.user.info);
  useEffect(() => {
    // code to run on first render
  }, []);

  const onClickHandler = () => {
    // guard against unauthorized users
    if (!user || !user.id) {
      history.push("/register");
    }
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
        onClick={onClickHandler}
        type="button"
      >
        {props.text || "Create Fundraiser"}
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
