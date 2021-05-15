import axios from "axios";
import { Modal } from "react-bootstrap";
import React, { Component } from "react";
import { deliveryPreferences } from "../../helpers/constants";

class Delivery extends Component {
  constructor(props) {
    super();
    this.state = {
      showDeliveyModal: false,
    };
  }
  acceptOrder = () => {
    if (
      this.props.delivery_partner_preference_id === deliveryPreferences["all"]
    ) {
      this.setState({ showDeliveyModal: true });
    } else {
      this.props.updateStage(3, this.props.orderId);
      this.props.toggelBag();
    }
  };

  closeDeliverModal = () => {
    this.setState({ showDeliveyModal: false });
  };

  requestDelivery = (id) => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/after_login/order/${this.props.orderId}/assign_delivery_partner`,
          { preferredDelivery: Number(id) },
          {
            headers: {
              "x-access-token": `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.closeDeliverModal();
          this.props.updateStage(3, this.props.orderId);
          this.props.toggelBag();
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <Modal
          onHide={this.closeDeliverModal}
          show={this.state.showDeliveyModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title> Choose Delivery Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <button
                className="mb-20 btn btn-green"
                onClick={() =>
                  this.requestDelivery(deliveryPreferences["inHouse"])
                }
              >
                Use my delivery team
              </button>
              <button
                className="mb-20 btn btn-yellow"
                onClick={() =>
                  this.requestDelivery(deliveryPreferences["service"])
                }
              >
                Use other delivery service
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <hr />
        <div className="delivery-type mb-100">
          {this.props.stage_id == 1 && (
            <>
              <button
                style={{ backgroundColor: "#08a860" }}
                onClick={this.acceptOrder}
              >
                Accept Order
              </button>
              <button
                style={{ backgroundColor: "#e22a28" }}
                onClick={() => {
                  this.props.cancelOrder(this.props.orderId);
                  this.props.toggelBag();
                }}
              >
                Cancel Order
              </button>
            </>
          )}

          {this.props.stage_id == 2 && (
            <>
              <button
                onClick={() => {
                  this.props.updateStage(3, this.props.orderId);
                  this.props.toggelBag();
                }}
              >
                Preparing
              </button>
              <button
                style={{ backgroundColor: "#e22a28" }}
                onClick={() => {
                  this.props.cancelOrder(this.props.orderId);
                  this.props.toggelBag();
                }}
              >
                Cancel Order
              </button>
            </>
          )}

          {this.props.stage_id == (3 || 4 || 5) && (
            <>
              <button
                style={{ backgroundColor: "#08a860" }}
                onClick={() => {
                  this.props.updateStage(6, this.props.orderId);
                  this.props.toggelBag();
                }}
              >
                Out for delivery
              </button>
              <button
                style={{ backgroundColor: "#e22a28" }}
                onClick={() => {
                  this.props.cancelOrder(this.props.orderId);
                  this.props.toggelBag();
                }}
              >
                Cancel Order
              </button>
            </>
          )}

          {this.props.stage_id == 6 && (
            <>
              <button
                style={{ backgroundColor: "#08a860" }}
                onClick={() => {
                  this.props.updateStage(7, this.props.orderId);
                  this.props.toggelBag();
                }}
              >
                Delivered
              </button>
              <button
                style={{ backgroundColor: "#e22a28" }}
                onClick={() => {
                  this.props.cancelOrder(this.props.orderId);
                  this.props.toggelBag();
                }}
              >
                Cancel Order
              </button>
            </>
          )}

          {this.props.stage_id == (7 || 8) && (
            <button
              style={{ backgroundColor: "#08a860", cursor: "context-menu" }}
            >
              Order Delivered
            </button>
          )}

          {this.props.stage_id == 9 && (
            <button
              style={{ backgroundColor: "#e22a28", cursor: "context-menu" }}
            >
              Order Cancelled
            </button>
          )}
        </div>
        <hr />
      </div>
    );
  }
}
export default Delivery;
