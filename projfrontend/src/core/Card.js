import React, { useState } from "react";
import CardHelper from "./helper/CardHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";

const Card = ({
  product,
  addCart = true,
  removeCart = false,
  title = "A photo from pexels",
  description = "this photo looks great",
  price = "5",
  setreload = f => f,
  reload = undefined
}) => {
  const [redirect, setredirect] = useState(false);
  /*const [count, setcount] = useState(product.count);*/
  const addToCart = () => {
    addItemToCart(product, () => {
      setredirect(true);
    });
  };

  const getRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = addCart => {
    return (
      addCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveCart = removeCart => {
    return (
      removeCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setreload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{title}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <CardHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">₹ {price}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addCart)}</div>
          <div className="col-12">{showRemoveCart(removeCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
