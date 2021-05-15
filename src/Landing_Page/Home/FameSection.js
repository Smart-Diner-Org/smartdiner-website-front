import React from "react";
import { Link } from "react-router-dom";
import { whyGiveOutDFameImg } from "../s3images";
import ReactGA from "react-ga";

function FameSection() {
  return (
    <section class="service-area section-gap pr-40 pl-60 mb-50">
      <div class="row d-flex justify-content-between ">
        <div class=" col-lg-4 service-content mb-20">
          <h3 style={{ color: "white", marginBottom: "30px" }}>
            Why give up the fame when it’s your game?
          </h3>

          <h6 style={{ color: "#ffffff" }}>
            Commission-free online ordering
            {/* <p>
              Manage your orders from your own website. Eliminate the
              third-party mediation and let your customers contact you directly.
            </p> */}
          </h6>
          <p>
            Manage your orders from your own website. Eliminate the third-party
            mediation and let your customers contact you directly.
          </p>
          <h6 style={{ color: "#ffffff" }}>Order management</h6>
          <p>
            Manage orders directly from your own system. And exactly where a
            customer order is at any moment.
          </p>

          <h6 style={{ color: "#ffffff" }}>Delivery integration </h6>
          <p>
            Integrate with delivery partners to serve your food directly to
            customers.
          </p>

          <h6 style={{ color: "#ffffff" }}>Marketing tools </h6>
          <p>
            Know your customers and speak to them through your food. While you
            do so, also build your own user base, learn their behaviours, engage
            with them and grow your brand. After all, you care more about your
            customers than does a third-party platform.
          </p>

          <Link
            to="/signup"
            onClick={() => {
              ReactGA.event({
                category: "In Fame Section",
                action: "Clicked Sign up with us button",
                label: "Moved to singup page",
                transport: "beacon",
              });
            }}
          >
            Sign up with us
          </Link>
        </div>
        <div class="col-lg-6 service-icon d-flex align-items-center">
          <img
            loading="lazy"
            class="img-fluid"
            src={whyGiveOutDFameImg}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default FameSection;
