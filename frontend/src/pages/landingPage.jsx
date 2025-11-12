import React from "react";
import "../styles/landingPage.css";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function landingPage() {
  return (
    <section className="hero-section d-flex flex-column align-items-center text-center">
      <div className="nav-box d-flex gap-4 mb-5">
        <Link to={"#"} className="nav-link-custom">
          About
        </Link>
        <Link to={"#"} className="nav-link-custom">
          Features
        </Link>
        <Link to={"#"} className="nav-link-custom">
          Connect
        </Link>
      </div>

      <p className="welcome-text mt-5">WELCOME TO MEETSPHERE</p>
      <h1 className="hero-title">
        Connecting People Through Real-Time<br></br>Video{" "}
        <span className="gradient-text">Meetings Instantly</span>
      </h1>
      <p className="subtitle">Meet. Chat. Share. Connect — instantly</p>
      <Link to={"/auth"} className="get-started-btn">
        Get Started{" "}
        <span className="arrow">
          <FaLocationArrow />
        </span>
      </Link>
    </section>
  );
}
