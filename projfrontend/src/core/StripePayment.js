import React, { useState } from "react";
import { emptyCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";
/*import { createOrder } from "./helper/OrderHelper";*/
import { isAuthenticated } from "../auth/helper";
import StripeCheckout from "react-stripe-checkout";
import { Api } from "../backend";

const StripePayment = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    error: ""
  });

  const { loading, success, error } = info;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const totalAmount = products => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };
  const makePayment = token => {
    setInfo({ ...info, error: false, loading: true });
    const body = { products, token };
    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`${Api}/stripepayment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(async response => {
        setInfo({ ...info, success: true, error: true });
        const data = await response.json();
        const billing_details = await data.billing_details;
        const address = await billing_details.address;
        const orderData = {
          products: products,
          transaction_id: data.id,
          amount: data.amount,
          address: address.line1
        };
        /*createOrder(userId, toke, orderData).catch(err => {
          setInfo({ ...info, success: false, error: err });
        });*/
        emptyCart(() => {
          setReload(!reload);
        });
      })
      .catch(error => {
        setInfo({ ...info, success: false, error: error });
      });
  };

  const stripButton = () => {
    return isAuthenticated() ? (
      <StripeCheckout
        stripeKey="pk_test_53Lxyz5TiQsKy0ZkV9onupge009kV6JpMD"
        token={makePayment}
        amount={totalAmount(products) * 100}
        currency="INR"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Proceed to Pay</button>
      </StripeCheckout>
    ) : (
      <span>
        To proceed further
        <Link to="/signin" className="text-warning">
          Sign in
        </Link>
      </span>
    );
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
            style={{ display: success ? "" : "none" }}
          >
            Order Placed.!
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

  return (
    <div>
      <h3>Your bill is ₹{totalAmount(products)}</h3>
      {stripButton()}
      {loadingMessage()}
      {successMessage()}
      {errorMessage()}
    </div>
  );
};

export default StripePayment;
