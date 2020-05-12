import React from "react";
import { Api } from "../../backend";

export default function CardHelper({ product }) {
  const imgUrl = product
    ? `${Api}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imgUrl}
        alt=""
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
}
