// Icons made by Smashicons from www.flaticon.com
import GlobeImg from "../../assets/icons/globe.png";
// Icons made by Smashicons from www.flaticon.com
import SettingsImg from "../../assets/icons/settings.png";
// Icons made by DinosoftLabs from www.flaticon.com
import ShieldImg from "../../assets/icons/shield.png";
// Icons made by Smashicons from www.flaticon.com
import PhoneImg from "../../assets/icons/phone.png";
// Icons made by Smashicons from www.flaticon.com
import ShareImg from "../../assets/icons/share.png";
// Icons made by Good Ware from www.flaticon.com
import CustomerServiceImg from "../../assets/icons/customer-service.png";

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
    <main className="home page-container">
      {/*hero section*/}
      <section id="home__hero-section" className="home__section">
        <div className="home__section-flex" id="home__hero-content">
          <h1 id="home__hero-heading" className="home__heading">
            Fundraising for restaurants{" "}
            <span className="hide-under-1500w">that </span>you care about
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
      <section className="home__section">
        <div className="home__section-content">
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
      {/*value section*/}

      <section className="home__section">
        <div className="home__section-content">
          <h2 className="home__heading">Leader of Restaurant Crowdfunding</h2>
          <hr className="hr" />
          <ul className="home__values-items">
            <li className="home__values-item">
              <div className="home__values-image-div">
                <img
                  className="home__values-image"
                  src={GlobeImg}
                  alt="Globe Icon"
                />
              </div>
              <div className="home__values-text-div">
                <h3 className="home__values-heading">Global-oriented</h3>
                <p className="home__values-p hide-on-mobile">
                  RestoFund enables people from across the globe to provide aid
                  to those in need.
                </p>
              </div>
            </li>
            <li className="home__values-item">
              <div className="home__values-image-div">
                <img
                  className="home__values-image"
                  src={SettingsImg}
                  alt="Settings Icon"
                />
              </div>
              <div className="home__values-text-div">
                <h3 className="home__values-heading">Easy setup</h3>
                <p className="home__values-p hide-on-mobile">
                  It doesn't take much to start a fundraiser or to donate to
                  one, RestoFund makes it easy for you.
                </p>
              </div>
            </li>
            <li className="home__values-item">
              <div className="home__values-image-div">
                <img
                  className="home__values-image"
                  src={ShieldImg}
                  alt="Shield Icon"
                />
              </div>
              <div className="home__values-text-div">
                <h3 className="home__values-heading">Highly secure</h3>
                <p className="home__values-p hide-on-mobile">
                  RestoFund ensures that both your money and data are secure
                  24/7.
                </p>
              </div>
            </li>
            <li className="home__values-item">
              <div className="home__values-image-div">
                <img
                  className="home__values-image"
                  src={PhoneImg}
                  alt="Phone Icon"
                />
              </div>
              <div className="home__values-text-div">
                <h3 className="home__values-heading">Mobile-responsive</h3>
                <p className="home__values-p hide-on-mobile">
                  Our website works on all screen sizes, you can use RestoFund
                  on your phone or desktop.
                </p>
              </div>
            </li>
            <li className="home__values-item">
              <div className="home__values-image-div">
                <img
                  className="home__values-image"
                  src={ShareImg}
                  alt="Share Icon"
                />
              </div>
              <div className="home__values-text-div">
                <h3 className="home__values-heading">Online presence</h3>
                <p className="home__values-p hide-on-mobile">
                  RestoFund enables you to share your story to and get support
                  from people online.
                </p>
              </div>
            </li>
            <li className="home__values-item">
              <div className="home__values-image-div">
                <img
                  className="home__values-image"
                  src={CustomerServiceImg}
                  alt="Customer Service Icon"
                />
              </div>
              <div className="home__values-text-div">
                <h3 className="home__values-heading">Expert support</h3>
                <p className="home__values-p hide-on-mobile">
                  Our top-notch customer service representatives will assist
                  you, around-the-clock.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/*prompt section*/}
      <section className="home__section">
        <div className="home__section-content">
          <h2 className="home__heading">Interested in fundraising?</h2>{" "}
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
<section className="home__section">  <div className="home__section-content"></div></section>
*/
