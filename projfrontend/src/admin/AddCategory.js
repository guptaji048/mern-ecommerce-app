import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { createCategory } from "./helper/adminapicall";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //api call
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-12 text-center">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Category Created
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

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            className="form-control my-3"
            autoFocus
            required
            onChange={handleChange}
            value={name}
            placeholder="For ex. Summer"
          />
          <div className="text-right">
            <button onClick={onSubmit} className="btn btn-outline-warning">
              Create
            </button>
          </div>
        </div>
      </form>
    );
  };
  return (
    <Base
      title="Create Category"
      description="Add category for new T-shirts"
      className="container col-8 p-2 bg-secondary rounded mb-2"
    >
      <div className="row rounded text-white">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
}
