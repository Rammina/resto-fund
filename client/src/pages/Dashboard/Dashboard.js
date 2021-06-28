import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Fundraising from "./Fundraising/Fundraising";
import Donations from "./Donations/Donations";
import Payout from "./Payout/Payout";

import { getAllUserProjects } from "../../redux/actions/projectsActions";
import { WindowContext } from "../../AppContext";
import "./Dashboard.scss";

const Dashboard = ({ getAllUserProjects, user, userProjects }) => {
  // should be opened by default in desktop mode
  const [showFundraisingSection, setShowFundraisingSection] = useState(false);
  const [showDonationsSection, setShowDonationsSection] = useState(false);
  const [showPayoutSection, setShowPayoutSection] = useState(false);
  const { isNonMobileWidth, isNonMobileHeight } = useContext(WindowContext);

  useEffect(() => {
    // automatically show the fundraising section when it is on non-mobile screen size
    if (isNonMobileWidth) setShowFundraisingSection(true);
  }, []);

  const getAllProjectsHandler = () => {
    //add a guard to prevent errors if user is not loaded yet
    if (!user || !user.id) return null;
    console.log(getAllUserProjects);
    getAllUserProjects(user.id);
  };

  // run this only after rendering the component and after user is loaded
  useEffect(() => {
    getAllProjectsHandler();
  }, [user]);

  const closeAllSectionsHandler = () => {
    setShowFundraisingSection(false);
    setShowDonationsSection(false);
    setShowPayoutSection(false);
  };

  const fundraisingButtonOnClickHandler = () => {
    closeAllSectionsHandler();
    setShowFundraisingSection(true);
  };
  const donationsButtonOnClickHandler = () => {
    closeAllSectionsHandler();
    setShowDonationsSection(true);
  };
  const payoutButtonOnClickHandler = () => {
    closeAllSectionsHandler();
    setShowPayoutSection(true);
  };

  const renderPayoutSection = () => {
    if (!showPayoutSection) return null;
    return <Payout onClose={closeAllSectionsHandler} />;
  };

  const renderFundraisingSection = () => {
    if (!showFundraisingSection) return null;
    return (
      <Fundraising
        user={user}
        projects={userProjects.owned}
        onClose={closeAllSectionsHandler}
      />
    );
  };
  const renderDonationsSection = () => {
    if (!showDonationsSection) return null;
    return (
      <Donations
        user={user}
        projects={userProjects.supported}
        onClose={closeAllSectionsHandler}
      />
    );
  };

  return (
    <>
      <main className="dashboard page-container">
        <div className="dashboard__flex-outer-container">
          <section className="dashboard__menu-container">
            <ul className="dashboard__menu-items">
              <button
                className="dashboard__menu-button"
                onClick={fundraisingButtonOnClickHandler}
              >
                <li className="dashboard__menu-item">Fundraising</li>
              </button>
              <button
                className="dashboard__menu-button"
                onClick={donationsButtonOnClickHandler}
              >
                <li className="dashboard__menu-item">Donations</li>
              </button>
              {/*note: if there is not enough time this can be removed */}
              <button
                className="dashboard__menu-button"
                onClick={payoutButtonOnClickHandler}
              >
                <li className="dashboard__menu-item">Payout</li>
              </button>
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
