import React, { Fragment, useEffect } from 'react'
import "./Home.css"
import Product from "./Product.js"
import MeraData from './layout/MetaData';
import {getProduct, updateProduct} from "../actions/productAction"
import { useSelector , useDispatch } from "react-redux"
import { getAllOrders } from '../actions/orderAction';
import styled from 'styled-components';
import { getAllUsers, updateUserForArray, updateUser_amount } from '../actions/userAction';
import {Helmet} from 'react-helmet'

const Home = () => {

  const dispatch = useDispatch();
  const {loading , error , products , productsCount} = useSelector(
    state=>state.products
  );

  const {users} = useSelector(
    (state) => state.allUsers
    );

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getAllUsers()); 

  } , [dispatch]);

  // trying to make a funtion that return money of those didn't win the bid

  function dateCheck(date){
    let temp = new Date(date);
    let current = new Date();

    if(current.getTime() > temp.getTime()){
        return true;
    }

    return false;
  }

  if(products && users){
    products.forEach((item) => {
      if(dateCheck(item.date) && item.amount_returned === "false"){
          console.log(item.name);
          let arr = [...item.bidders];
          console.log(arr);

          if(arr){
            arr.forEach((it) => {
              if(it.user_id !== item.highestBidder){
                    users.forEach((user) => {
                      if(it.user_id === user._id){
                        var amount = Number(user.amount) + Number(it.user_Added_Amount);
                          dispatch(updateUser_amount(it.user_id , amount));
                         /// also add notification to user database.
                          var msg = "You Didn't win the bid for the product "+ item.name +". So, Your all bidded money i.e: ₹"+ it.user_Added_Amount +" credited to your account. Thanks For Bidding !!!";
                          let newArr = [{message: msg , readed: 0} , ...user.notifications];
                          dispatch(updateUserForArray(it.user_id , newArr));
                        }
                    })
              }
            })
          }

          const myForm = new FormData();
          myForm.set("amount_returned" , "true");

          dispatch(updateProduct(item._id , myForm));
          window.location.reload();
      }    
    })
  }

  return (
    <Fragment>

      <MeraData title = "BidIt" />
      <div className='poster'>
        <div className='wrap'>
          <div className='bottom'>
            <video loop muted autoPlay={"autoplay"}>
              <source src = "/Banner_video.mp4" type = "video/mp4"/>
            </video>
          </div>
          <div class="top">
              {/* <div className='inside'> */}
              {/* <p>  BID NOW </p> */}
              {/* <a href='#container'>
                <button>
                  Scroll
                </button>
              </a> */}

                <div className='wrapper'>
                  <div className='cols cols0'>
                    <span class = "topline">Welcome To</span>
                    <p className='line'>Online <span className='multiText'>Auction</span></p>
                  </div>
                </div>
              {/* </div> */}
          </div>
        </div>

        <div className='second_div'>
            <h2 className='homeHeading'>Featured Product</h2>
    
              <div className= 'container' id ="container">
        
                {products && products.map(product => (
                  <Product product = {product} />
                ))}
              </div>

            </div>
      </div>

      {/* <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing Products Below</h1>

        <a href='#container'>
          <button>
            Scroll
          </button>
        </a>
      </div> */}
    
      {/* <Wrap>
        <Box></Box>
      </Wrap>
     */}
     
    </Fragment>
  );
};

export default Home

const Wrap = styled.div`
 height: 400px;
 widht: 100%;

 background: #e0e0e0;
 display: flex;
 align-items: center;
 justify-content: center;
`

const Box = styled.div`
  // background: green;
  background: #e0e0e0;

  box-shadow:  6px 6px 10px 0 rgba(0 , 0 , 0 , 0.2),  -6px -6px 10px 0 rgba(255 , 255, 255 , 0.5);
  border-radius: 25px;
  height: 60%;
  width: 15%;

`