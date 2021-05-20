import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import "./Dashboard.scss";

const Dashboard = () => {
  const projects = [1, 2, 3, 4, 5];
  return (
    <div>
      {/*<section className="header">
        <p>Crowdfund</p>
        <div className="header__right">
          <p>About</p>
          <p>Discover</p>
          <p>Get Started</p>
          <GoogleAuth />
        </div>
      </section>*/}
      <section className="main">
        <div className="main__left">
          <div className="main__left--info">
            <div>Settings</div>
            <div>Fundraiser</div>
            <div>Donations</div>
            <div>Payment Info</div>
          </div>
        </div>
        <div className="main__right">
          {projects.map((el) => (
            <div className="main__right--card">
              <div>Image: </div>
              <div>Text: </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
