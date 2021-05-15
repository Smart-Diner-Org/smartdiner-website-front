import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Landing_Page/assets/img/white.png";

export default class PanelTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStageButtons: [],
    };
  }
  static getDerivedStateFromProps(nextProps) {
    const orderStageButtonsArray = [
      {
        name: "New Orders",
        count: nextProps.freshCount,
        orderStages: [1],
        type: "fresh",
        color: "#e22a28",
      },
      {
        name: "Preparing Orders",
        count: nextProps.onGoingingCount,
        orderStages: [2, 3, 4, 5],
        type: "onGoing",
        color: "#ffc009",
      },
      {
        name: "Out for delivery",
        count: nextProps.outForDeliveryCount,
        orderStages: [6],
        type: "outForDelivery",
        color: "#fb8238",
      },
      {
        name: "Completed Orders",
        count: nextProps.oldCount,
        orderStages: [7, 8, 9],
        type: "old",
        color: "#08a860",
      },
    ];
    return { orderStageButtons: orderStageButtonsArray };
  }
  render() {
    return (
      <>
        {this.props.isMobile ? (
          <div
            className={
              this.props.openSideMenu ? "panelTabMob open" : "panelTabMob"
            }
          >
            <div className="side_menu">
              <div className="logo">
                <Link to="/">
                  <img className="img-fluid" loading="lazy" src={Logo} alt="" />
                </Link>
              </div>
              <ul className="list menu-left">
                {this.state.orderStageButtons.map((btn) => {
                  return (
                    <button
                      className={
                        JSON.stringify(this.props.displayId) ===
                        JSON.stringify(btn.orderStages)
                          ? "orderstage-btn active"
                          : " orderstage-btn "
                      }
                      onClick={() => {
                        this.props.setType(`${btn.type}`);
                        this.props.setOpenSideMenu();
                      }}
                    >
                      <p className="col-10">{btn.name}</p>
                      {Number(btn.count) > 0 && (
                        <div
                          className="count-box"
                          style={{ backgroundColor: `${btn.color}` }}
                        >
                          {btn.count}
                        </div>
                      )}
                    </button>
                  );
                })}
              </ul>
              <Link
                className="side_menu_create-offline-btn"
                to="/createOfflineOrders"
              >
                Create Offline Orders
              </Link>
              <button
                className="hide-sideMenu-btn"
                onClick={this.props.setOpenSideMenu}
              >
                <i class="lni lni-exit"></i>Back
              </button>
            </div>
          </div>
        ) : (
          <div className="panelTab mt-75">
            {this.state.orderStageButtons.map((btn) => {
              return (
                <button
                  className={
                    JSON.stringify(this.props.displayId) ===
                    JSON.stringify(btn.orderStages)
                      ? "row justify-content-between out-line"
                      : "row justify-content-between "
                  }
                  style={{ backgroundColor: `${btn.color}` }}
                  onClick={() => {
                    this.props.setType(`${btn.type}`);
                  }}
                >
                  <p className="col-6">{btn.name}</p>
                  {Number(btn.count) > 0 ? (
                    <label className="col-4">{btn.count}</label>
                  ) : (
                    ""
                  )}
                </button>
              );
            })}
          </div>
        )}
      </>
    );
  }
}
