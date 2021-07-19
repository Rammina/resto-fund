import DonationImage from "../../assets/icons/donation.png";
import SupportImage from "../../assets/icons/support.png";
import MoneyImage from "../../assets/icons/money.png";

import React, { useState, useEffect, useContext } from "react";
import { Link, Route, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Fundraising from "./Fundraising/Fundraising";
import Donations from "./Donations/Donations";
import Payout from "./Payout/Payout";
import history from "../../history";
import { getAllUserProjects } from "../../redux/actions/projectsActions";
import { WindowContext } from "../../AppContext";
import "./Dashboard.scss";

const Dashboard = ({ getAllUserProjects, user, userProjects }) => {
  const { isNonMobileWidth, isNonMobileHeight } = useContext(WindowContext);
  const location = useLocation();

  //TODO:  this needs reworking
  /*
  const resizeHandler = () => {
    if (isNonMobileWidth && !(showDonationsSection || showPayoutSection))
      setShowFundraisingSection(true);
  };


  useEffect(() => {
    resizeHandler();
    // automatically show the fundraising section when it is on non-mobile screen size
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isNonMobileWidth]);
  */

  const getProjectListHandler = () => {
    //add a guard to prevent errors if user is not loaded yet
    if (!user || !user.id) return null;
    console.log(getAllUserProjects);
    getAllUserProjects(user.id);
  };

  // run this only after rendering the component and after user is loaded
  useEffect(() => {
    getProjectListHandler();
  }, [user]);

  // class name manipulation / listeners
  const getFundraisingActiveClass = () =>
    location.pathname.includes("/fundraising") ? "active" : "";
  const getDonationsActiveClass = () =>
    location.pathname.includes("/donations") ? "active" : "";
  const getPayoutActiveClass = () =>
    location.pathname.includes("/payout") ? "active" : "";

  // event handlers
  const backToDashboardHandler = () => {
    history.push("/dashboard");
  };

  const renderPayoutSection = () => {
    return (
      <Route path="/dashboard/payout" exact>
        <Payout onClose={backToDashboardHandler} />
      </Route>
    );
  };

  const renderFundraisingSection = () => {
    // do not automatically display this on the dashboard link when in Mobile width
    if (!isNonMobileWidth)
      return (
        <Route path="/dashboard/fundraising" exact>
          <Fundraising
            user={user}
            projects={userProjects.owned}
            onClose={backToDashboardHandler}
          />
        </Route>
      );
    return (
      <Route path={["/dashboard", "/dashboard/fundraising"]} exact>
        <Fundraising
          user={user}
          projects={userProjects.owned}
          onClose={backToDashboardHandler}
        />
      </Route>
    );
  };
  const renderDonationsSection = () => {
    return (
      <Route path="/dashboard/donations" exact>
        <Donations
          user={user}
          projects={userProjects.supported}
          onClose={backToDashboardHandler}
        />
      </Route>
    );
  };

  return (
    <>
      <main className="dashboard page-container">
        <div className="dashboard__flex-outer-container">
          <section className="dashboard__menu-container">
            <ul className="dashboard__menu-items">
              <Link
                to="/dashboard/fundraising"
                className={`dashboard__menu-button ${getFundraisingActiveClass()}`}
              >
                <li
                  className={`dashboard__menu-item ${getFundraisingActiveClass()}`}
                >
                  <img
                    className="dashboard__menu-img"
                    src={SupportImage}
                    alt="support icon"
                  />
                  <span>Fundraising</span>
                </li>
              </Link>
              <Link
                to="/dashboard/donations"
                className={`dashboard__menu-button ${getDonationsActiveClass()}`}
              >
                <li
                  className={`dashboard__menu-item ${getDonationsActiveClass()}`}
                >
                  <img
                    className="dashboard__menu-img"
                    src={DonationImage}
                    alt="donation icon"
                  />
                  <span>Donations</span>
                </li>
              </Link>
              <Link
                to="/dashboard/payout"
                className={`dashboard__menu-button ${getPayoutActiveClass()}`}
              >
                <li
                  className={`dashboard__menu-item ${getPayoutActiveClass()}`}
                >
                  <img
                    className="dashboard__menu-img"
                    src={MoneyImage}
                    alt="money icon"
                  />
                  <span>Payout</span>
                </li>
              </Link>
            </ul>
          </section>
          {renderPayoutSection()}
          {renderFundraisingSection()}
          {renderDonationsSection()}
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
  user: state.user.info,
  userProjects: state.userProjects,
});

export default connect(mapStateToProps, { getAllUserProjects })(Dashboard);
