import SupportImage from "../../assets/icons/support.png";
import GiftImage from "../../assets/images/gift.svg";
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
import FacebookImage from "../../assets/icons/facebook.png";
import TwitterImage from "../../assets/icons/twitter.png";
import InstagramImage from "../../assets/icons/instagram.png";
import LinkedInImage from "../../assets/icons/linkedin.png";

import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";

const Footer = ({}) => {
  return (
    <footer className="footer">
      <section class="footer__section--flex">
        {/*left side - title and social media*/}
        <div class="footer__div--half">
          <div id="footer__div--title">
            <img
              class="footer__image--title"
              src={SupportImage}
              alt="hands holding a heart image"
            />
            <h2 className="footer__heading">RestoFund</h2>
          </div>
          <div class="footer__div--flex">
            <div id="footer__image-div" class="footer__div--half">
              <img
                class="footer__image--large"
                src={GiftImage}
                alt="gift image"
              />
            </div>
            <div id="footer__social-media-div" class="footer__div--half">
              <h3 className="footer__subheading">Follow us on</h3>
              <div class="footer__div--links">
                <Link class="footer__link--social" to="#">
                  <img
                    class="footer__image--button"
                    src={FacebookImage}
                    alt="Facebook image"
                  />
                </Link>
                <Link class="footer__link--social" to="#">
                  <img
                    class="footer__image--button"
                    src={TwitterImage}
                    alt="Twitter image"
                  />
                </Link>
                <Link class="footer__link--social" to="#">
                  <img
                    class="footer__image--button"
                    src={InstagramImage}
                    alt="Instagram image"
                  />
                </Link>
                <Link class="footer__link--social" to="#">
                  <img
                    id="linkedin-icon"
                    class="footer__image--button"
                    src={LinkedInImage}
                    alt="LinkedIn image"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/*right side -  links*/}
        <div class="footer__div--half">
          <ul className="footer__links">
            <Link to="/" className="footer__link">
              Home
            </Link>
            <Link to="/fundraisers" className="footer__link">
              Fundraisers
            </Link>
            <Link to="/login" className="footer__link">
              Login
            </Link>
            <Link to="/register" className="footer__link">
              Register
            </Link>
            <Link to="#" className="footer__link">
              About Us
            </Link>
            <Link to="#" className="footer__link">
              Terms of Use
            </Link>
            <Link to="#" className="footer__link">
              Cookie Policy
            </Link>
            <Link to="#" className="footer__link">
              Privacy Policy
            </Link>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
