import React, { useState } from "react";
import axios from "axios";
import logo from "./assets/img/white.png";
import Terms from "./assets/terms.pdf";
import Policy from "./assets/policy.pdf";
import ReactGA from "react-ga";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState(null);
  const [target, setTarget] = useState(null);
  const [showToolTip, setToolTip] = useState(false);
  const [message, setMessage] = useState(null);

  const checkEmail = (e) => {
    if (
      new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
        e.target.value
      ) === false
    ) {
      setTarget(e.target);
      setToolTip(true);
      setEmail(null);
      setMessage("Please enter a valid <strong>email</strong> address.");
      sessionStorage.removeItem("email");
      e.target.value = null;
      return false;
    }
    setToolTip(false);
    return true;
  };

  const scrollToTop = (e) => {
    e.preventDefault();

    ReactGA.event({
      category: "In Footer",
      action: "Clicked Back to top button",
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getInTouch = async () => {
    if (email === null) {
      setMessage("Please enter a <strong>email</strong> address.");
      setTarget(document.getElementById("footer-email-input"));
      setToolTip(true);
      return false;
    }
    const data = {
      email: email,
    };
    ReactGA.event({
      category: "In Footer",
      action: "Clicked Get in touch button",
      label: "calls API(save_subscription`)",
      transport: "beacon",
    });
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/before_login/restaurant/save_subscription`,
        data
      )
      .then((res) => {
        alert(
          "Successfully saved the subscription request. We will get back to you."
        );
      })
      .catch((error) => {
        alert("Something went wrong. Please try again");
      });
  };

  return (
    <footer class="footer-area section_gap">
      <div class="container">
        <div class="row pt-100">
          <div class="col-lg-6 col-md-6">
            <div class="logo pb-10">
              <Link to="/">
                <img loading="lazy" class="img-fluid" src={logo} alt="" />
              </Link>
            </div>
            <Link class="mt-20" to="/">
              smartdiner.co
            </Link>
          </div>
          <div class="col-lg-6  col-md-12 col-sm-12">
            <div class="single-footer-widget">
              <div class="" id="mc_embed_signup">
                <div class="d-flex flex-row" style={{ width: "100%" }}>
                  <input
                    class="form-control"
                    id="footer-email-input"
                    name="EMAIL"
                    placeholder="Enter Email"
                    onfocus="this.placeholder = ''"
                    onBlur={(e) => checkEmail(e)}
                    required=""
                    type="email"
                    style={{ width: "100%", height: "60px" }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Overlay
                    show={showToolTip}
                    placement="bottom"
                    target={target}
                  >
                    <Popover id="popover-contained">
                      <Popover.Content>
                        <div
                          dangerouslySetInnerHTML={{ __html: message }}
                        ></div>
                      </Popover.Content>
                    </Popover>
                  </Overlay>

                  <button
                    class="click-btn btn btn-default"
                    onClick={getInTouch}
                  >
                    stay in touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-60">
          <div class="col-lg-12">
            <h4 style={{ color: "white" }}>
              Let's talk @{" "}
              <a
                href="tel:+917904465474"
                onClick={() => {
                  ReactGA.event({
                    category: "In footer",
                    action: "Clicked Mobile number",
                    transport: "beacon",
                  });
                }}
                target="blank"
              >
                +91 7904465474
              </a>
            </h4>
          </div>
        </div>
        <div class="row footer-top">
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <h6>Restaurants</h6>
              <div class="row">
                <ul class="col footer-nav p-0">
                  <li>
                    <Link
                      to="/signup"
                      onClick={() => {
                        ReactGA.event({
                          category: "In Footer",
                          action: "Clicked Sign Up with serve food button",
                          transport: "beacon",
                        });
                      }}
                    >
                      Sign up - serve food
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => {
                        ReactGA.event({
                          category: "In Footer",
                          action: "Clicked Sign in to admin button",
                          transport: "beacon",
                        });
                      }}
                    >
                      Sign into your account
                    </Link>
                  </li>
                  {/*<li><a href="/">Legal Documents</a></li> 
								<li><a href="/">Pricing</a></li>*/}
                  <li>
                    <a
                      href="mailto:contact@smartdiner.co"
                      target="blank"
                      onClick={() => {
                        ReactGA.event({
                          category: "In Footer",
                          action: "Clicked Ask for a quote button",
                          transport: "beacon",
                        });
                      }}
                    >
                      Ask for quote
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <h6>Company</h6>
              <div class="row">
                <ul class="col footer-nav p-0">
                  <li>
                    <Link
                      to="/"
                      onClick={() => {
                        ReactGA.event({
                          category: "In Footer",
                          action: "Clicked Home button",
                          transport: "beacon",
                        });
                      }}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about-us"
                      onClick={() => {
                        ReactGA.event({
                          category: "In Footer",
                          action: "Clicked About us button",
                          transport: "beacon",
                        });
                      }}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/team"
                      onClick={() => {
                        ReactGA.event({
                          category: "In Footer",
                          action: "Clicked Team button",
                          transport: "beacon",
                        });
                      }}
                    >
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      onClick={() => {
                        ReactGA.event({
                          category: "In Footer",
                          action: "Clicked contact button",
                          transport: "beacon",
                        });
                      }}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <h6>Legal</h6>
              <div class="row">
                <ul class="col footer-nav p-0">
                  <li>
                    <a
                      href={Terms}
                      onClick={() => {
                        ReactGA.event({
                          category: "In Footer",
                          action: "Clicked Terms and conditions button",
                          transport: "beacon",
                        });
                      }}
                      target="blank"
                    >
                      T&C
                    </a>
                  </li>
                  <li>
                    <a
                      href={Policy}
                      onClick={() => {
                        ReactGA.event({
                          category: "In Footer",
                          action: "Clicked policies button",
                          transport: "beacon",
                        });
                      }}
                      target="blank"
                    >
                      Policies
                    </a>
                  </li>
                  {/*<li><a href="project.html">Project</a></li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom d-flex justify-content-between align-items-center flex-wrap">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-5 footer-bottom-buttons d-flex flex-wrap ">
              <Link
                class="primary-btn btn-default mt-10 "
                to="/login"
                onClick={() => {
                  ReactGA.event({
                    category: "In Footer",
                    action: "Clicked Log in button",
                    transport: "beacon",
                  });
                }}
              >
                Log in
              </Link>
              <Link
                class="primary-btn mt-10"
                to="/signup"
                onClick={() => {
                  ReactGA.event({
                    category: "In Footer",
                    action: "Clicked Sign-up button",
                    transport: "beacon",
                  });
                }}
              >
                Sign up
              </Link>
              <Link
                class="primary-btn mt-10"
                to="/"
                onClick={(e) => scrollToTop(e)}
              >
                Back To Top
              </Link>
            </div>
            <div class="col-lg-5 d-flex align-items-center">
              <div>
                <p
                  style={{ fontFamily: "Lato", color: "#ffffff" }}
                  class="footer-text m-0"
                >
                  Copyright &copy;All rights reserved |{" "}
                  <a href="https://smartdiner.co/">smartdiner</a>
                </p>
              </div>
            </div>
            <div class="col-lg-2 d-flex align-items-center">
              <div class="footer-social d-flex align-items-center">
                <a
                  href="https://www.facebook.com/Smart-Diner-102215611662588"
                  onClick={() => {
                    ReactGA.event({
                      category: "In Footer",
                      action: "Clicked Facebook button",
                      transport: "beacon",
                    });
                  }}
                  target="blank"
                >
                  <i class="lni lni-facebook-filled"></i>
                </a>
                <a
                  href="https://twitter.com/DinerSmart"
                  onClick={() => {
                    ReactGA.event({
                      category: "In Footer",
                      action: "Clicked Twitter button",
                      transport: "beacon",
                    });
                  }}
                  target="blank"
                >
                  <i class="lni lni-twitter-filled"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/smart-diner"
                  onClick={() => {
                    ReactGA.event({
                      category: "In Footer",
                      action: "Clicked LinkedIN button",
                      transport: "beacon",
                    });
                  }}
                  target="blank"
                >
                  <i class="lni lni-linkedin-filled"></i>
                </a>
                <a
                  href="https://www.instagram.com/smart_diner"
                  onClick={() => {
                    ReactGA.event({
                      category: "In Footer",
                      action: "Clicked Instagram button",
                      transport: "beacon",
                    });
                  }}
                  target="blank"
                >
                  <i class="lni lni-instagram-filled"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
