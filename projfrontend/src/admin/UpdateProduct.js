import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import {
  getAllCategory,
  getProduct,
  updateProduct
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
export default function UpdateProduct({ match }) {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    error: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    createdProduct: "",
    getRedirect: false,
    formData: "",
    success: false
  });

  const {
    name,
    description,
    price,
    stock,
    error,
    categories,
    category,
    loading,
    createdProduct,
    formData
  } = values;

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, error: false, [name]: value });
  };

  const preload = productId => {
    getProduct(productId).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategory();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category.name,
          stock: data.stock,
          formData: new FormData()
        });
      }
    });
  };

  const preloadCategory = () => {
    getAllCategory().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          category: data.name,
          formData: new FormData()
        });
      }
    });
  };
  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(user._id, token, formData, match.params.productId)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            stock: "",
            loading: false,
            createdProduct: data.name
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
            style={{ display: createdProduct ? "" : "none" }}
          >
            {createdProduct} Updated!!
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

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          /*name="photo"*/
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          value={category}
        >
          <option>{category}</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
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
      title="Update Product"
      description="Edit product details"
      className="container text-white p-4"
    >
      <Link to="/admin/product/all" className="btn btn-md btn-info mb-3">
        Manage Product
      </Link>
      <div className="row text-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
}
