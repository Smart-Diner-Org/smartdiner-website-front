import React from "react";
import Toast from "react-bootstrap/Toast";

function OrderMessage(props) {
    const color = props.successMessage ? "#08a860": "#e22a28"
  return (
    <Toast
      style={{
        position: "fixed",
        bottom: 100,
        right: 10,
        backgroundColor: color,
        color:"white",
        border:"none",
      }}
      onClose={() => props.setToast(false)}
      show={props.showToast}
      delay={3000}
      autohide
    >
      <Toast.Header style={{backgroundColor: "white"}}>
        <strong className="mr-auto">
          {sessionStorage.getItem("RestName")}
        </strong>
        <small className="ml-20">just now</small>
      </Toast.Header>
      <Toast.Body>{props.toastMessage}</Toast.Body>
    </Toast>
  );
}

export default OrderMessage;
