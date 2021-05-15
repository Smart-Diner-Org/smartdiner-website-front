import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactGA from "react-ga";
import { useLocation, Link } from "react-router-dom";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState(null);
  const [showToolTip, setToolTip] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    ReactGA.pageview("/contact-page");
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const removeTooltip = () => {
    setToolTip(false);
    setToolTipMessage(null);
    setToolTip(null);
  };

  const contactUs = async () => {
    if (name.length <= 0) {
      setToolTipMessage("Enter your <strong>name</strong>.");
      setTarget(document.getElementById("contact-name"));
      setToolTip(true);
      return false;
    }
    if (email.length <= 0) {
      setToolTipMessage("Please enter a <strong>email</strong> address.");
      setTarget(document.getElementById("contact-email"));
      setToolTip(true);
      return false;
    }
    if (
      new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email) ===
      false
    ) {
      setTarget(document.getElementById("contact-email"));
      setToolTip(true);
      setEmail(null);
      setToolTipMessage("Please enter a valid <strong>email</strong> address.");
      document.getElementById("contact-email").value = null;
      return false;
    }
    if (message.length <= 0) {
      setToolTipMessage("Please enter your <strong>message</strong>.");
      setTarget(document.getElementById("contact-message"));
      setToolTip(true);
      return false;
    }
    const data = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };
    ReactGA.event({
      category: "In contact page",
      action: "Clicked Contact us after entering the contact-form",
      label: "API call to backend(save_contact_request)",
      transport: "beacon",
    });
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/before_login/restaurant/save_contact_request`,
        data
      )
      .then((res) => {
        alert(
          "Successfully saved the contact request. Thanks for contacting us. We will get back to you."
        );
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          let er = error.response.data.message;
          alert("Contact request failed. Please try again.... ", er);
        } else {
          alert("Contact request failed. Please try again.... ", error);
        }
      });
  };
  return (
    <div>
      <section class="banner_area ">
        <div class="banner_inner overlay d-flex align-items-center">
          <div class="container">
            <div class="banner_content text-left">
              <div class="page_link">
                <Link
                  to="/"
                  onClick={() => {
                    ReactGA.event({
                      category: "In contact page",
                      action: "Clicked home button ",
                      label: "button is in banner-area",
                      transport: "beacon",
                    });
                  }}
                >
                  Home
                </Link>
                <Link to="/contact">Contact</Link>
              </div>
              <h2>Contact Us</h2>
            </div>
          </div>
        </div>
      </section>
      <Overlay show={showToolTip} placement="bottom" target={target}>
        <Popover id="popover-contained">
          <Popover.Content>
            <div dangerouslySetInnerHTML={{ __html: toolTipMessage }}></div>
          </Popover.Content>
        </Popover>
      </Overlay>

      <section class="contact_area section-gap">
        {/* <div class="container " style={{height:"300px",marginBottom:"80px"}}>
                    <iframe  loading="lazy" id="mapBox" class="mapBox"
                        frameborder="0" title="google-map" style={{border:"none",width:"100%",height:"100%"}}
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDORUh0mGaVxDgP2ZojKCqVmpXnVOZfAS8
                            &q=Nelamangala`} allowfullscreen>
                    </iframe>
                </div> */}
        <div class="row">
          <div class="col-lg-9">
            <div class="comment-form">
              <div class="form-group form-inline">
                <div class="form-group col-lg-6 col-md-6 name">
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    class="form-control"
                    id="contact-name"
                    placeholder="Enter Name"
                    onFocus={removeTooltip}
                    onblur="this.placeholder = 'Enter Name'"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div class="form-group col-lg-6 col-md-6 email">
                  <input
                    style={{ width: "100%" }}
                    type="email"
                    class="form-control"
                    id="contact-email"
                    placeholder="Enter email address"
                    onFocus={removeTooltip}
                    onChange={(e) => setEmail(e.target.value)}
                    onblur="this.placeholder = 'Enter email address'"
                  />
                </div>
              </div>
              <div class="form-group">
                <input
                  style={{ width: "100%" }}
                  type="text"
                  class="form-control"
                  id="subject"
                  placeholder="Subject"
                  onChange={(e) => setSubject(e.target.value)}
                  onfocus="this.placeholder = ''"
                  onblur="this.placeholder = 'Subject'"
                />
              </div>
              <div class="form-group">
                <textarea
                  class="form-control mb-10"
                  rows="5"
                  id="contact-message"
                  name="message"
                  placeholder="Messege"
                  onFocus={removeTooltip}
                  onblur="this.placeholder = 'Messege'"
                  onChange={(e) => setMessage(e.target.value)}
                  required=""
                ></textarea>
              </div>
              <button
                style={{ fontFamily: "MuseoModerno", color: "#000466" }}
                onClick={contactUs}
                class="primary-btn submit_btn"
              >
                Send
              </button>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="contact_info">
              {/* <div class="info_item">
                                <i class="lni lni-home"></i>
                                <h6>Banglore, India</h6>
                                <p>Indranagar</p>
                            </div> */}

              <div class="info_item">
                <i class="lni lni-phone"></i>
                <h6>
                  <a
                    href="tel:+917904465474"
                    onClick={() => {
                      ReactGA.event({
                        category: "In Contact page",
                        action: "Clicked Mobile number Link",
                        transport: "beacon",
                      });
                    }}
                    target="blank"
                  >
                    +91 7904465474
                  </a>
                </h6>
                <p>Mon to Fri 9am to 6 pm</p>
              </div>
              <div class="info_item">
                <i class="lni lni-envelope"></i>
                <h6>
                  <a
                    href="mailto:contact@smartdiner.co"
                    onClick={() => {
                      ReactGA.event({
                        category: "In Footer",
                        action: "Clicked Email link",
                        transport: "beacon",
                      });
                    }}
                    target="blank"
                  >
                    contact@smartdiner.co
                  </a>
                </h6>
                <p>Send us your query anytime!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
