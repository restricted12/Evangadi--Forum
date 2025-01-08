import React from "react";
import { IoLogoInstagram, IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import Logo from "../Materials/6374ca8b-46fd-49d1-aa65-6015f32f93a9.png";
import { Link } from "react-router-dom";
import "../pages.css/footer.css";

export default function Footer() {
  return (
    <footer className="container-fluid text-white py-4" style={{ backgroundColor: "rgb(59,69,90)" }}>
      <div className="container" style={{ backgroundColor: "rgb(59,69,90)" }}>
        <div className="row text-center text-md-start py-4">
          {/* Logo Section */}
          <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center mb-4 mb-md-0">
            <Link to="/home">
              <img src={Logo} alt="Logo" className="img-fluid" style={{ maxWidth: "150px" }} />
            </Link>
            <div className="social-icons mt-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaFacebook size={30} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <IoLogoInstagram size={30} />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <IoLogoYoutube size={30} />
              </a>
            </div>
          </div>

          {/* Navigation and Contact Sections */}
          <div className="col-12 col-md-6">
            <div className="row">
              {/* Useful Links */}
              <div className="col-12 col-sm-6 mb-3">
                <h5>Useful Links</h5>
                <ul className="list-unstyled">
                  <li><Link to="#how-it-works" className="text-white text-decoration-none">How it works</Link></li>
                  <li><Link to="#terms" className="text-white text-decoration-none">Terms of Services</Link></li>
                  <li><Link to="#privacy" className="text-white text-decoration-none">Privacy Policy</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="col-12 col-sm-6">
                <h5>Contact Info</h5>
                <ul className="list-unstyled">
                  <li className="text-white">Evangadi Networks</li>
                  <li><Link to="mailto:support@evangadi.com" className="text-white text-decoration-none">Support@evangadi.com</Link></li>
                  <li><Link to="tel:+12023867287" className="text-white text-decoration-none">+1-202-386-7287</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
