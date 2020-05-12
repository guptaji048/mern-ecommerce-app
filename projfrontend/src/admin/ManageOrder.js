import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { getAllOrder } from "./helper/adminapicall";

export default function ManageOrder() {
  const [cates, setCate] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllOrder(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCate(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  /*const removeCategory = categoryId => {
    deleteCategory(user._id, categoryId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };*/

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All Orders:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {cates.length} orders
          </h2>

          {cates.map((category, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-6">
                  <h3 className="text-white text-left">{category._id}</h3>
                </div>

                <div className="col-6">
                  <button onClick={() => {}} className="btn btn-danger">
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
