import React from "react";
import Modal from "react-bootstrap/Modal";

function OrderConfirm(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Order Details:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>
          Customer Mobile No. : <strong>{props.mobile}</strong>
        </label>
        <br />
        <label>
          Order Description : <strong>{props.description}</strong>
        </label>
        <br />
        <label>
          Payment Status :{" "}
          <strong>
            {props.paymentStatus == 1 && "Paid"}
            {props.paymentStatus == 2 && "Not Paid"}
          </strong>
        </label>
        <br />
        <label>
          Payment Type :{" "}
          <strong>
            {props.paymentType == 1 && "Cash On Delivery"}
            {props.paymentType == 2 && "Online Payment"}
          </strong>
        </label>
        <br />
        <label>
          Delivery Mode :{" "}
          <strong>
            {props.deliveryMode == 1 && "Door Delivery"}
            {props.deliveryMode == 2 && "Pick From Store"}
            {props.deliveryMode == 3 && "Having At Store"}
          </strong>
        </label>
        <br />
        <label>
          Address :{" "}
          <strong>
            {props.address1}, {props.address2}
          </strong>
        </label>
        <br />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {props.selectedMenu.map((menu,index) => {
                let i = index + 1 
              return (
                <tr>
                  <th scope="row">{i}</th>
                  <td>{menu.name}</td>
                  <td>{menu.quantity}</td>
                  <td>Rs.{menu.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <h4 className="mr-auto">
          To Pay: <strong>Rs.{props.totalPrice}</strong>
        </h4>
        <button className="btn order-button" onClick={props.order}>
          Confirm Order
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderConfirm;
