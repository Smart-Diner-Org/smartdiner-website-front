import React from "react";
import { Link } from "react-router-dom";
import { roles_and_IDs } from "../../helpers/constants";
import Logo from "../assets/images/SmartDiner_logo.png";

import Dropdown from "react-bootstrap/Dropdown";

function Header(props) {
  const [show, setShow] = React.useState(false);

  return (
    <>
      {!props.isMobile ? (
        <div className="admin-header">
          <div className="row d-flex">
            <div className="col-auto d-flex justify-content-around align-items-center">
              {props.logo ? (
                <div>
                  <a href="/">
                    <span><img className="img-fluid" loading="lazy" src={props.logo} alt={`${props.name}`}></img></span>
                  </a>
                  <label className="ml-20 mb-0">{props.name}</label>
                </div>
              ) : (
                  <>
                    <img className="img-fluid" loading="lazy" src={Logo} alt={`${props.name}`}></img>
                    <label className="ml-20 mb-0">{props.name}</label>
                  </>
                )
              }
            </div>
            <div className="col-auto ml-auto d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-custom-components">
                  <div className="user-btn" onclick={() => setShow(!show)}>
                    <i class="lni lni-user user-icon"></i>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu show={show}>
                  <Dropdown.Item>Welcome, {props.employeeName} </Dropdown.Item>
                  <Dropdown.Item>
                    {props.roleID === roles_and_IDs["Super Admin"] && (
                      <Link to="/createOfflineOrders">
                        Create Offline Orders
                </Link>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {props.roleID === roles_and_IDs["Smart Diner Super Admin"] && (
                      <Link to="/create-restaurant">
                        Create New Restaurant
                      </Link>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {props.roleID === roles_and_IDs["Super Admin"] && (
                      <Link to="/admin-panel/edit-menu">
                        Edit Menu
                </Link>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      localStorage.removeItem("token");
                    }}
                  >
                    <Link to="/login">Logout</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </div>
          </div>
        </div>
      ) : (
          <div className="adminPanel-mob-header">
            <div className="toggle_icon" onClick={props.setOpenSideMenu}>
              <span></span>
            </div>
            <h6 className="mt-10 mb-0">{props.name}</h6>
            <div className="d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-custom-components">
                  <div className="user-btn" onclick={() => setShow(!show)}>
                    <i class="lni lni-user user-icon"></i>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu show={show}>
                  <Dropdown.Item>Welcome,{props.employeeName} </Dropdown.Item>
                  <Dropdown.Item>
                    {props.roleID === roles_and_IDs["Super Admin"] && (
                      <Link to="/createOfflineOrders">
                        Create Offline Orders
                </Link>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {props.roleID === roles_and_IDs["Smart Diner Super Admin"] && (
                      <Link to="/create-restaurant">
                        Create New Restaurant
                      </Link>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {props.roleID === roles_and_IDs["Super Admin"] && (
                      <Link to="/admin-panel/edit-menu">
                        Edit Menu
                </Link>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      localStorage.removeItem("token");
                    }}
                  >
                    <Link to="/login">Logout</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </div>
          </div>
        )}
    </>
  );
}

export default Header;
