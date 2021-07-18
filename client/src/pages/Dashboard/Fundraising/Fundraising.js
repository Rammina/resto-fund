import React, { useState, useEffect, useContext } from "react";
import BackButton from "../../../components/UIComponents/buttons/BackButton";
import ProjectItem from "../../../components/ProjectItem/ProjectItem";

import CreateProjectButton from "../../../components/UIComponents/buttons/CreateProjectButton/CreateProjectButton";
import CreateProjectForm from "../../../components/forms/project/CreateProject/CreateProject";
import { WindowContext } from "../../../AppContext";
import history from "../../../history";
import "./Fundraising.scss";

const Fundraising = ({ user, projects, onClose }) => {
  const [isCreateProjectModalShown, setIsCreateProjectModalShown] =
    useState(false);
  const { isNonMobileWidth, isNonMobileHeight } = useContext(WindowContext);

  useEffect(() => {
    history.push("/dashboard/fundraising"); /*return () => {}*/
  }, []);

  const createProjectModalOnOpenHandler = () => {
    setIsCreateProjectModalShown(true);
  };

  const createProjectModalOnCloseHandler = () => {
    setIsCreateProjectModalShown(false);
  };
  const renderMobileCreateButton = () => {
    if (isNonMobileWidth) return null;
    return <CreateProjectButton className="dashboard" isMobile={true} />;
  };

  const renderDesktopCreateButton = () => {
    if (!isNonMobileWidth) return null;
    return <CreateProjectButton className="dashboard" isMobile={false} />;
  };

  const renderCreateProjectModal = () => {
    if (!isCreateProjectModalShown) return null;

    return (
      <CreateProjectForm onModalClose={createProjectModalOnCloseHandler} />
    );
  };

  const renderProjects = () => {
    if (!user.id)
      return (
        <ul className="dashboard-projects__items">
          <h2 className="dashboard-projects__h2">Loading Projects...</h2>
        </ul>
      );
    if (projects.length < 1)
      return (
        <ul className="dashboard-projects__items">
          <h2 className="dashboard-projects__h2">
            You currently have no fundraising projects.{" "}
            <span
              className="dashboard-projects__clickable-text"
              onClick={createProjectModalOnOpenHandler}
            >
              Start a fundraiser now!
            </span>
          </h2>
        </ul>
      );
    return (
      <ul className="dashboard-projects__items">
        {projects.map((project, index) => (
          <li className="dashboard-projects__item" key={project.id || index}>
            <ProjectItem project={project} className="dashboard" />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {renderMobileCreateButton()}
      {renderCreateProjectModal()}
      <section className="dashboard__content">
        <div className="dashboard-content__header">
          <BackButton
            className="dashboard-content"
            hideOnDesktop={true}
            onClickHandler={onClose}
          />

          <h1 className="dashboard-content__heading fundraising">
            My Fundraising Projects
          </h1>
          {renderDesktopCreateButton()}
        </div>
        <section className="dashboard-content__section">
          {renderProjects()}
        </section>
      </section>
    </>
  );
};

export default Fundraising;
