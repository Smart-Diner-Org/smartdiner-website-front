import React, { Component } from "react";

export class OldOrderCard extends Component {
  constructor(props) {
    super(props);
    this.date = new Date(this.props.time);
    this.minutes = Math.round((new Date() - this.date) / 1000 / 60);
  }
  render() {
    return (
      <div
        className="old-order"
        onClick={() => {
          this.props.toggelBag(this.props.id);
        }}
      >
        <p className="col-2">OrderID #{this.props.id}</p>
        <p className="col-3  ">
          {this.props.items} item for Rs.{this.props.total_price}
        </p>
        <p
          className="col-1  "
          style={{
            color: "#08a860",
            fontFamily: "MuseoModerno",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {this.props.paymentStatus == 1 && "Paid"}{" "}
        </p>
        <div className="col-2">
          <p className="row ">{`${this.date.toLocaleTimeString()}`}</p>
          <p className="row ">{`${this.date.getDate()}-${
            this.date.getMonth() + 1
          }-${this.date.getFullYear()}`}</p>
        </div>
        <p
          className="col-2 "
          style={
            Number(this.props.stage_id) === 9
              ? { color: "#e22a28", fontWeight: "900" }
              : {}
          }
        >
          {Number(this.props.stage_id) === 9 ? "Cancelled" : " "}
        </p>
        <p className="col-2  ">{this.props.delivery_address_one}</p>
      </div>
    );
  }
}

export default OldOrderCard;
