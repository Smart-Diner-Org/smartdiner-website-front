import React from "react";
import {
  customWebsiteImg,
  digitalMarketingSolutionImg,
  orderDeliveryImg,
  orderManagementImg,
} from "../s3images";

function ServiceArea() {
  return (
    <section class="service-area section-gap pr-40 pl-70">
      <div class="row justify-content-center">
        <div class="col-lg-9 text-center">
          <div class="section-title">
            <h2 style={{ color: "white" }}>Our Services</h2>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-between">
        {/* <!-- single-features --> */}
        <div class="col-lg-3 col-sm-12 col-md-12">
          <div class="single-service d-flex flex-column align-items-center">
            <div class="service-icon">
              <img
                loading="lazy"
                class="img-fluid"
                src={customWebsiteImg}
                alt=""
              />
            </div>
            <div class="service-content">
              <h4 style={{ color: "white" }}>
                Commission-free online ordering
              </h4>
              <p>Manage your orders from your own website.</p>
            </div>
          </div>
        </div>
        {/* <!-- single-features --> */}
        <div class="col-lg-3 col-sm-12 col-md-12">
          <div class="single-service d-flex flex-column align-items-center">
            <div class="service-icon">
              <img
                loading="lazy"
                class="img-fluid"
                src={orderManagementImg}
                alt=""
              />
            </div>
            <div class="service-content">
              <h4>Order management </h4>
              <p>Manage orders directly from your own system.</p>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-sm-12 col-md-12">
          <div class="single-service d-flex flex-column align-items-center">
            <div class="service-icon">
              <img
                loading="lazy"
                class="img-fluid"
                src={orderDeliveryImg}
                alt=""
              />
            </div>
            <div class="service-content">
              <h4>Delivery integration</h4>
              <p>
                Integrate with delivery partners to serve your food directly to
                customers.
              </p>
            </div>
          </div>
        </div>
        {/* single-features  */}
        <div class="col-lg-3 col-sm-12 col-md-12">
          <div class="single-service d-flex flex-column align-items-center ">
            <div class="service-icon">
              <img
                loading="lazy"
                class="img-fluid"
                src={digitalMarketingSolutionImg}
                alt=""
              />
            </div>
            <div class="service-content">
              <h4 style={{ color: "white" }}>Marketing tools</h4>
              <p>Contact us for custom marketing support.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceArea;
