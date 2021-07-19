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
// Photo by Katerina Holmes from Pexels
import ChineseCookDesktopImg from "../../assets/images/chinese-cook-desk.png";
import ChineseCookMobileImg from "../../assets/images/chinese-cook-mob.png";

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import CreateProjectButton from "../../components/UIComponents/buttons/CreateProjectButton/CreateProjectButton";
import CallToActionSection from "../../components/CallToActionSection/CallToActionSection";
import { WindowContext } from "../../AppContext";
import { getProjectList } from "../../redux/actions/projectsActions";
import { actionShowLoader } from "../../redux/actions/loaderActions";
import { CLEAR_PROJECT_LIST } from "../../redux/actions/types";

import "./Home.scss";

const Home = () => {
  // const { isNonMobileWidth, isNonMobileHeight } = useContext(WindowContext);
  const dispatch = useDispatch();
  // redux store variables
  const projects = useSelector((state) => state.allProjects);
  const user = useSelector((state) => state.user.info);
  // context
  const { isLaptopWidth, isLaptopHeight } = useContext(WindowContext);

  const getProjectListHandler = () => {
    // place a limit of 3 projects only because homepage doesn't need all of them listed
    dispatch(getProjectList({ limit: 3 }));
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

  const getChineseCookImage = () => {
    //TODO: change this to something like is laptop width
    return isLaptopWidth ? ChineseCookDesktopImg : ChineseCookMobileImg;
  };

  return (
    <main className="home page-container">
      {/*hero section*/}
      <section id="home__hero-section" className="home__section">
        <svg
          id="home__hero-waves"
          viewBox="0 0 1900 600"
          // this is necessary to make sure that the SVG content adheres to the size of the container
          preserveAspectRatio="xMidYMin slice"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <path
            d="M919 0L760 600L0 600L0 0Z"
            fill="#141c1fee"
            stroke-linecap="round"
            stroke-linejoin="miter"
          ></path>
        </svg>
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
            {projects.length < 1 ? (
              <h2 id="projects-loader__text" className="home__heading">
                Loading fundraisers...
              </h2>
            ) : (
              projects.map((project, index) => (
                <li className="home__item" key={project.id || index}>
                  <ProjectItem project={project} />
                </li>
              ))
            )}
          </ul>
          <Link
            to={`/fundraisers`}
            className="home__link"
            id="home__projects-link"
          >
            View a list of all fundraisers >>
          </Link>
        </div>
      </section>
      {/*Testimonials section*/}
      <section className="home__section">
        <div className="home__section-content">
          <h2 className="home__heading">User Stories</h2>
          <hr className="hr" />
          <div class="home__div--flex">
            <img
              class="home__flex-image"
              src={getChineseCookImage()}
              alt="user story Image"
            />
            <div class="home__div--text">
              <h3 className="home__subheading">What Jam said...</h3>
              <p className="home__p italicized">
                "I always wanted to establish my own Chinese restaurant ever
                since I was a little kid, but I had no money throughout my life.
                Thankfully, RestoFund gave me hope and helped me establish a
                successful fundraiser."
              </p>
              <p className="home__p">
                Jam raised $140k to help fund her dream Chinese restaurant.
              </p>
            </div>
          </div>
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

      <CallToActionSection
        headingText="Interested in fundraising?"
        paragraphText=""
        className="alternate-bg"
        // style={{background-color: ;}}
        actionButton={
          <CreateProjectButton
            text="Start a Fundraiser"
            className="cta-section cta-section__fundraising-button"
            isMobile={false}
          />
        }
      />
    </main>
  );
};

export default Home;

/* value section
<section className="home__section">  <div className="home__section-content"></div></section>
*/
