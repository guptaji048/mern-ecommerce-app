import React, { useState, useEffect, Fragment } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper.js";
import StripePayment from "./StripePayment.js";

export default function Cart() {
  const [products, setproducts] = useState([]);
  const [reload, setreload] = useState(false);

  useEffect(() => {
    setproducts(loadCart());
  }, [reload]);

  const loadAllProducts = products => {
    return (
      <div>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              removeCart={true}
              addCart={false}
              title={product.name}
              description={product.description}
              price={product.price}
              setreload={setreload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Base title="Your Cart" description="Summary of your purchase">
      <div className="row">
        {products.length > 0 ? (
          <Fragment>
            <div className="col-6">{loadAllProducts(products)}</div>
            <div className="col-6">
              <StripePayment products={products} setReload={setreload} />
            </div>
          </Fragment>
        ) : (
          <h3 className="col-12 text-center text-danger">Cart Empty</h3>
        )}
      </div>
    </Base>
  );
}
