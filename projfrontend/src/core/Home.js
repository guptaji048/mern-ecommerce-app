import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls.js";

export default function Home() {
  const [products, setproducts] = useState([]);
  const [error, seterror] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        seterror(data.error);
      } else {
        setproducts(data);
      }
    });
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

  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base
      title="T-store"
      description="Checkout our latest collection of I Write Code t-shirts"
    >
      <div className="row text-center">
        <div className="row">
          {errorMessage()}
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card
                  product={product}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
