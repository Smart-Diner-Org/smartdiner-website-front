import React, { Component } from "react";
import PanelTab from "./PanelTab";
import OrderPanel from "./OrderPanel";
import Bag from "../Bag/Bag";
import axios from "axios";

export default class Panel extends Component {
  constructor(props) {
    super();
    this.apiLink = `${process.env.REACT_APP_BACKEND_URL}/`;
    this.state = {
      showBag: false,
      selectedId: null,
      orderMenuDetails: null,
    };
    this.toggelBag = this.toggelBag.bind(this);
  }

  async toggelBag(id) {
    try {
      await axios
        .get(
          `${this.apiLink}after_login/order/${id}/get_menu_quantity_measure_price_details`,
          {
            headers: {
              "x-access-token": `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.setState({
            orderMenuDetails: res.data.orderMenuDetails,
            selectedId: id,
            showBag: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
    // this.setState({showBag:true})
    // this.setState({selectedId:id})
  }

  render() {
    return (
      <div className="panel row">
        <div className={"col-12"}>
          <PanelTab
            setType={this.props.setType}
            displayId={this.props.displayId}
            freshCount={this.props.freshCount}
            onGoingingCount={this.props.onGoingingCount}
            oldCount={this.props.oldCount}
            outForDeliveryCount={this.props.outForDeliveryCount}
            isMobile={this.props.isMobile}
            openSideMenu={this.props.openSideMenu}
            setOpenSideMenu={this.props.setOpenSideMenu}
          />
          <OrderPanel
            selectedBtn={this.props.selectedBtn}
            orders={this.props.orders}
            setType={this.props.setType}
            displayId={this.props.displayId}
            toggelBag={this.toggelBag}
            selectedCard={this.state.selectedId}
            isMobile={this.props.isMobile}
          />
        </div>

        {this.state.showBag &&
          this.props.orders.map((order, index) => {
            if (this.state.selectedId == order.id)
              return (
                <Bag
                  key={index}
                  id={order.id}
                  stage_id={order.stage_id}
                  name={order.customer.name}
                  preBookingDetail={order.preBookingDetail}
                  delivery_address_one={order.delivery_address_one}
                  delivery_address_two={order.delivery_address_two}
                  toggelBag={() =>
                    this.setState({ showBag: false, selectedId: null })
                  }
                  mobile={order.customer.mobile}
                  email={order.customer.email}
                  order_details={this.state.orderMenuDetails}
                  price_details={order.order_detail_menus}
                  total_price={order.total_price}
                  total_mrp_price={order.total_mrp_price}
                  delivery_charge={order.delivery_charge}
                  gstPercentage={order.gst}
                  cancelOrder={this.props.cancelOrder}
                  updateStage={this.props.updateStage}
                  isMobile={this.props.isMobile}
                  delivery_partner_preference_id={
                    this.props.delivery_partner_preference_id
                  }
                />
              );
          })}
      </div>
    );
  }
}
