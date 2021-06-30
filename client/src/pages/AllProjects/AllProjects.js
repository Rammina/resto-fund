import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import Header from "../../components/Header/Header";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import { getAllProjects } from "../../redux/actions/projectsActions";
import "./AllProjects.scss";

const AllProjects = (props) => {
  const dispatch = useDispatch();
  // state variables
  const projects = useSelector((state) => state.allProjects);
  const user = useSelector((state) => state.user.info);

  const getAllProjectsHandler = () => {
    dispatch(getAllProjects());
  };

  // retrieve all projects after the component renders
  useEffect(() => {
    getAllProjectsHandler();
  }, []);

  return (
    <main className="all-projects page-container">
      <section
        className="all-projects__section"
        id="all-projects__projects-list-section"
      >
        <h1 className="all-projects__heading">All Fundraising Projects</h1>
        <hr className="hr" />
        <ul className="all-projects__items">
          {projects.map((project, index) => (
            <li className="all-projects__item" key={project.id || index}>
              <ProjectItem project={project} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default AllProjects;
