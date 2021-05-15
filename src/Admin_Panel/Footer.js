import React from "react";
import LogoImg from "./assets/images/SmartDiner_logo.png";
import Terms from "./assets/terms.pdf";
import Policy from "./assets/policy.pdf";

function Footer(props) {
  return (
    <div className="footer">
      <div className="col-5 d-flex justify-content-around align-items-center">
        <a href="/">
          <img src={LogoImg} alt="Smart Diner"></img>
        </a>
        <label className="ml-10">We digitalize your dining experince</label>
      </div>
      <div className="col-5 offset-2 d-flex justify-content-around align-items-center">
        <a className="ml-10" href="/about-us">
          About Smart Diner
        </a>
        <a className="ml-10" href="/contact">
          Contact us
        </a>
        <a className="ml-10" href={Terms} target="blank">
          Terms
        </a>
        <a className="ml-10" href={Policy} target="blank">
          Policies
        </a>
      </div>
    </div>
  );
}

export default Footer;
