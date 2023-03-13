import './App.css';
import Header from "./component/layout/Header.js"
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Home from './component/Home';
import ProductDetails from "./component/ProductDetails"
import Login from './component/Login';
import SignUp from './component/SignUp'
import Dashboard from './component/Dashboard'
import NewProduct from './component/NewProduct';
import ProductList from './component/ProductList';
import AddedProductList from './component/AddedProductList';
import Profile from './component/Profile';
import Checkout from './component/Checkout';
import Orders from './component/Orders';
import Notification from './component/Notification';
import { useDispatch, useSelector } from 'react-redux';
import store from "./store";
import { useEffect, useState } from 'react';
import { loadUser } from './actions/userAction';
import Payment_Outer from './component/Payment_Outer';
import AdminPage_Users from './component/AdminPage_Users';
import AdminPage_Products from './component/AdminPage_Products';

function App() {
  const {isAuthenticated , user , error} = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  } , []);

  window.addEventListener("contextmenu" , (e) => e.preventDefault());

  return (
    <Router>
        
        <Header/>

        {/* <Routes>
          {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
          </Elements>
        )}
       </Routes> */}

          <Routes>
            <Route exact path = "/login" element = {<Login/>}/>
            
            <Route exact path = "/signup" element = {<SignUp />} />
            <Route exact path = "/checkout/:id" element = {<Checkout />} />
            <Route exact path = "/product/:id" element = {<ProductDetails />}/>
            <Route exact path = "/dashboard" element = {<Dashboard />} />
            <Route exact path = "/dashboard/orders" element = {<Orders />} />
            <Route exact path = "/dashboard/profile/update" element = {<Profile />} />
            <Route exact path = "/product/new" element = {<NewProduct />} />
            <Route exact path = "/product/list" element = {<ProductList />} />
            <Route exact path = "product/added_products" element = {<AddedProductList />} />
            <Route exact path = "/notification" element = {<Notification />} />
            <Route exact path="/payment" element={<Payment_Outer />} />
            <Route exact path="/admin/users" element={<AdminPage_Users />} />
            <Route exact path="/admin/products" element={<AdminPage_Products />} />
            
            
            <Route exact path = "/" element = {<Home/>}/>
          </Routes>
          
      </Router>
  );
}

export default App;
