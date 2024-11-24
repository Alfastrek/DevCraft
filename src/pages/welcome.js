import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

import "../App.css";

const Welcome = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle button click
  const handleButtonClick = () => {
    navigate("/access"); // Redirect to /home
  };
  useEffect(() => {
    // Initialize particles.js
    window.particlesJS("particles-js", {
      particles: {
        number: {
          value: 100,
          density: { enable: true, value_area: 800 },
        },
        shape: { type: "circle" },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1 },
        },
        size: {
          value: 5,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.1 },
        },
        links: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.5,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
        },
      },
      retina_detect: true,
    });
  }, []);

  return (
    <>
      <div
        id="particles-js"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      ></div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
          textAlign: "center", // Center text alignment
        }}
      >
        <div className="revealText">
          <h1 className="animatedGradientText">Welcome to DevCraft</h1>
        </div>
        <div className="additionalInfo">
          <h2 className="subHeading">
            Real-Time Code Editor for Learners and
            <br /> Collaborations.
          </h2>

          <button className="btnn" onClick={handleButtonClick}>
            Try it Out!
          </button>
          <h5 className="subHeading">No Login/Account Required.</h5>
        </div>
        <footer className="welcomefooter">
          <p>
            © 2024 DevCraft. Crafted with 🫶🏻 by{" "}
            <a
              href="https://www.github.com/alfastrek"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aradhya Shukla
            </a>
            .
          </p>
        </footer>
      </div>
    </>
  );
};

export default Welcome;
