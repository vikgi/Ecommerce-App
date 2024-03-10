import './App.css';
import Header from './component/layout/Header/Header';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Webfont from "webfontloader";
import React, { useState, useEffect } from "react";
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home'
import ProductDetails from './component/Product/ProductDetails';
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from './component/User/LoginSignUp';
import store  from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import Productlist from './component/admin/Productlist';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList';
import ProcessOrder from './component/admin/ProcessOrder';
import UsersList from './component/admin/UsersList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from './component/admin/ProductReviews';
import Contact from './component/layout/Contact';
import About from './component/layout/About';

function App() {

  const {isAuthenticated, user} = useSelector((state) => state.user);


  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(()=> {
    getStripeApiKey();
  }, [stripeApiKey]);

  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })
    store.dispatch(loadUser());
  }, []);


  return (
    <Router>
    <Header/>
    {isAuthenticated && < UserOptions user = {user} />}
    <Routes>
    
    <Route exact path = "/" element={<Home key="home"/>}/>
    <Route exact path = "/product/:id" element={<ProductDetails key="ProductDetails"/>}/>
    <Route exact path='/products' element={<Products/>}/>
    <Route exact path = '/Search' element = {<Search/>}/>
    <Route path="/products/:keyword" element={<Products/>} />
    <Route path="/login" element={<LoginSignUp/>} />
    <Route path="/account" element={isAuthenticated ? <Profile /> : <LoginSignUp/>} />
    <Route path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />} />
    <Route path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />} />
    <Route path="/password/forgot" element={<ForgotPassword/>} />
    <Route path="/password/reset/:token" element={<ResetPassword/>} />
    <Route path="/Cart" element={<Cart/>} />
    <Route path="/shipping" element={isAuthenticated ? <Shipping /> : <Navigate to="/login" />} />
    <Route path="/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <Navigate to="/login" />} />
    <Route path="/process/payment" element={isAuthenticated ? 
      <Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements> : <Navigate to="/login" />} />
    <Route path="/success" element={isAuthenticated ? <OrderSuccess /> : <Navigate to="/login" />} />
    <Route path="/order/me" element={isAuthenticated ? <MyOrders/> : <Navigate to="/login" />} />
    <Route path="/orders/:id" element={isAuthenticated ? <OrderDetails/> : <Navigate to="/login" />} />

    {/* <Route path="/admin/dashboard" element={ <Dashboard/>   } /> */}
    <Route path="/admin/dashboard" element={ <Dashboard/>  } />
    <Route path="/admin/products" element={ <Productlist/>  } />
    <Route path="/admin/product" element={ <NewProduct/>  } />
    <Route path="/admin/product/:id" element={ <UpdateProduct/>  } />
    <Route path="/admin/orders" element={ <OrderList/>  } />
    <Route path="/admin/order/:id" element={ <ProcessOrder/>  } />
    <Route path="/admin/users" element={ <UsersList/>  } />
    <Route path="/admin/user/:id" element={ <UpdateUser/>  } />
    <Route path="/admin/reviews" element={ <ProductReviews/>  } />


    <Route exact path="/contact" element={<Contact/>} />
    <Route exact path="/about" element={<About/>} />

    </Routes>
    <Footer/>
    </Router>
  ); 
}

export default App;
