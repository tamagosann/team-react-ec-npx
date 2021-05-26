import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import { CartList, LogIn, OrderConfirm, OrderHistory, ProductDetail, ProductList } from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/login"} component={LogIn} />
      <Auth>
        <Route exact path={"(/)?"} component={ProductList} />
        <Route exact path={"/product"} component={ProductDetail} />
        <Route exact path={"/cart"} component={CartList} />
        <Route exact path={"/order/confirm"} component={OrderConfirm} />
        <Route exact path={"/order/history"} component={OrderHistory} />
      </Auth>
    </Switch>
  );
};

export default Router;
