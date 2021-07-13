import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../../components/UIComponents/buttons/BackButton";
import ProjectItem from "../../../components/ProjectItem/ProjectItem";
import "./Donations.scss";

const Donations = ({ user, projects, onClose }) => {
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
            You have not yet supported any fundraising projects.<br></br> Check
            out our{" "}
            <Link
              to={`/fundraisers`}
              className="dashboard-projects__clickable-text"
            >
              list of fundraising projects
            </Link>{" "}
            and support a cause!
          </h2>
        </ul>
      );
    return (
      <ul className="dashboard-projects__items">
        {projects.map((project, index) => (
          <li className="dashboard-projects__item" key={project.id || index}>
            <ProjectItem project={project} className="dashboard" />
          </li>
        ))}{" "}
      </ul>
    );
  };

  return (
    <>
      <section className="dashboard__content">
        <div className="dashboard-content__header">
          <BackButton
            className="dashboard-content"
            hideOnDesktop={true}
            onClickHandler={onClose}
          />

          <h1 className="dashboard-content__heading">
            Supported Fundraising Projects
          </h1>
        </div>
        <section className="dashboard-content__section">
          {renderProjects()}
        </section>
      </section>
    </>
  );
};

export default Donations;
