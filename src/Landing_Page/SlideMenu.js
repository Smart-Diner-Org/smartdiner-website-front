import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/img/white.png";
import ReactGA from "react-ga";

function SlideMenu() {
  const [menu, toggelMenu] = useState(false);
  const [dropdown, showDropDown] = useState(false);
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", outsideClick);
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, []);

  const outsideClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    toggelMenu(false);
  };

  return (
    <>
      <div className={menu ? "open" : ""} ref={node}>
        <div className="side_menu">
          <div className="logo">
            <Link to="/">
              <img className="img-fluid" loading="lazy" src={Logo} alt="" />
            </Link>
          </div>
          <ul className="list menu-left">
            <li>
              <Link
                to="/"
                onClick={() => {
                  ReactGA.event({
                    category: "In Slider-menu",
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
                    category: "In Slider-menu",
                    action: "Clicked About-us button",
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
                    category: "In Slider-menu",
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
                    category: "In Slider-menu",
                    action: "Clicked Contact button",
                    transport: "beacon",
                  });
                }}
              >
                Contact
              </Link>
            </li>
            <li>
              <div className="dropdown">
                <button
                  type="button"
                  onClick={() => showDropDown(!dropdown)}
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Let's get started
                </button>
                <div
                  className={dropdown ? "dropdown-menu show" : " dropdown-menu"}
                >
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      ReactGA.event({
                        category: "In Slider-menu",
                        action: "Clicked Signup button",
                        label: "from dropdown of Lets get started",
                        transport: "beacon",
                      });
                    }}
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      ReactGA.event({
                        category: "In Slider-menu",
                        action: "Clicked Login button",
                        label: "from dropdown of Lets get started",
                        transport: "beacon",
                      });
                    }}
                    to="/login"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="canvus_menu">
          <div
            className="toggle_icon"
            title="Menu Bar"
            onClick={() => {
              ReactGA.event({
                category: "In Slider-menu",
                action: "Clicked slide menu button",
              });
              toggelMenu(!menu);
            }}
          >
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SlideMenu;
