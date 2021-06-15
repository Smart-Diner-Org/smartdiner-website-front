import React from "react";
import ReactGA from "react-ga";
import Customer from "./Customer";
import { Link } from "react-router-dom";
import { customerList } from "../../helpers/constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Testimonal() {
  return (
    <>
      {/* <!--================ Start Testimonial Area =================--> */}
      <section className="register-area pb-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <Link
                to="/signup"
                onClick={() => {
                  ReactGA.event({
                    category: "In home page",
                    action: "Clicked Sign-up button",
                    label: "button is in testimonal section- register area",
                    transport: "beacon",
                  });
                }}
                className="sign_up primary-btn d-flex align-items-center justify-content-center"
              >
                Sign up with us
              </Link>
            </div>
          </div>
          <div className="row justify-content-center pt-50">
            <div className="col-lg-12 text-center">
              <Link
                to="/contact"
                onClick={() => {
                  ReactGA.event({
                    category: "In home page",
                    action: "Clicked contact us button",
                    label: "button is in testimonal section- register area",
                    transport: "beacon",
                  });
                }}
                className="primary-btn d-flex align-items-center justify-content-center"
                style={{ width: "100%", height: "100px" }}
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* <!--================ End Testimonial Area =================--> */}

      {/* <!--================ Start Testimonial Area =================--> */}
      <section className="customers_area pt-60 section-top-border">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2 style={{ color: "#000466" }}>Our happy customers</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-area pb-40 ">
        <div className="">
          <div className="row customer-items">
            <Carousel
              arrows={true}
              additionalTransfrom={0}
              autoPlay={false}
              centerMode={true}
              className=""
              containerClass="container"
              draggable
              focusOnSelect={true}
              keyBoardControl
              minimumTouchDrag={180}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              infinite={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 5,
                  partialVisibilityGutter: 40,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 3.5,
                  partialVisibilityGutter: 30,
                }
              }}
              sliderClass=""
             // slidesToSlide={1}
              swipeable
            >
              {customerList.map((customer) => (
                <Customer
                  logoImg={customer.logo}
                  URL={customer.url}
                  resturantName={customer.name}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonal;