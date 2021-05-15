import React from "react";
import Logo from "../assets/img/logo.png";
// import Hero from "../assets/img/hero_img.jpg";
import { useHistory, Link } from "react-router-dom";
import ReactGA from "react-ga";
import { HomeBannerHeroImg } from "../s3images";

function Banner() {
  const history = useHistory();

  return (
    <>
      <section className="home-banner-area">
        <div className="sidebar"></div>
        <div className="row flex-wrap fullscreen">
          <div className="col-lg-6 home-banner-left d-flex justify-content-center fullscreen ">
            <div className="container mb-40">
              <div className="logo">
                <Link to="/">
                  <img loading="lazy" className="img-fluid" src={Logo} alt="" />
                </Link>
              </div>
              <h3>
                Know your customers. Keep in touch with them. Grow your
                business.
                <br />
              </h3>
              <h5 className="mt-20">
                Commission-free online ordering. Order management. Delivery
                integration. Marketing tools.
              </h5>
              <p className="mt-20">
                Eliminate the third-party mediation and let your customers
                contact you directly. Know your customers, speak to them through
                your food, build your own user base and grow your brand.
              </p>
              <div className="single-footer-widget mt-30">
                <div className="" id="mc_embed_signup">
                  <form
                    target="_blank"
                    novalidate="true"
                    action="#"
                    method="get"
                    className="form-inline"
                  >
                    <div
                      className="d-flex flex-column"
                      style={{ width: "100%" }}
                    >
                      <div
                        className="row d-flex justify-content-between"
                        style={{ width: "100%" }}
                      >
                        <Link
                          to="/signup"
                          onClick={() => {
                            ReactGA.event({
                              category: "In home page",
                              action: "Clicked Sign-up button",
                              label: "button is in banner-area",
                              transport: "beacon",
                            });
                          }}
                          className="col-lg-5 col-md-5 col-sm-12 primary-btn d-flex justify-content-center mt-30"
                          style={{ width: "40%" }}
                        >
                          Sign Up{" "}
                        </Link>
                        <button
                          onClick={() => {
                            ReactGA.event({
                              category: "In home page",
                              action: "Clicked Login button",
                              label: "button is in banner-area",
                              transport: "beacon",
                            });
                            history.push("/login");
                          }}
                          className="col-lg-5 col-md-5 col-sm-12 click-btn btn btn-default mt-30"
                          style={{
                            width: "40%",
                            height: "50px",
                            fontFamily: "MuseoModerno",
                          }}
                        >
                          Login
                        </button>
                      </div>
                      <div style={{ position: "absolute", left: "-5000px" }}>
                        <input
                          name="b_36c4fd991d266f23781ded980_aefe40901a"
                          tabindex="-1"
                          value=""
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="info"></div>
                  </form>
                </div>
              </div>
              <Link
                to="/contact"
                className="primary-btn d-flex justify-content-center mt-30"
                style={{ width: "100%" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="col-lg-6 p-0 home-banner-right d-flex fullscreen justify-content-center">
            <img
              loading="lazy"
              style={{ height: "100%", width: "100%" }}
              src={HomeBannerHeroImg}
              alt=""
            />
          </div>
          <div className="footer-social d-flex flex-column align-items-center">
            <a
              href="https://www.facebook.com/Smart-Diner-102215611662588"
              onClick={() => {
                ReactGA.event({
                  category: "In Home-banner",
                  action: "Clicked FaceBook button",
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
                  category: "In Home-banner",
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
                  category: "In Home-banner",
                  action: "Clicked LinkedIn button",
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
                  category: "In Home-banner",
                  action: "Clicked Instgram button",
                  transport: "beacon",
                });
              }}
              target="blank"
            >
              <i class="lni lni-instagram-filled"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
