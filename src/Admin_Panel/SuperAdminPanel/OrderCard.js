import React, { Component } from "react";
import OldOrderCard from "./OldOrderCard";

export default class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.date = new Date(this.props.time);
    this.minutes = Math.round((new Date() - this.date) / 1000 / 60);
  }
  render() {
    return (
      <div className="orders">
        {this.props.isMobile ? (
          <div
            className="order-card-mobile"
            id={`${this.props.id}`}
            onClick={() => {
              this.props.toggelBag(this.props.id);
            }}
          >
            <div
              className={
                this.props.selectedCard === this.props.id ? "selected" : ""
              }
            ></div>
            <div className="row">
              <p className="col-auto">OrderID #{this.props.id}</p>
              {this.props.preBookingDetail && (
                <label className="ml-auto pre-order">Pre-Order</label>
              )}
            </div>
            <div className="row ">
              <p className="col-auto">{this.props.items} item</p>
              {this.props.paymentStatus == 1 && (
                <p className="ml-auto col-auto paid">Paid</p>
              )}
            </div>
            <div className="row ">
              <p className="col-auto">{`${this.date.toLocaleTimeString()}`}</p>
              <p
                className="ml-auto col-auto"
                style={
                  Number(this.props.stage_id) === 9
                    ? { color: "#e22a28", fontWeight: "900" }
                    : {}
                }
              >
                {Number(this.props.stage_id) === 9 ? "Cancelled" : " "}
              </p>
            </div>
            <div className="row ">
              <p
                style={{ fontSize: "16px" }}
                className="col-auto"
              >{`${this.date.getDate()}-${
                this.date.getMonth() + 1  
              }-${this.date.getFullYear()}`}</p>
              <p
                className="ml-auto col-auto"
                style={
                  this.props.preBookingDetail
                    ? { color: "#e22a28", fontSize: "16px" }
                    : { color: "#b1b1b1", fontSize: "14px" }
                }
              >
                {this.props.preBookingDetail
                  ? `${this.props.preBookingDetail.date_of_delivery}`
                  : `${this.minutes} mins ago`}
              </p>
            </div>
          </div>
        ) : (
          <>
            {!(
              JSON.stringify(this.props.displayId) === JSON.stringify([7, 8, 9])
            ) ? (
              <>
                <div
                  className="order-card"
                  id={`${this.props.id}`}
                  onClick={() => {
                    this.props.toggelBag(this.props.id);
                  }}
                >
                  <div
                    className={
                      this.props.selectedCard === this.props.id
                        ? "selected"
                        : ""
                    }
                  ></div>
                  <div className="row">
                    <p className="col-auto">OrderID #{this.props.id}</p>
                    {this.props.preBookingDetail && (
                      <label className="ml-auto pre-order">Pre-Order</label>
                    )}
                  </div>
                  <div className="row ">
                    <p className="col-auto">{this.props.items} item</p>
                    {this.props.paymentStatus == 1 && (
                      <p className="ml-auto col-auto paid">Paid</p>
                    )}
                  </div>
                  <div className="row ">
                    <p className="col">{`${this.date.toLocaleTimeString()}`}</p>
                  </div>
                  <div className="row ">
                    <p
                      style={{ fontSize: "16px" }}
                      className="col-auto"
                    >{`${this.date.getDate()}-${
                      this.date.getMonth() + 1
                    }-${this.date.getFullYear()}`}</p>
                    <p
                      className="ml-auto col-auto"
                      style={
                        this.props.preBookingDetail
                          ? { color: "#e22a28", fontSize: "16px" }
                          : { color: "#b1b1b1", fontSize: "14px" }
                      }
                    >
                      {this.props.preBookingDetail
                        ? `${this.props.preBookingDetail.date_of_delivery}`
                        : `${this.minutes} mins ago`}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {this.props.showAll ? (
                  <OldOrderCard
                    toggelBag={this.props.toggelBag}
                    id={this.props.id}
                    items={this.props.items}
                    total_price={this.props.total_price}
                    paymentStatus={this.props.paymentStatus}
                    stage_id={this.props.stage_id}
                    delivery_address_one={this.props.delivery_address_one}
                    time={this.props.time}
                  />
                ) : (
                  <>
                    {this.props.date ===
                      `${this.date.getDate()}-${
                        this.date.getMonth() + 1
                      }-${this.date.getFullYear()}` && (
                      <OldOrderCard
                        toggelBag={this.props.toggelBag}
                        id={this.props.id}
                        items={this.props.items}
                        total_price={this.props.total_price}
                        paymentStatus={this.props.paymentStatus}
                        stage_id={this.props.stage_id}
                        delivery_address_one={this.props.delivery_address_one}
                        time={this.props.time}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
