import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import {Instagram} from "@material-ui/icons";
import { Facebook } from "@material-ui/icons";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://w0.peakpx.com/wallpaper/680/882/HD-wallpaper-house-of-the-dragon-logo.jpg"
              alt="Founder"
            />
            <Typography>dragonite </Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This wesbite was made by @dragonite. Only with the
              purpose to learn MERN Stack
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.facebook.com/"
              target="blank"
            >
              <Facebook className="facebooksvg" />
            </a>

            <a href="https://instagram.com" target="blank">
              <Instagram className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;