import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

export default function AdminDashBoard() {
  const {
    user: { name, email }
  } = isAuthenticated();

  const adminLeftPanel = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white"> Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              className="nav-link text-dark text-center"
              to="/admin/create/category"
            >
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link text-dark text-center"
              to="/admin/categories"
            >
              Manage Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link text-dark text-center"
              to="/admin/create/product"
            >
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link text-dark text-center"
              to="/admin/product/all"
            >
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link text-dark text-center"
              to="/admin/order/all"
            >
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightPanel = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-dark text-white"> Admin Information </h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge mr-2">Email:</span>
            {email}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome Admin"
      description="Manage everything from here"
      className="container bg-secondary p-4 mb-5"
    >
      <div className="row">
        <div className="col-3">{adminLeftPanel()}</div>
        <div className="col-9">{adminRightPanel()}</div>
      </div>
    </Base>
  );
}
