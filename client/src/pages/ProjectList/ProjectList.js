import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import { CLEAR_PROJECT_LIST } from "../../redux/actions/types";
import { getProjectList } from "../../redux/actions/projectsActions";
import { actionShowLoader } from "../../redux/actions/loaderActions";
import "./ProjectList.scss";

const ProjectList = (props) => {
  const dispatch = useDispatch();
  // state variables
  const projects = useSelector((state) => state.allProjects);
  const user = useSelector((state) => state.user.info);
  const location = useLocation();

  const getProjectListHandler = () => {
    const { sort, filter, limit } = queryString.parse(location.search);
    //TODO: make sure it provides the correct results depending on sort and filter query strings
    // dispatch();
    dispatch(getProjectList({ sort, filter, limit }));
  };

  const unmountProjectListHandler = () => {
    dispatch({ type: CLEAR_PROJECT_LIST });
  };

  // retrieve all projects after the component renders
  useEffect(() => {
    getProjectListHandler();
    return () => {
      unmountProjectListHandler();
    };
  }, []);

  const renderMainHeading = () => {
    const { sort, filter } = queryString.parse(location.search);

    if (sort === "amount_donated" && !filter) return "Top Fundraising Projects";
    else if (sort === "created") return "New Fundraising Projects";
    else if (sort === "amount_donated" && filter === "finished")
      return "Finished Fundraising Projects";
    return "All Fundraising Projects";
  };

  return (
    <main className="projectslist-page page-container">
      <section
        className="projectslist-page__section"
        id="projectslist-page__projects-list-section"
      >
        <h1 className="projectslist-page__heading">{renderMainHeading()}</h1>
        <hr className="hr" />
        <p className="projectslist-page__p">
          Compassionate people all over the globe are raising funds for
          restaurants they care about.
        </p>
        <ul className="projectslist-page__items">
          {projects.length < 1 ? (
            <h2
              id="projectslist-page__loader-heading"
              className="projectslist-page__heading"
            >
              Loading fundraisers...
            </h2>
          ) : (
            projects.map((project, index) => (
              <li className="projectslist-page__item" key={project.id || index}>
                <ProjectItem project={project} />
              </li>
            ))
          )}{" "}
        </ul>
      </section>
    </main>
  );
};

export default ProjectList;
