import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Signout from "./user/Signout";
import Profile from "./user/Profile";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategory from "./admin/ManageCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";
import ManageOrder from "./admin/ManageOrder";
import UpdateUser from "./user/UpdateUser";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signout" exact component={Signout} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/user/update" exact component={UpdateUser} />

        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/user/profile" exact component={Profile} />

        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute path="/admin/categories" exact component={ManageCategory} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute
          path="/admin/product/all"
          exact
          component={ManageProducts}
        />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute path="/admin/order/all" exact component={ManageOrder} />
      </Switch>
    </Router>
  );
}
