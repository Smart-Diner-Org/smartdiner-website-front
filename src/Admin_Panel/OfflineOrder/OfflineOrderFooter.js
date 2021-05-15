import React from "react";
import { Link } from "react-router-dom";

function OfflineOrderFooter(props) {
  return (
    <div className="offline-order-footer">
      <div className="d-flex align-items-center">
        <Link to="/">Home</Link>
        <Link to="/admin-panel">Admin Panel</Link>
      </div>
      <div>
        <button
          className="btn mt-10 mb-10 order-button"
          onClick={props.handleShow}
        >
          Create Order
        </button>
      </div>
    </div>
  );
}

export default OfflineOrderFooter;
