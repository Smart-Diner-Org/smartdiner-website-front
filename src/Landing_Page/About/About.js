import React, { useState, useEffect } from "react";
import VideoPlayer from "../Home/VideoPlayer";
import ReactGA from "react-ga";
import { useLocation, Link } from "react-router-dom";

function About() {
  const [showVideo, setVideo] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    ReactGA.pageview("/about-us");
  }, []);
  return (
    <div className="about-us">
      <section class="banner_area ">
        <div class="banner_inner overlay d-flex align-items-center">
          <div class="container">
            <div class="banner_content text-left">
              <div class="page_link">
                <Link
                  to="/"
                  onClick={() => {
                    ReactGA.event({
                      category: "In about us page",
                      action: "Clicked home button ",
                      label: "button is in banner",
                      transport: "beacon",
                    });
                  }}
                >
                  Home
                </Link>
                <Link to="/about-us">About Us</Link>
              </div>
              <h2>About Us</h2>
            </div>
          </div>
        </div>
      </section>

      <section class="video-sec-area">
        <div class="container">
          <div class="row justify-content-start align-items-center">
            <div class="col-lg-6 video-left justify-content-center align-items-center d-flex">
              <div class="overlay overlay-bg"></div>
              <a
                id="play-home-video"
                class="video-play-button"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  ReactGA.event({
                    category: "In about us page",
                    action: "Clicked video button",
                    label: "Video displayed",
                  });
                  setVideo(!showVideo);
                }}
              >
                <span></span>
              </a>
              {showVideo && (
                <VideoPlayer closeVideo={() => setVideo(!showVideo)} />
              )}
            </div>
            <div class="col-lg-5 offset-lg-1 video-right">
              <h2 className="mb-20">A skilled team in creating standard websites</h2>
              <p>
                We are an extremely passionate group of foodies helping
                restaurants in establishing their independent online platform to
                serve delicious meals. The websites are crafted with SEO & CRO
                optimization and user-friendly interface.
              </p>

              {/* <div class="counter_area" id="project_counter">
                                <div class="row">
                                    <div class="col single_counter">
                                        <div class="info-content">
                                            <h4><span class="counter">500</span>+</h4>
                                            <p>Qualified Lawyer</p>
                                        </div>
                                    </div>
                                    <div class="col single_counter">
                                        <div class="info-content">
                                            <h4><span class="counter">20,650</span>+</h4>
                                            <p>Solved Cases</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col single_counter">
                                        <div class="info-content">
                                            <h4><span class="counter">2.5</span>k+</h4>
                                            <p>Trusted Clients</p>
                                        </div>
                                    </div>
                                    <div class="col single_counter">
                                        <div class="info-content">
                                            <h4><span class="counter">50</span>+</h4>
                                            <p>Achievements</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            </div>
            <img
              class="img-fluid video-shape"
              src="img/video-bg-shape.png"
              alt=""
            />
          </div>
        </div>
      </section>

      <section class="testimonial-area section-gap-bottom pt-70">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10 text-center">
              <div class="section-title pb-20">
                <h2>Our vision</h2>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
              <div class="owl-carousel active-testi-carousel">
                {/* <!-- single carousel --> */}

                <div class="single-testi-item">
                  <div class="author-desc">
                    <p>
                      We empower restaurants to be independent in managing
                      online customers, to make use of advanced digital
                      technology for a better experience and increased revenue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-area">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-6 col-md-12">
              <h2>Get to Know us</h2>
              <p>
                We at Smart Diner look at restaurants as any other potential
                business in the market requiring the appropriate tools to
                digitalize their business in the world of growing technology.
              </p>

              <Link
                to="/contact"
                onClick={() => {
                  ReactGA.event({
                    category: "In about us page",
                    action: "Clicked contact us button ",
                    label: "button is in Get to know us section",
                    transport: "beacon",
                  });
                }}
                class="primary-btn"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section class="testimonial-area section-gap-bottom pt-120">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10 text-center">
              <div class="section-title">
                <h2>What are we up to?</h2>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
              <div class="owl-carousel active-testi-carousel">
                <div class="single-testi-item">
                  <div class="author-desc">
                    <p>
                      We are working on revolutionizing the food game, but this
                      time, we hand over the power of serving delicious meals to
                      the hands that prepared them. This way, the restaurants
                      can manage their online food business by themselves using
                      the tools that we provide them.
                    </p>
                    <ul class=" d-flex flex-column align-items-center mt-50">
                      <div style={{ fontSize: "24px" }}>
                        <li class=" d-flex justify-content-start">
                          <strong style={{ color: "#000466" }}>Foodie1</strong>{" "}
                          : Hey, where did you order this food from?
                        </li>
                        <li class=" d-flex justify-content-start">
                          <strong style={{ color: "#000466" }}>Foodie2</strong>{" "}
                          : From this fancy app that delivers food.
                        </li>
                        <li class=" d-flex justify-content-start">
                          <strong style={{ color: "#000466" }}>Foodie1</strong>{" "}
                          : …? I meant, which restaurant? The food tastes good.
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="testimonial-area pb-50">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 text-center">
              <div class="section-title">
                <h2 style={{ color: "#000466" }}>
                  Why give out the fame when its your game
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--================ End Testimonial Area =================--> */}

      {/* <!--================ Start Testimonial Area =================--> */}
      <section class="register-area pb-120">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 text-center">
              <Link
                to="/signup"
                class="sign_up primary-btn d-flex align-items-center justify-content-center"
                onClick={() => {
                  ReactGA.event({
                    category: "In about us page",
                    action: "Clicked signup button ",
                    label: "button is in testimonal area of about-us page",
                    transport: "beacon",
                  });
                }}
              >
                Sign up with us
              </Link>
            </div>
          </div>
          <div class="row justify-content-center pt-50">
            <div class="col-lg-12 text-center">
              <Link
                to="/contact"
                class="primary-btn d-flex align-items-center justify-content-center"
                style={{ width: "100%", height: "100px" }}
                onClick={() => {
                  ReactGA.event({
                    category: "In about us page",
                    action: "Clicked contact-us button ",
                    label: "button is in testimonal area of about-us page",
                    transport: "beacon",
                  });
                }}
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
