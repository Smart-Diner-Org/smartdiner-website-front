import React, { useState, useEffect } from "react";
import axios from "axios";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import ReactGA from "react-ga";
import { useLocation, Link } from "react-router-dom";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState(null);
  const [showToolTip, setToolTip] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    ReactGA.pageview("/about-us");
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
      setTarget(document.getElementById("name"));
      setToolTip(true);
      return false;
    }
    if (email.length <= 0) {
      setToolTipMessage("Please enter a <strong>email</strong> address.");
      setTarget(document.getElementById("email"));
      setToolTip(true);
      return false;
    }
    if (
      new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email) ===
      false
    ) {
      setTarget(document.getElementById("email"));
      setToolTip(true);
      setEmail(null);
      setToolTipMessage("Please enter a valid <strong>email</strong> address.");
      document.getElementById("email").value = null;
      return false;
    }
    if (message.length <= 0) {
      setToolTipMessage("Please enter your <strong>message</strong>.");
      setTarget(document.getElementById("message"));
      setToolTip(true);
      return false;
    }

    ReactGA.event({
      category: "In Signup page",
      action: "Clicked send after entering the contact-form",
      label: "API call to backend(save_contact_request)",
      transport: "beacon",
    });

    const data = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };
    removeTooltip();

    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/before_login/restaurant/save_contact_request`,
        data
      )
      .then((res) => {
        alert(
          "Successfully saved the contact request. Thanks for sign-up. We will get back to you."
        );
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          let er = error.response.data.message;
          alert("ERROR, Please try again!!!", er);
        } else {
          alert(error);
        }
      });
  };

  return (
    <div className="signup-page">
      <section className="banner_area">
        <div className="banner_inner overlay d-flex align-items-center">
          <div className="container">
            <div className="banner_content text-left">
              <div className="page_link">
                <Link
                  to="/"
                  onClick={() => {
                    ReactGA.event({
                      category: "In SignIn page",
                      action: "Clicked Home button",
                      label: "button is in banner area",
                      transport: "beacon",
                    });
                  }}
                >
                  Home
                </Link>
                <Link href="/signup">SignUp</Link>
              </div>
              <h2>Sign up with us</h2>
              <p
                style={{
                  color: "#ffffff",
                  fontSize: "18px",
                  marginTop: "20px",
                }}
              >
                Get more orders. Commission-free. Schedule a free demo with us
                to see how we can help you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact_area section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="comment-form">
                <Overlay show={showToolTip} placement="bottom" target={target}>
                  <Popover id="popover-contained">
                    <Popover.Content>
                      <div
                        dangerouslySetInnerHTML={{ __html: toolTipMessage }}
                      ></div>
                    </Popover.Content>
                  </Popover>
                </Overlay>

                <div className="form-group form-inline">
                  <div className="form-group col-lg-6 col-md-6 name">
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                      onFocus={removeTooltip}
                      onblur="this.placeholder = 'Enter Name'"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-lg-6 col-md-6 email">
                    <input
                      style={{ width: "100%" }}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email address"
                      onFocus={removeTooltip}
                      onblur="this.placeholder = 'Enter email address'"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Subject"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Subject'"
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control mb-10"
                    id="message"
                    rows="5"
                    name="message"
                    placeholder="Messege"
                    onFocus={removeTooltip}
                    onblur="this.placeholder = 'Messege'"
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  style={{ fontFamily: "MuseoModerno", color: "#000466" }}
                  onClick={contactUs}
                  className="primary-btn submit_btn"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
