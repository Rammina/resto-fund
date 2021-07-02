import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import CreateProjectButton from "../../components/UIComponents/buttons/CreateProjectButton/CreateProjectButton";
import { getAllProjects } from "../../redux/actions/projectsActions";

import "./Home.scss";

const Home = () => {
  // const { isNonMobileWidth, isNonMobileHeight } = useContext(WindowContext);
  const dispatch = useDispatch();
  // redux store variables
  const projects = useSelector((state) => state.allProjects);
  const user = useSelector((state) => state.user.info);

  const getAllProjectsHandler = () => {
    // place a limit of 3 projects only because homepage doesn't need all of them listed
    dispatch(getAllProjects(3));
  };

  // retrieve projects after rendering the component
  useEffect(() => {
    getAllProjectsHandler();
  }, []);

  return (
    <main class="home page-container">
      {/*hero section*/}
      <section id="home__hero-section" class="home__section">
        <div class="home__section-flex" id="home__hero-content">
          <h1 id="home__hero-heading" class="home__heading">
            Fundraising for restaurants you care about
          </h1>
          <CreateProjectButton
            id="home__hero-button"
            text="Start a Fundraiser"
            className="home home__fundraising-button"
            isMobile={false}
          />
        </div>
      </section>
      {/*projects section*/}
      <section class="home__section">
        <div class="home__section-content">
          <h2 className="home__heading">Top Fundraisers</h2>
          <hr className="hr" />
          <ul className="home__items">
            {projects.map((project, index) => (
              <li className="home__item" key={project.id || index}>
                <ProjectItem project={project} />
              </li>
            ))}
          </ul>
          <Link
            to={`/allprojects`}
            className="home__link"
            id="home__projects-link"
          >
            View a list of all fundraisers >>
          </Link>
        </div>
      </section>

      {/*prompt section*/}
      <section class="home__section">
        <div class="home__section-content">
          <h2 className="home__heading">Interested in fundraising?</h2>
          <hr className="hr" />
          <CreateProjectButton
            id="home__hero-button"
            text="Start a Fundraiser"
            className="home home__fundraising-button"
            isMobile={false}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;

/* value section
<section class="home__section">
  <div class="home__section-content"></div>
</section>
*/
