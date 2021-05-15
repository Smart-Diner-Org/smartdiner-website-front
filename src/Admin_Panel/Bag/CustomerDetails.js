import React, { Component } from "react";

class CustomerDetails extends Component {
  render() {
    return (
      <div class="customer-details">
        <hr />
        <div className="container">
          <>
            <label className="row">Customer Details: </label>
            <br />
          </>

          <div className="final-bill row mt-10">
            <div class="col-5 d-flex flex-column" style={{ lineHeight: "1" }}>
              <h4>{this.props.name}</h4>
              <p>{this.props.delivery_address_one}</p>
              <p>{this.props.delivery_address_two}</p>
            </div>

            <div class="col-auto d-flex flex-column ml-auto align-items-end ">
              {this.props.preBookingDetail && (
                <>
                  <p>
                    Delivery Date:{" "}
                    <strong>{this.props.preBookingDetail.date_of_delivery}</strong>
                  </p>
                  {this.props.preBookingDetail.time_of_delivery && (
                    <p>
                      Delivery Time:{" "}
                      <strong>{this.props.preBookingDetail.time_of_delivery}</strong>
                    </p>
                  )}
                </>
              )}
              <p>{this.props.mobile}</p>
              <p>{this.props.email}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CustomerDetails;
