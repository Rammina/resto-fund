import DefaultProjectImg from "../../assets/images/default-project-image.jpg";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../UIComponents/Card/Card";
import Modal from "../UIComponents/Modal/Modal";
import history from "../../history";
import DeleteProject from "../forms/project/DeleteProject/DeleteProject";
import EditProject from "../forms/project/EditProject/EditProject";
import { convertDateToHtmlInputValue } from "../../helpers";
import "./ProjectItem.scss";

const ProjectItem = ({ project, className }) => {
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  // redux store variables
  const user = useSelector((state) => state.user.info);

  const getClassName = () => (className ? className : "");

  // handler functions
  const projectItemOnClickHandler = () => {
    history.push(`/projects/${project.id}`);
  };

  // event listener handlers
  const editProjectOnOpenHandler = (e) => {
    e.stopPropagation();
    setShowEditProject(true);
  };

  const editProjectOnCloseHandler = () => {
    setShowEditProject(false);
  };

  const renderEditProject = () => {
    if (!showEditProject) return null;
    return (
      <EditProject
        initialValues={{
          ...project,
          deadline: convertDateToHtmlInputValue(project.deadline),
        }}
        project={project}
        onModalClose={editProjectOnCloseHandler}
        onSuccessCb={editProjectOnCloseHandler}
      />
    );
  };

  const deleteProjectOnOpenHandler = (e) => {
    e.stopPropagation();
    setShowDeleteProject(true);
  };

  const deleteProjectOnCloseHandler = () => {
    setShowDeleteProject(false);
  };

  const renderDeleteProject = () => {
    if (!showDeleteProject) return null;
    return (
      <DeleteProject
        project={project}
        onClose={deleteProjectOnCloseHandler}
        onSuccessCb={deleteProjectOnOpenHandler}
      />
    );
  };

  const renderActionButtons = () => {
    if (
      !(user && (user.id == project.creator || user.id == project.creator.id))
    )
      return null;
    if (project.status === "failed" || project.status === "completed") {
      return (
        <button
          className="project-item__action-button danger"
          onClick={deleteProjectOnOpenHandler}
        >
          Delete
        </button>
      );
    }
    return (
      <>
        <button
          className="project-item__action-button"
          onClick={editProjectOnOpenHandler}
        >
          Edit
        </button>
        |
        <button
          className="project-item__action-button danger"
          onClick={deleteProjectOnOpenHandler}
        >
          Delete
        </button>
      </>
    );
  };

  // render
  return (
    <>
      {renderDeleteProject()}
      {renderEditProject()}
      <div
        className={`project-item ${getClassName()}`}
        onClick={projectItemOnClickHandler}
      >
        <Card className="project-item__content">
          <div className={`project-item__image ${getClassName()}}`}>
            <img
              src={project.image_url || DefaultProjectImg}
              alt="Project Image"
            />
          </div>
          <div className="project-item__info">
            <h2>{project.name}</h2>
            <progress
              className="progress-bar"
              max="100"
              value={Math.ceil(
                (project.amount_donated / project.target_goal) * 100
              )}
            ></progress>
            <h3>
              <span className="project-item__amount-donated">
                ${project.amount_donated}
              </span>{" "}
              / {project.target_goal} raised
            </h3>
          </div>
          <div className="project-item__actions">{renderActionButtons()}</div>
        </Card>
      </div>
    </>
  );
};

export default ProjectItem;
