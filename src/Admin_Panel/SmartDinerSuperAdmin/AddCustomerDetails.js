import React, { useState } from "react";
import { roles_and_IDs } from "../../helpers/constants";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

function AddCustomerDetails({
  customerEmail,
  setcustomerEmail,
  password,
  setPassword,
  customerName,
  customerMobile,
  setCustomerName,
  setcustomerMobile,
  setCustomerDetails,
  setShowRestaurantDetails,
  roleID,
  setRoleID,
}) {
  const [target, setTarget] = useState(null);
  const [showToolTip, setToolTip] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState(null);

  const goNext = () => {
    if (customerName.length <= 0) {
      setToolTipMessage("Enter <strong>Name</strong>.");
      setTarget(document.getElementById("customerName"));
      setToolTip(true);
      return false;
    }
    if (customerMobile.length <= 0) {
      setToolTipMessage("Enter <strong>Mobile Number</strong>.");
      setTarget(document.getElementById("customerMobile"));
      setToolTip(true);
      return false;
    }
    if (customerEmail.length <= 0) {
      setToolTipMessage("Enter <strong>mail ID</strong> address.");
      setTarget(document.getElementById("customerEmail"));
      setToolTip(true);
      return false;
    }
    if (
      new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
        customerEmail
      ) === false
    ) {
      setTarget(document.getElementById("customerEmail"));
      setToolTip(true);
      setcustomerEmail(null);
      setToolTipMessage("Enter a valid <strong>mail ID</strong> address.");
      document.getElementById("customerEmail").value = null;
      return false;
    }
    if (password.length <= 0) {
      setToolTipMessage("Enter <strong>Password</strong>.");
      setTarget(document.getElementById("password"));
      setToolTip(true);
      return false;
    }
    setShowRestaurantDetails(true);
    setCustomerDetails(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container add-customer">
      <Overlay show={showToolTip} placement="bottom" target={target}>
        <Popover id="popover-contained">
          <Popover.Content>
            <div dangerouslySetInnerHTML={{ __html: toolTipMessage }}></div>
          </Popover.Content>
        </Popover>
      </Overlay>
      <h2>Customer Details</h2>
      <div className="row" style={{ borderTop: "1px dashed #b3b3b3" }}>
        <h4 className="col-lg-8 ">
          Name :
          <input
            type="text"
            value={customerName}
            id="customerName"
            onFocus={() => setToolTip(false)}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-8">
          Mobile :
          <input
            type="tel"
            name="mobile"
            minLength="10"
            maxLength="10"
            value={customerMobile}
            id="customerMobile"
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setcustomerMobile(e.target.value);
              }
            }}
            onFocus={() => setToolTip(false)}
          />
        </h4>
        <h4 className="col-lg-8">
          Email :
          <input
            type="email"
            value={customerEmail}
            id="customerEmail"
            onChange={(e) => setcustomerEmail(e.target.value)}
            onFocus={() => setToolTip(false)}
          />
        </h4>
        <h4 className="col-lg-8">
          Password :
          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setToolTip(false)}
          />
        </h4>
        <div className="col-lg-8">
          <select
            className="row"
            value={roleID}
            onChange={(e) => setRoleID(e.target.value)}
          >
            {Object.keys(roles_and_IDs).map((role) => (
              <option
                value={roles_and_IDs[role]}
                selected={
                  roles_and_IDs[role] === roles_and_IDs["Super Admin"]
                    ? true
                    : false
                }
              >
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-12 d-flex align-items-center">
          <button className="btn next-btn" onClick={goNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCustomerDetails;
