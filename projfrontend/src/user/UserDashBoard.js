import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getUser } from "./helper/userapicalls";
export default function UserDashBoard() {
  const { user, token } = isAuthenticated();

  const [info, setinfo] = useState({
    address: "",
    pincode: "",
    city: "",
    number: "",
    name: "",
    email: ""
  });
  const { address, pincode, city, number, name, email } = info;

  getUser(user._id, token).then(async response => {
    const data = await response;
    setinfo({
      ...info,
      address: data.address,
      pincode: data.pincode,
      city: data.city,
      number: data.number,
      name: data.name,
      email: data.email
    });
  });

  const adminRightPanel = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-dark text-white"> User Information </h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge mr-2">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge mr-2">Address:</span>
            {address}
          </li>
          <li className="list-group-item">
            <span className="badge mr-2">City:</span>
            {city}
          </li>
          <li className="list-group-item">
            <span className="badge mr-2">Pincode:</span>
            {pincode}
          </li>
          <li className="list-group-item">
            <span className="badge mr-2">Number:</span>
            {number}
          </li>
        </ul>
        <button className="btn btn-block col-md-4 offset-md-4 btn-warning mt-2 mb-2">
          <Link className="nav-link text-dark text-center" to="/user/update">
            Update info
          </Link>
        </button>
      </div>
    );
  };

  return (
    <Base
      title="Welcome User"
      description="Manage everything from here"
      className="container bg-secondary p-4 mb-5"
    >
      <div className="row">
        <div className="col-12">{adminRightPanel()}</div>
      </div>
    </Base>
  );
}
