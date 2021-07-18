import React, { useState, useEffect } from "react";

import BackButton from "../../../components/UIComponents/buttons/BackButton";
import ProjectItem from "../../../components/ProjectItem/ProjectItem";
import "./Payout.scss";

const Payout = ({ onClose }) => {
  return (
    <>
      <section className="dashboard__content">
        <div className="dashboard-content__header">
          <BackButton
            className="dashboard-content"
            hideOnDesktop={true}
            onClickHandler={onClose}
          />

          <h1 className="dashboard-content__heading">Fundraiser Payout</h1>
        </div>
        <section className="dashboard-content__section">
          <p className="dashboard-content__p">
            If you would like to receive payment for the donations of your
            fundraising projects, please email us at{" "}
            <strong>payout@restofund.com</strong>. <br />
            <br /> We will handle your payout manually within two business days.
            Thank you!
          </p>
        </section>
      </section>
    </>
  );
};

export default Payout;
