import React from "react";
import Table from "react-bootstrap/Table";
import "./assets/SmartDinerSuperAdmin.css";

function SmartDinerSuperAdmin({ allRestaurant }) {
  return (
    <div className="container smartdiner-superadmin-home ">
      <Table borderless hover>
        <thead>
          <th>#</th>
          <th>Restaurant Name</th>
          <th>Status</th>
          <th>Joined Date</th>
        </thead>
        <tbody>
          {allRestaurant.map((restaurant, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <h4>{restaurant.name}</h4>
              </td>
              <td>
                <strong>{restaurant.status ? "Active" : "Inactive"}</strong>
              </td>
              <td>{restaurant.createdAt.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SmartDinerSuperAdmin;
