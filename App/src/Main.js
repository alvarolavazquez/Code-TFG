import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Users from './user/Users';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';
import Menu from './Navbar/Menu';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import NewShop from './shop/NewShop';
import Shops from './shop/Shops';
import MyShops from './shop/MyShops';
import Shop from './shop/Shop'; 
import EditShop from './shop/EditShop';
import NewProductURL from './product/NewProductURL';
import NewProductAPI from './product/NewProductAPI';
import Product from './product/Product';
import EditProductURL from './product/EditProductURL'
import EditProductAPI from './product/EditProductAPI'
import Cart from './cart/cart';
import ShopOrders from './order/ShopOrders'
import MyOrders from './order/MyOrders'
import Order from './order/Order'
import SelectProduct from './product/SelectProduct'

class Main extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users}/>
          <Route path="/MyOrders" component={MyOrders}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin}/>
          <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
          <Route path="/user/:userId" component={Profile}/>
          <Route path="/shops/all" component={Shops}/>
          <PrivateRoute path="/seller/shop/new" component={NewShop}/>
          <PrivateRoute path="/seller/shops" component={MyShops}/>
          <Route path="/shops/:shopId" component={Shop}/>
          <PrivateRoute path="/seller/shop/edit/:shopId" component={EditShop}/>
          <PrivateRoute path="/seller/:shopId/products/URL/new" component={NewProductURL}/>
          <PrivateRoute path="/seller/:shopId/products/API/new" component={NewProductAPI}/>
          <PrivateRoute path="/seller/:shopId/products/select" component={SelectProduct}/>
          <Route path="/product/:productId" component={Product}/>
          <PrivateRoute path="/seller/:shopId/URL/:productId/edit" component={EditProductURL}/>
          <PrivateRoute path="/seller/:shopId/API/:productId/edit" component={EditProductAPI}/>
          <Route path="/cart" component={Cart}/>
          <PrivateRoute path="/seller/orders/:shop/:shopId" component={ShopOrders}/>
          <PrivateRoute path="/order/:orderId" component={Order}/>
        </Switch>
      </div>
    );
  }
}
export default Main;
