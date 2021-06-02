import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../../redux/actions/projectsActions";
import { CLOSE_PROJECT } from "../../redux/actions/types";
import history from "../../history";
import DeleteProject from "../../components/forms/project/DeleteProject/DeleteProject";
import DonateForm from "../../components/forms/project/DonateForm/DonateForm";
import "./Project.scss";

const Project = (props) => {
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [showDonateForm, setShowDonateForm] = useState(false);
  // redux store variables
  const user = useSelector((state) => state.user.info);
  const project = useSelector((state) => state.selectedProject);
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const getProjectHandler = () => {
    dispatch(getProject(projectId));
  };

  const unmountProjectHandler = () => {
    dispatch({ type: CLOSE_PROJECT });
  };

  // retrieve the project from the database once after the component renders
  useEffect(() => {
    getProjectHandler();
    // this is a cleanup function when component is unmounted
    return () => {
      unmountProjectHandler();
    };
  }, []);

  const deleteProjectOnOpenHandler = () => {
    setShowDeleteProject(true);
  };

  const deleteProjectOnCloseHandler = (e) => {
    setShowDeleteProject(false);
  };

  const donateButtonOnClickHandler = () => {
    setShowDonateForm(true);
  };

  const renderDeleteProject = () => {
    if (!showDeleteProject) return null;
    const onDeleteSuccessCb = () => {
      history.push("/dashboard");
    };
    return (
      <DeleteProject
        project={project}
        onClose={deleteProjectOnCloseHandler}
        onSuccessCb={onDeleteSuccessCb}
      />
    );
  };

  const renderDonorActionButtons = () => {
    // do not show these buttons if user is the creator
    if (user && project.creator && user.id == project.creator.id) return null;
    return (
      <>
        <button className="project btn" onClick={donateButtonOnClickHandler}>
          Donate
        </button>
      </>
    );
  };

  const renderCreatorActionButtons = () => {
    // only show these buttons if user is the creator
    if (!(user && project.creator && user.id == project.creator.id))
      return null;
    return (
      <>
        <button className="project__action-button">Edit Project</button>
        <button
          className="project__action-button danger"
          onClick={deleteProjectOnOpenHandler}
        >
          Delete Project
        </button>
      </>
    );
  };

  // conditionally render action buttons depending on whether donate form is shown
  const renderActionButtons = () => {
    if (showDonateForm) return null;
    return (
      <div className="project__actions-container">
        {renderDonorActionButtons()}
        {renderCreatorActionButtons()}
      </div>
    );
  };

  //conditionally render the donate form only after clicking the donate buttons
  const renderDonateForm = () => {
    if (!showDonateForm) return null;
    return <DonateForm project={project} />;
  };

  // component render
  return (
    <>
      {renderDeleteProject()}
      <div className="project__page-container">
        <div className="project__details-container">
          <h1>Let's help Green Delight after lockdown</h1>

          <div className="project__details-card">
            {/* <div>Image: </div>*/}

            <h2>Project Name: {project.name}</h2>
            <p>Description: {project.description}</p>
            <p>Amount Donated So Far: {project.amount_donated}</p>
            <p>Target Goal: {project.target_goal}</p>
          </div>
        </div>
        {renderActionButtons()}
        {renderDonateForm()}
      </div>
    </>
  );
};

export default Project;
