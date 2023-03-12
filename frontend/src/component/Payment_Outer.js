import React, { useEffect, useState } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './Payment';
import axios from 'axios';
import { loadUser } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'

function Payment_Outer() {
  
  const dispatch = useDispatch();
  const [stripeApiKey , setStripeApiKey] = useState("");
  const {user, isAuthenticated } = useSelector((state) => state.user);
    
  async function getStripeApiKey() {
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);        
  }

  useEffect(() => {
    getStripeApiKey();
    dispatch(loadUser());
  },[]);

  if(user){
    console.log(user);
  }

  return (
    <Container>
        { stripeApiKey ? (
            <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
            </Elements>
        ): (
            <> 
            
            </>
        )}
    </Container>
  )
}

export default Payment_Outer

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  &:before {
    margin-top: 4%;
    height: auto;
    width: 100%;
    background: url("/Payment.jpg") center center / cover;
        content: "";
        position: absolute;
        top:0;
        left:0;
        right: 0;
        bottom: 0; 
        z-index: -1;    
  }
`