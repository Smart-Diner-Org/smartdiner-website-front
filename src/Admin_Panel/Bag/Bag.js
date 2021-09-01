import React, { Component } from "react";
import BagItemList from "./BagItemList";
import CustomerDetails from "./CustomerDetails";
import Delivery from "./Delivery";
import Bill from "./Bill";
import "../assets/css/bag.css";
import getPercentageFromBaseAndFinalValue from "../../helpers/CommonFunctions";
import { deliveryStageStatus } from "../../helpers/constants";

class Bag extends Component {


  render() {

    const [totalAfterMrpDiscount, dicountedMrpPercentage, gstAmount, delivery_charge_gst] = getPercentageFromBaseAndFinalValue(
      this.props.total_price,
      this.props.total_mrp_price,
      this.props.delivery_charge,
      this.props.gstPercentage,

    );

    return (
      <div
        className="bag-component pr-10 pl-10"
        style={this.props.isMobile ? { position: "fixed", top: "0" } : {}}
      >
        <header className="bag-header">
          <div className="row">
            <div className="col-auto mr-auto p-0">
              <button className="bag-close" onClick={this.props.toggelBag}>
                X
              </button>
            </div>
            <div className="col-auto">
              <label className="mt-10">Order ID #{this.props.id}</label>
            </div>

            {/* <div className="row"> */}
            <div className="ml-150 col-auto">
              <label className="mt-10">{deliveryStageStatus[this.props.deliveryStageId]}</label>
            </div>
          </div>
        </header>

        <BagItemList
          order_details={this.props.order_details}
          price_details={this.props.price_details}
        />

        <Bill
          total_price={this.props.total_price}
          total_mrp_price={this.props.total_mrp_price}
          delivery_charge={this.props.delivery_charge}
          gstPercentage={this.props.gstPercentage}
          gstAmount={gstAmount}
          delivery_charge_gst={delivery_charge_gst}
          totalAfterMrpDiscount={totalAfterMrpDiscount}
          dicountedMrpPercentage={dicountedMrpPercentage}
        />

        <CustomerDetails
          preBookingDetail={this.props.preBookingDetail}
          orderId={this.props.id}
          name={this.props.name}
          delivery_address_one={this.props.delivery_address_one}
          delivery_address_two={this.props.delivery_address_two}
          mobile={this.props.mobile}
          email={this.props.email}
        />

        <Delivery
          delivery_partner_preference_id={
            this.props.delivery_partner_preference_id
          }
          toggelBag={this.props.toggelBag}
          orderId={this.props.id}
          stage_id={this.props.stage_id}
          cancelOrder={this.props.cancelOrder}
          updateStage={this.props.updateStage}

        />
      </div>
    );
  }
}

export default Bag;