import React from "react";
import "./footer.css"

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
          <div className="row">
            <div className="footer-col">
              <h4>Address</h4>
              <ul>
                <li>
                  <Link to="/">Sgt University gurugram</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Phone</h4>
              <ul>
                <li>
                  <Link to="/">+123-456-7890</Link>
                </li>
              </ul>
            </div>
          </div>
      </footer>
    </>
  );
};

export default Footer;
