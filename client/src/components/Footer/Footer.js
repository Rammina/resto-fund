import React from "react";

import "./Footer.scss";

const Footer = ({}) => {
  return (
    <footer className="footer">
      <section class="footer__section--flex">
        <div class="footer__div--half">
          <h2 className="footer__heading">RestoFund</h2>
          <div class="footer__div--flex">
            <div id="footer__image-div" class="footer__div--half"></div>
            <div id="footer__social-media-div" class="footer__div--half"></div>
          </div>
        </div>
        <div class="footer__div--half"></div>
      </section>
    </footer>
  );
};

export default Footer;
