import React, { Component, lazy, Suspense } from "react";
import "./assets/css/style.css";
import "./assets/css/preloader.css";
import Logo from "../Landing_Page/assets/img/white.png";
import UserProfile from "../helpers/userProfile";
import axios from "axios";
import { roles_and_IDs } from "../helpers/constants";
import PreLoader from "./PreLoader";
import { Link } from "react-router-dom";

const Header = lazy(() => import("./SuperAdminPanel/Header"));
const Panel = lazy(() => import("./SuperAdminPanel/Panel"));
const Footer = lazy(() => import("./Footer"));
const SmartDinerSuperAdmin = lazy(() =>
  import("./SmartDinerSuperAdmin/SmartDinerSuperAdmin")
);

export default class Home extends Component {
  constructor(props) {
    super();

    this.apiLink = `${process.env.REACT_APP_BACKEND_URL}/`;
    this.state = {
      isLoaded: false,
      isLoggedOut: false,
      restaurantInfo: [{}],
      orders: [{}],
      successMessage: "",
      errorMessage: "",
      showComponent: "fresh",
      displayId: [1],
      freshCount: null,
      onGoingingCount: null,
      outForDeliveryCount: null,
      oldCount: null,
      restaurantEmployeeName: "",
      delivery_partner_preference_id: "",
      isMobile: false,
      openSideMenu: false,
      roleID: null,
      allRestaurant: null,
    };
    this.count = this.count.bind(this);
    this.setType = this.setType.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.updateStage = this.updateStage.bind(this);
  }

