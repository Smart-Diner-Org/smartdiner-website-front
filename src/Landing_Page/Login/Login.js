import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import VideoPlayer from "../Home/VideoPlayer";
import ReactGA from "react-ga";
import { useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const apiLink = `${process.env.REACT_APP_BACKEND_URL}/`;

  const [state, setState] = useState({
    email: sessionStorage.getItem("email"),
    password: "",
    requestedOTP: false,
    isVerified: false,
    name: "",
    user_info: {
      accessToken: null,
      customer: {
        createdAt: null,
        customer_detail: {
          id: null,
          customer_id: null,
          address_one: null,
          address_two: null,
          city_id: null,
          state_id: null,
          primary: null,
          address_type: null,
          lat: null,
          long: null,
          createdAt: null,
          updatedAt: null,
        },
        email: " ",
        id: null,
        mobile: null,
        mobile_verification: null,
        name: null,
        otp_secret: null,
        password: null,
        remember_token: null,
        role_id: null,
        updatedAt: null,
        uuid: null,
      },
    },
    successMessage: "",
    errorMessage: "",
    canRedirectToHome: false,
  });
  const [showVideo, setVideo] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    ReactGA.pageview("/login-page");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const LogIn = async (event) => {
    event.preventDefault();
    setState({ ...state, requestedOTP: true });

    const data = {
      email: state.email,
      password: state.password,
    };

    ReactGA.event({
      category: "In Login page",
      action: "Clicked LogIN button",
      label: "after entering the credientials opens admin-panel",
      transport: "beacon",
    });
    await axios
      .post(`${apiLink}auth/signin`, data)
      .then((res) => {
        // roleId 6 is for delivery partner role.
        // If the login is for delivery partner - then we can redirect to the link provided by server.
        if (
          res.status === 200 &&
          res.data.redirectLink !== undefined &&
          res.data.roleId === "6"
        ) {
          var inOneMinute = new Date(new Date().getTime() + 1 * 60 * 1000);
          Cookies.set("domainRedirectPass", res.data.accessToken, {
            expires: inOneMinute,
            domain: "smartdiner.co",
          });
          window.location.href = res.data.redirectLink;
        } else {
          setState({ ...state, errorMessage: null });
          setState({ ...state, successMessage: res.data.message });
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("profileRoleID", res.data.roleId);
          setState({
            ...state,
            canRedirectToHome: true,
          });
        }
      })
      .catch((error) => {
        setState({ ...state, successMessage: null });
        if (error && error.response && error.response.data) {
          let er = error.response.data.message;
          console.log(er);
          setState({ ...state, errorMessage: er });
        } else console.log(error);
      });
  };

  if (state.canRedirectToHome) return <Redirect to="/admin-panel" />;

  return (
    <div>
      <section class="home-banner-area pt-100 pb-100">
        <div class="row d-flex align-items-center justify-content-between">
          <div class="col-lg-5 col-md-12 home-banner-left d-flex justify-content-center align-items-center">
            <div class="container">
              <h1 style={{ fontFamily: "MuseoModerno" }}>
                We Are <span>Crafted</span>. <br />
                Design & Development <br />
                <span>Service</span> Provider.
              </h1>

              <Link
                to="/about-us"
                onClick={() => {
                  ReactGA.event({
                    category: "In Login page",
                    action: "Clicked More about us button",
                    label: "button is in banner area",
                    transport: "beacon",
                  });
                }}
                class="primary-btn"
              >
                More About Us
              </Link>

              <div class="d-flex align-items-center mt-60">
                <a
                  id="play-home-video"
                  class="video-play-button"
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    ReactGA.event({
                      category: "In Login page",
                      action: "Clicked video play button",
                      label: "video player opened",
                      transport: "beacon",
                    });
                    setVideo(!showVideo);
                  }}
                >
                  <span></span>
                </a>
                <div class="watch_video">
                  <h5 style={{ fontFamily: "MuseoModerno" }}>Watch to know</h5>
                  <p style={{ fontFamily: "Lato", color: "#777777" }}>
                    You will love our execution
                  </p>
                </div>
                {showVideo && (
                  <VideoPlayer closeVideo={() => setVideo(!showVideo)} />
                )}
              </div>
            </div>
          </div>
          <div class="row col-lg-6 col-md-12 col-sm-12 no-padding  d-flex align-items-center">
            <div className="container">
              <div class="comment-form col-12">
                <form>
                  <div class="form-group email">
                    <input
                      style={{ color: "#000466" }}
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Enter email address"
                      name="email"
                      value={state.email}
                      onfocus="this.placeholder = ''"
                      onblur="this.placeholder = 'Enter email address'"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="form-group input-group d-flex align-items-center">
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      onfocus="this.placeholder = ''"
                      onblur="this.placeholder = 'Password'"
                      onChange={handleChange}
                    />
                    <span class="input-group-btn">
                      <button class="btn" type="button">
                        <i class="lnr lnr-eye"></i>
                      </button>
                    </span>
                  </div>
                  {state.errorMessage && (
                    <p style={{ color: "#e22a28" }}>{state.errorMessage}</p>
                  )}
                  <button
                    type="submit"
                    onClick={(e) => LogIn(e)}
                    class="primary-btn submit_btn"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
