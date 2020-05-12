import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { updateUser, getUser } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

export default function UpdateUser() {
  const { user, token } = isAuthenticated();
  const id = isAuthenticated() && isAuthenticated().user._id;
  const [values, setValues] = useState({
    address: "",
    pincode: "",
    city: "",
    number: "",
    name: "",
    email: "",
    loading: false,
    success: false,
    createdUser: "",
    formData: "",
    error: ""
  });
  const {
    address,
    pincode,
    city,
    number,
    name,
    email,
    loading,
    createdUser,
    formData,
    error
  } = values;

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, error: false, [name]: value });
  };

  const preload = (id, token) => {
    getUser(id, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          address: data.address,
          pincode: data.pincode,
          city: data.city,
          number: data.number,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    preload(id, token);
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateUser(user._id, token, formData)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            address: "",
            pincode: "",
            city: "",
            number: "",
            name: "",
            email: "",
            loading: false,
            createdUser: data.name
          });
        }
      })
      .catch();
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-12 text-center">
          <div
            className="alert alert-success"
            style={{ display: createdUser ? "" : "none" }}
          >
            {createdUser} Updated!!
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-12 text-center">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const createUserForm = () => (
    <form>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="user"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("email")}
          name="user"
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("address")}
          name="user"
          className="form-control"
          placeholder="Address"
          value={address}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("number")}
          name="user"
          type="number"
          className="form-control"
          placeholder="Mobile Number"
          value={number}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("pincode")}
          name="user"
          type="number"
          className="form-control"
          placeholder="Pincode"
          value={pincode}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("city")}
          name="user"
          className="form-control"
          placeholder="City"
          value={city}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-warning"
      >
        Update Product
      </button>
    </form>
  );
  return (
    <Base
      title="Update User"
      description="Edit your details"
      className="container text-white p-4"
    >
      <Link to="/user/dashboard" className="btn btn-md btn-info mb-3">
        Dashboard
      </Link>
      <div className="row text-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {createUserForm()}
        </div>
      </div>
    </Base>
  );
}
