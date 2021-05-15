import React, { Component } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import Modal from "react-bootstrap/Modal";
import QuantityButtons from "./QuantityButton";

import { Form } from "react-bootstrap";
class Item extends Component {
  constructor(props) {
    super(props);
    this.checkboxes = [];
    this.state = {
      showToolTip: false,
      target: null,
      showModal: false,
      canEnableAddToCart:
        this.props.priceList && this.props.priceList.length > 0 ? true : false,
      modalTotal: 0,
      showCustomOrderPopUp: false,
    };
  }

  handleChecked = (e, item, discount) => {
    if (Number(e.target.value) > 0) {
      this.props.changequantity(
        -e.target.value,
        this.props.categoryID,
        this.props.menuID,
        item.id
      );
      e.target.checked = false;
    } else {
      this.props.changequantity(
        1,
        this.props.categoryID,
        this.props.menuID,
        item.id
      );
      e.target.checked = true;
    }
    this.calculateModalTotal(discount);
  };

  calculateModalTotal = (discount) => {
    const total = this.props.priceList.reduce(function (
      accumulator,
      currentValue
    ) {
      const valueToBeAdded = currentValue.quantity
        ? discount > 0
          ? (currentValue.price - currentValue.price * (discount / 100)) *
            currentValue.quantity
          : currentValue.price * currentValue.quantity
        : 0;
      const newTotal = accumulator + valueToBeAdded;
      return newTotal;
    },
    0);
    this.setState({ modalTotal: total });
  };

  openPriceListModal = (discount) => {
    if (this.state.modalTotal <= 0) {
      this.props.changequantity(
        1,
        this.props.categoryID,
        this.props.menuID,
        this.props.priceList[0].id
      );
      this.calculateModalTotal(discount);
    }
    this.setState({ showModal: true });
  };

  closePriceListModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div
        id="product"
        className="col-lg-4 col-md-5"
        style={{ marginBlockEnd: "2rem", marginBlockStart: "1.5rem" }}
      >
        <Modal
          show={this.state.showModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => this.closePriceListModal()}
        >
          <Modal.Header closeButton>
            <h4>Choose your custom order</h4>
          </Modal.Header>
          <Modal.Body>
            {this.props.priceList.map((item, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-auto d-flex flex-column">
                    <label id={`${item.id}`}>
                      <input
                        type="checkbox"
                        ref={(a) => (this.checkboxes[index] = a)}
                        value={item.quantity}
                        checked={item.quantity > 0 && true}
                        onClick={(e) =>
                          this.handleChecked(e, item, this.props.discount)
                        }
                      />
                      {item.quantity_values.quantity} {item.measure_values.name}
                      -
                      {this.props.discount > 0 ? (
                        <>
                          <span
                            style={{
                              textDecoration: "line-through",
                              opacity: "0.4",
                              marginRight: "5px",
                            }}
                          >
                            Rs.{item.price}
                          </span>
                          <span>
                            Rs.
                            {item.price -
                              item.price * (this.props.discount / 100)}
                          </span>
                        </>
                      ) : (
                        <span>Rs.{item.price}</span>
                      )}
                    </label>
                  </div>
                  <div className="col-auto p-0">
                    {item.quantity > 0 && (
                      <QuantityButtons
                        increaseQuantity={() => {
                          this.props.changequantity(
                            1,
                            this.props.categoryID,
                            this.props.menuID,
                            item.id
                          );
                          this.calculateModalTotal(this.props.discount);
                        }}
                        decreaseQuantity={() => {
                          if (item.quantity === 1) {
                            this.checkboxes[index].checked = false;
                          }
                          this.props.changequantity(
                            -1,
                            this.props.categoryID,
                            this.props.menuID,
                            item.id
                          );
                          this.calculateModalTotal(this.props.discount);
                        }}
                        quantity={item.quantity}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <div className="row pt-10">
              {this.state.modalTotal > 0 && (
                <h5
                  style={{ color: "#000466" }}
                  className="col d-flex align-self-center"
                >
                  Total: Rs. {this.state.modalTotal}
                </h5>
              )}
              <button
                className="btn btn-primary ml-auto"
                onClick={() => this.closePriceListModal()}
              >
                Continue
              </button>
            </div>
          </Modal.Body>
        </Modal>

        {/* {!this.state.canEnableAddToCart && <p>Call/WhatsApp us to order Customized Cakes.</p>} */}
        <div className="single-product-items">
          <div className="product-item-image">
            {this.props.image && (
              <a>
                <img loading="lazy" src={this.props.image} alt="Product" />
              </a>
            )}

            {this.props.discount > 0 && (
              <div className="product-discount-tag">
                <p>{this.props.discount}% OFF</p>
              </div>
            )}
          </div>
          <div className="product-item-content mt-30">
            {/* eslint-disable-next-line */}
            <div className="d-flex" style={{ width: "100%" }}>
              <h5 className="product-title">
                <a>{this.props.itemName}</a>
              </h5>
              {this.props.description && (
                <label
                  onPointerEnter={(e) => {
                    this.setState({
                      target: e.target,
                      showToolTip: true,
                    });
                  }}
                  onPointerLeave={(e) => {
                    this.setState({
                      target: null,
                      showToolTip: false,
                    });
                  }}
                  className="info-icon ml-auto d-flex align-items-center"
                >
                  i
                </label>
              )}
              <Overlay
                show={this.state.showToolTip}
                placement="bottom-end"
                target={this.state.target}
              >
                <Popover id="popover-contained">
                  <Popover.Content>{this.props.description}</Popover.Content>
                </Popover>
              </Overlay>
            </div>

            <p className="description">{this.props.short_description}</p>
            {this.state.canEnableAddToCart ? (
              <>
                {this.props.discount > 0 ? (
                  <>
                    <span
                      style={{
                        color: "#c4c4c4",
                        textDecoration: "line-through",
                      }}
                    >
                      Rs.{this.props.priceList[0].price}
                    </span>
                    <span style={{ color: "#000000" }}>
                      Rs.
                      {this.props.priceList[0].price -
                        this.props.priceList[0].price *
                          (this.props.discount / 100)}
                    </span>
                    <input
                      type="hidden"
                      id={"original_price_" + this.props.productId}
                      value={this.props.priceList[0].price}
                    ></input>
                    <input
                      type="hidden"
                      id={"discounted_price_" + this.props.productId}
                      value={
                        this.props.priceList[0].price -
                        this.props.priceList[0].price *
                          (this.props.discount / 100)
                      }
                    ></input>
                  </>
                ) : (
                  <>
                    <span style={{ color: "#000000" }}>
                      Rs.{this.props.priceList[0].price}
                    </span>
                    <input
                      type="hidden"
                      id={"original_price_" + this.props.productId}
                      value={this.props.priceList[0].price}
                    ></input>
                  </>
                )}

                {this.props.is_availableButton ? (
                  <div className="d-flex align-items-center">
                    <h6 className="mr-10 mb-0">Available :</h6>
                    <div class="custom-control custom-switch">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customSwitch1"
                        checked={this.props.is_available}
                      />
                      <label
                        className="custom-control-label"
                        for="customSwitch1"
                      ></label>
                    </div>
                  </div>
                ) : (
                  <div classNameName="d-flex flex-column justify-content-end">
                    <div>
                      {this.props.priceList.length === 1 ? (
                        this.props.priceList[0].quantity > 0 ? (
                          <QuantityButtons
                            key={"0"}
                            increaseQuantity={() => {
                              this.props.changequantity(
                                1,
                                this.props.categoryID,
                                this.props.menuID,
                                this.props.priceList[0].id
                              );
                            }}
                            decreaseQuantity={() => {
                              this.props.changequantity(
                                -1,
                                this.props.categoryID,
                                this.props.menuID,
                                this.props.priceList[0].id
                              );
                            }}
                            quantity={this.props.priceList[0].quantity}
                          />
                        ) : (
                          <button
                            className="btn btn-dark mb-10"
                            onClick={() => {
                              this.props.changequantity(
                                1,
                                this.props.categoryID,
                                this.props.menuID,
                                this.props.priceList[0].id
                              );
                            }}
                          >
                            Add to Cart
                          </button>
                        )
                      ) : (
                        <button
                          className="btn btn-dark mb-10"
                          onClick={() =>
                            this.openPriceListModal(this.props.discount)
                          }
                        >
                          {this.state.modalTotal > 0 ? "Edit" : "Add to Cart"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  className="custom-menu-call-button"
                  onClick={() => this.setState({ showCustomOrderPopUp: true })}
                >
                  Add Custom Order
                </button>
              </>
            )}

            {/* <ul className="rating">
                  <li><i className="lni-star-filled"></i></li>
                  <li><i className="lni-star-filled"></i></li>
                  <li><i className="lni-star-filled"></i></li>
                  <li><i className="lni-star-filled"></i></li>
                  <li><i className="lni-star-filled"></i></li>
    
              </ul> */}
          </div>
        </div>
        <Modal show={this.state.showCustomOrderPopUp}>
          <Modal.Header closeButton>
            <h4>Custom Order Details</h4>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Quantity :</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Quantity in numbers"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Measure :</Form.Label>
                <Form.Control type="text" placeholder="Enter Measure Unit" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Price :</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price for this order"
                />
              </Form.Group>
            </Form>
            <Modal.Footer className="pb-0">
              <button className="btn order-button ml-auto">Add to Cart</button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Item;
