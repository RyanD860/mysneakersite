import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Product from "./Components/Product/Product";
import AddUser from "./Components/User/AddUser/AddUser";
import Profile from "./Components/User/Profile/Profile";
import Cart from "./Components/Cart/Cart";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/sneaker/:id" component={Product} />
    <Route path="/user/addUser/:id" component={AddUser} />
    <Route path="/user/profile/:id" component={Profile} />
    <Route path="/cart" component={Cart} />
  </Switch>
);
