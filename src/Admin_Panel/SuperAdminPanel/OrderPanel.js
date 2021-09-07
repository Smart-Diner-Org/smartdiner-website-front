import React, { Component } from "react";
import DateFilterComponent from "./DateFilterComponent";
import OrderCard from "./OrderCard";

const today = new Date();

export default class OrderPanel extends Component {
  constructor(props) {
    super();
    this.date = `${today.getDate()}-${
      today.getMonth() + 1
    }-${today.getFullYear()}`;
    this.state = {
      date: this.date,
      showAll: true,
      runningOrder: false,
      preOrders: false,
      preOrderDate: `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  check(){
    this.props.orders.map((val,index)=>{
       return <>{console.log(val)}</>
    })
  }
  handleChange(event) {
    let { name, value } = event.target;
    value = new Date(value);
    let preOrderDate = `${value.getFullYear()}-${
      value.getMonth() + 1
    }-${value.getDate()}`;
    value = `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;

    this.setState({
      [name]: value,
      showAll: false,
      preOrderDate: preOrderDate,
    });
  }

  render() {
    return (
      <div
        className={this.props.isMobile ? "order-panel-mob-view" : "order-panel"}
      >
        {!this.props.isMobile && (
          <>
            {JSON.stringify(this.props.displayId) ==
            JSON.stringify([7, 8, 9]) ? (
              <DateFilterComponent
                defaultValue={this.state.date}
                onChange={this.handleChange}
                today={this.date}
                date={this.state.date}
                showAll={this.state.showAll}
                showAllClick={() => {
                  this.setState({ showAll: true });
                }}
              />
            ) : (
              <DateFilterComponent
                defaultValue={this.state.date}
                onChange={this.handleChange}
                today={this.date}
                date={this.state.date}
                showAll={this.state.showAll}
                showAllClick={() => {
                  this.setState({ showAll: true });
                }}
                preOrder={"Pre Orders"}
                runningOrder={"Running Orders"}
                setPreOrder={() => {
                  this.setState({
                    preOrders: true,
                    runningOrder: false,
                    showAll: false,
                  });
                }}
                setRunningOrder={() => {
                  this.setState({
                    runningOrder: true,
                    preOrders: false,
                    showAll: false,
                  });
                }}
              />
            )}
          </>
        )}
        {this.props.orders.map((order, index) => {
          if (this.props.displayId.includes(Number(order.stage_id))) {
            if (this.state.runningOrder && order.preBookingDetail === null) {
              return (
                <OrderCard
                  key={index}
                  selectedCard={this.props.selectedCard}
                  paymentStatus={order.payment_status_id}
                  time={order.createdAt}
                  date={this.state.date}
                  id={order.id}
                  preBookingDetail={order.preBookingDetail}
                  items={order.order_detail_menus.length}
                  toggelBag={this.props.toggelBag}
                  displayId={this.props.displayId}
                  total_price={order.total_price}
                  delivery_address_one={order.delivery_address_one}
                  showAll={this.state.showAll}
                  stage_id={order.stage_id}
                  isMobile={this.props.isMobile}
                  deliveryStageId={order.delivery_requests && order.delivery_requests.length > 0?order.delivery_requests[0].delivery_stage_id:0}
                />
              );
            } else if (
              this.state.preOrders &&
              order.preBookingDetail &&
              this.state.preOrderDate ===
                `${new Date(
                  order.preBookingDetail.date_of_delivery
                ).getFullYear()}-${
                  new Date(order.preBookingDetail.date_of_delivery).getMonth() +
                  1
                }-${new Date(
                  order.preBookingDetail.date_of_delivery
                ).getDate()}`
            ) {
              return (
                <OrderCard
                  key={index}
                  selectedCard={this.props.selectedCard}
                  paymentStatus={order.payment_status_id}
                  time={order.createdAt}
                  date={this.state.date}
                  id={order.id}
                  preBookingDetail={order.preBookingDetail}
                  items={order.order_detail_menus.length}
                  toggelBag={this.props.toggelBag}
                  displayId={this.props.displayId}
                  total_price={order.total_price}
                  delivery_address_one={order.delivery_address_one}
                  showAll={this.state.showAll}
                  stage_id={order.stage_id}
                  isMobile={this.props.isMobile}
                  deliveryStageId={order.delivery_requests && order.delivery_requests.length > 0?order.delivery_requests[0].delivery_stage_id:0}
                />
              );
            } else if (this.state.showAll) {
              return (
                <OrderCard
                  key={index}
                  selectedCard={this.props.selectedCard}
                  paymentStatus={order.payment_status_id}
                  time={order.createdAt}
                  date={this.state.date}
                  id={order.id}
                  preBookingDetail={order.preBookingDetail}
                  items={order.order_detail_menus.length}
                  toggelBag={this.props.toggelBag}
                  displayId={this.props.displayId}
                  total_price={order.total_price}
                  delivery_address_one={order.delivery_address_one}
                  showAll={this.state.showAll}
                  stage_id={order.stage_id}
                  isMobile={this.props.isMobile}
                  deliveryStageId={order.delivery_requests && order.delivery_requests.length > 0 ? order.delivery_requests[0].delivery_stage_id : 0}
                />
              );
            } else if (
              JSON.stringify(this.props.displayId) === JSON.stringify([7, 8, 9])
            ) {
              return (
                <OrderCard
                  key={index}
                  selectedCard={this.props.selectedCard}
                  paymentStatus={order.payment_status_id}
                  time={order.createdAt}
                  date={this.state.date}
                  id={order.id}
                  preBookingDetail={order.preBookingDetail}
                  items={order.order_detail_menus.length}
                  toggelBag={this.props.toggelBag}
                  displayId={this.props.displayId}
                  total_price={order.total_price}
                  delivery_address_one={order.delivery_address_one}
                  showAll={this.state.showAll}
                  stage_id={order.stage_id}
                  isMobile={this.props.isMobile}
                  deliveryStageId={order.delivery_requests && order.delivery_requests.length > 0?order.delivery_requests[0].delivery_stage_id:0}
                />
              );
            }
          }
        })}
      </div>
    );
  }
}
