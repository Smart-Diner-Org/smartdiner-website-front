import React, { Component } from "react";

class BillItem extends Component {
  render() {
    return (
      <div className="bag-item">
        <div className="row d-flex align-items-center">
          <div className="col-3 p-0">
            <div className="image-container">
              {this.props.image ? (
                <>
                  <img src={this.props.image} alt="Product" />
                </>
              ) : (
                <img src="" alt="Product" />
              )}
            </div>
          </div>
          <div className="col-9 p-0">
            <div className="row mt-10 mb-10">
              <label className="col-6 mt-0 pt-0" style={{ color: "#e22a28" }}>
                <i class="lni lni-dinner"></i>
              </label>
              <label className="col-6 mt-0 pt-0">
                {this.props.quantity_values} {this.props.measure_values}
              </label>
            </div>
            <div className="row mt-10 mb-10">
              <div className="col-6 des">
                <h4 className="itemname">{this.props.itemName}</h4>
                <h6 className="containment">{this.props.description}</h6>
              </div>

              <div
                className="col-3 price-display"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {this.props.discount > 0 ? (
                  <>
                    <label className="disc-price">Rs.{this.props.price}</label>
                    <label>Rs.{this.props.discountPrice}</label>
                  </>
                ) : (
                  <label>Rs.{this.props.price}</label>
                )}
              </div>
              <div className="col-3 ml-auto quantity">{this.props.quantity}</div>
            </div>
            <div className="row col-6">
              {this.props.discount > 0 ? (
                <>
                  <h3 className="offer-applied">
                    {(((this.props.price - this.props.discountPrice) /
                      this.props.price) *
                      100).toFixed()}
                    % OFFER APPLIED
                  </h3>
                </>
              ) : (
                <div>
                  <br />
                </div>
              )}
            </div>

            {/* <div className="row">
                                <div className='top-up'>
                                    <button className="col-3" >Extra Cheese</button>
                                    <button className="col-3" >Extra suger</button>
                                    <button className="col-3" >Extra Patty</button>
                                </div>
                            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default BillItem;