  async componentDidMount() {
    //API call to get data from backend
    if (Number(window.screen.width) <= Number(769)) {
      this.setState({ isMobile: true });
    }
    try {
      const roleID = localStorage.getItem("profileRoleID");
      this.setState({ roleID: roleID });
      switch (roleID) {
        case roles_and_IDs["Super Admin"]:
          await axios
            .get(`${this.apiLink}after_login/restaurant/get_details`, {
              headers: {
                "x-access-token": `${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              this.setState({ successMessage: res.data.message });
              sessionStorage.setItem(
                "RestName",
                res.data.restaurantEmployee.restaurant_branch.restaurant.name
              );

              this.setState({
                restaurantInfo: res.data.restaurantEmployee.restaurant_branch,
                restaurantEmployeeName:
                  res.data.restaurantEmployee.customer.name,
              });
              localStorage.setItem(
                "resturantBranchID",
                res.data.restaurantEmployee.restaurant_branch
                  .restaurant_branch_menu[0].restuarant_branch_id
              );
            })
            .catch((error) => {
              switch (error.response.status) {
                case 401:
                case 403:
                  UserProfile.clearUser();
                  this.setState({
                    isLoggedOut: true,
                  });
                  break;
                default:
                  let er = error?.response?.data?.message;
                  console.log(er);
                  this.setState({ errorMessage: er });
                  break;
              }
            });
          let branchId = this.state.restaurantInfo.id;
          await axios
            .get(
              `${this.apiLink}after_login/restaurant/${branchId}/get_orders`,
              {
                headers: {
                  "x-access-token": `${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res2) => {
              this.setState({
                orders: res2.data.orders,
                isLoaded: true,
              });
              this.count(res2.data.orders);
            })
            .catch((error2) => {
              console.log("Failed while fetching orders");
              switch (error2.response.status) {
                case 401:
                case 403:
                  UserProfile.clearUser();
                  this.setState({
                    isLoggedOut: true,
                  });
                  break;
                default:
                  let er = error2?.response?.data?.message;
                  console.log(er);
                  this.setState({ errorMessage: er });
                  break;
              }
            });
          break;
        case roles_and_IDs["Smart Diner Super Admin"]:
          await axios
            .get(`${this.apiLink}after_login/restaurants/all`, {
              headers: {
                "x-access-token": `${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              this.setState({
                isLoaded: true,
                allRestaurant: res.data.restaurants,
              });
            })
            .catch((error) => {
              let er = error?.response?.data?.message;
              console.log(er);
              this.setState({ errorMessage: er });
            });

          break;
        default:
          alert("Missing Role ID");
      }
    } catch {}
  }

  count(orders) {
    let freshCount = 0;
    let onGoingingCount = 0;
    let outForDeliveryCount = 0;
    let oldCount = 0;
    orders.map((order) => {
      if ([1].includes(Number(order.stage_id))) {
        freshCount = freshCount + 1;
      } else if ([2, 3, 4, 5].includes(Number(order.stage_id))) {
        onGoingingCount = onGoingingCount + 1;
      } else if ([6].includes(Number(order.stage_id))) {
        outForDeliveryCount = outForDeliveryCount + 1;
      } else if ([7, 8, 9].includes(Number(order.stage_id))) {
        oldCount = oldCount + 1;
      }
    });
    this.setState({
      freshCount: freshCount,
      onGoingingCount: onGoingingCount,
      outForDeliveryCount: outForDeliveryCount,
      oldCount: oldCount,
    });
  }

  setType(type) {
    //to display respective items for menu items selected
    this.setState({
      showComponent: type,
    });
    if (type === "fresh") {
      this.setState({ displayId: [1] });
    } else if (type === "onGoing") {
      this.setState({ displayId: [2, 3, 4, 5] });
    } else if (type === "outForDelivery") {
      this.setState({ displayId: [6] });
    } else if (type === "old") {
      this.setState({ displayId: [7, 8, 9] });
    }
  }

  async cancelOrder(orderId) {
    const data = {
      cancellationReason: "Others", //Need to change this. Need to display a drop down and let the restaurant to pick a reason from the drop down
    };

    await axios
      .post(`${this.apiLink}after_login/order/${orderId}/cancel`, data, {
        headers: {
          "x-access-token": `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.setState({
          orders: res.data.orders,
          successMessage: "Successfully Cancelled",
          isLoaded: true,
          errorMessage: null,
        });
        this.count(res.data.orders);
        let self = this;
        setInterval(function () {
          self.setState({
            successMessage: null,
          });
        }, 5000);
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
        });
        this.setState({ successMessage: null });
        if (error && error.response && error.response.data) {
          let er = error.response.data.message;
          console.log(er);
          this.setState({ errorMessage: er });
        } else console.log(error);
      });
  }

  async updateStage(newStage, orderId) {
    const data = {
      stageId: newStage,
    };
    await axios
      .post(`${this.apiLink}after_login/order/${orderId}/update_status`, data, {
        headers: {
          "x-access-token": `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.setState({
          orders: res.data.orders,
          successMessage: "Successfully Changed",
          isLoaded: true,
          errorMessage: null,
        });
        this.count(res.data.orders);
        let self = this;
        setInterval(function () {
          self.setState({
            successMessage: null,
          });
        }, 5000);
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
        });
        this.setState({ successMessage: null });
        if (error && error.response && error.response.data) {
          let er = error.response.data.message;
          console.log(er);
          this.setState({ errorMessage: er });
        } else console.log(error);
      });
  }

  setOpenSideMenu = () => {
    this.setState({ openSideMenu: !this.state.openSideMenu });
  };
  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <PreLoader />;
    } else {
      switch (this.state.roleID) {
        case roles_and_IDs["Super Admin"]:
          return (
            <div className="wrapper">
              <Suspense fallback={<PreLoader />}>
                <Header
                  name={this.state.restaurantInfo.restaurant.name}
                  logo={this.state.restaurantInfo.restaurant.logo}
                  employeeName={this.state.restaurantEmployeeName}
                  roleID={this.state.roleID}
                  isMobile={this.state.isMobile}
                  setOpenSideMenu={this.setOpenSideMenu}
                />
                <Panel
                  setType={this.setType}
                  selectedBtn={this.state.showComponent}
                  orders={this.state.orders}
                  displayId={this.state.displayId}
                  cancelOrder={this.cancelOrder}
                  updateStage={this.updateStage}
                  freshCount={this.state.freshCount}
                  onGoingingCount={this.state.onGoingingCount}
                  oldCount={this.state.oldCount}
                  outForDeliveryCount={this.state.outForDeliveryCount}
                  isMobile={this.state.isMobile}
                  openSideMenu={this.state.openSideMenu}
                  setOpenSideMenu={this.setOpenSideMenu}
                  delivery_partner_preference_id={this.state.restaurantInfo.delivery_partner_preference_id}
                  deliveryStageId={this.state.orders[0].delivery_requests[0].delivery_stage_id}
                />
                {!this.state.isMobile && <Footer />}
              </Suspense>
            </div>
          );

        case roles_and_IDs["Smart Diner Super Admin"]:
          return (
            <Suspense fallback={<PreLoader />}>
              <Header
                name={"Smart Diner Super Admin"}
                employeeName={null}
                roleID={this.state.roleID}
                isMobile={this.state.isMobile}
                setOpenSideMenu={this.setOpenSideMenu}
              />
              {this.state.isMobile && (
                <div
                  className={
                    this.state.openSideMenu ? "panelTabMob open" : "panelTabMob"
                  }
                >
                  <div className="side_menu" style={{ minWidth: "100%" }}>
                    <div className="logo">
                      <Link to="/">
                        <img
                          className="img-fluid"
                          loading="lazy"
                          src={Logo}
                          alt=""
                        />
                      </Link>
                    </div>
                    <ul className="list menu-left">
                      <Link
                        className=" orderstage-btn pl-50"
                        to="/create-restaurant"
                        style={{ fontSize: "24px" }}
                      >
                        Create Restaurant
                      </Link>
                      <Link
                        className=" orderstage-btn pl-50"
                        to="/login"
                        style={{ fontSize: "24px" }}
                      >
                        Log Out
                      </Link>
                    </ul>
                    <button
                      className="hide-sideMenu-btn"
                      onClick={this.setOpenSideMenu}
                    >
                      <i class="lni lni-exit"></i>Back
                    </button>
                  </div>
                </div>
              )}
              <SmartDinerSuperAdmin allRestaurant={this.state.allRestaurant} />
              {!this.state.isMobile && <Footer />}
            </Suspense>
          );

        default:
      }
    }
  }
}
