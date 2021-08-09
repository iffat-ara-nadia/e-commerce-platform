import React from 'react'
import { Route, Redirect, Switch } from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from "./screens/ProductScreen"
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

const App = () => {
  return (
    <>
    <Header />
    <main className="py-3">
      <Container>
      <Switch>

      <Route path="/orders/:id" component={OrderScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      {/* <Redirect from="/login" to="/shipping"/> */}
      <Route path="/cart/:id?" component={CartScreen} />{/*i wrote path={"/cart"} instead of "/cart/:id?" Here id? paramerter must be added coz, this link 
    //can be accessed directly either from cart nav link or addToCart action where id is passed.*/}
      <Route path="/products/:id" component={ProductScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/admin/userlist" component={UserListScreen} />
      <Route path="/admin/user/:id/edit" component={UserEditScreen} />
      <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} />
      <Route path="/admin/productlist" component={ProductListScreen} />
      <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
      <Route path="/admin/orderlist" component={OrderListScreen} />
      <Route path="/search/:keyword" exact  component={HomeScreen} /> {/* WRONG: component={SearchBox} */}
      <Route path="/page/:pageNumber"  component={HomeScreen} />
      <Route path="/search/:keyword/page/:pageNumber" exact component={HomeScreen} />
      <Route path="/" exact component={HomeScreen} />
      </Switch>
      </Container>
    </main>
    <Footer />
    </>
  );
}

export default App;
