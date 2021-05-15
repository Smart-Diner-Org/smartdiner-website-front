import React from "react";

export default function OffflineOrderForm(props) {
  return (
    <div className="offline-order-form">
      <hr/>
      <div className="row">
        <div className="col-lg-6 d-flex flex-column">
          <label>Customer Mobile Number:</label>
          <input
            type="tel"
            name="mobile"
            value={props.mobile}
            onChange={(e)=>props.setMobile(e.target.value)}
            autoComplete="off"
            minLength="10"
            maxLength="10"
          />
        </div>
        <div className="col-lg-6 d-flex flex-column">
          <label>Order Description:</label>
          <input
            type="text"
            value={props.description}
            onChange={(e)=>props.setDescription(e.target.value)}
            name="description"
            placeholder="Optional"
            autoComplete="off"
          />
        </div>
      </div>
      <hr/>
      <div className="row">
        <div className="col-lg-6 d-flex flex-column">
          <label>Address Line 1:</label>
          <input
            type="text"
            value={props.address1}
            onChange={(e)=>props.setAddress1(e.target.value)}
            name="addressLine1"
            placeholder="Door No. / Street"
            autoComplete="off"
          />
        </div>
        <div className="col-lg-6 d-flex flex-column">
          <label>Address Line 2:</label>
          <input
            type="text"
            value={props.address2}
            onChange={(e)=>props.setAddress2(e.target.value)}
            name="addressLine2"
            placeholder="Area / Locality"
          />
        </div>
      </div>
      <hr/>
    </div>
  );
}
