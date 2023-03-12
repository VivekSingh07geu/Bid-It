import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { getAllOrders } from '../actions/orderAction';
import { loadUser } from '../actions/userAction';
import OrderDetails from './OrderDetails';
import Product from './Product';
import Sidebar from './Sidebar'
import { ToastContainer, toast } from 'react-toastify';

function Orders() {
    const dispatch = useDispatch();
    const {orders} = useSelector(
        state=>state.allOrders
      );
    const {user, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(loadUser());
    } , [dispatch]);

    let haveOrders = false;
    function checkForOrders(){
        if(orders && user){
            for(let i = 0 ; i < orders.length ; i++){
                if(orders[i].seller_id === user._id){
                    haveOrders = true;
                }
            }
        }

        return haveOrders;
    }

  return (
    <Container>
        {(user && checkForOrders()) ? (
            <>
                <Sidebar />
                <Wrapper>
                    {orders && orders.map(order => {
                        if(String(order.seller_id) === String(user._id))
                            return <> 
                                    <OrderDetails order = {order}/>
                                    
                                   </>
                        return <></>
                    })} 
                    <ToastContainer />
                </Wrapper>
            </>
        ):(
            <>
                <Sidebar />
                <Cover>
                    <p>You Don't have any orders.</p>
                    <p>First Add some product then after product bidding is over come this section to see your orders.</p>
                </Cover>
            </>
        )}
    </Container>
  )
}

export default Orders

const Container = styled.div`
    display: flex; 
    justify-content: space-between;
    background: #dde1e7;
    padding-bottom: 5%;
    height: auto;
    // position: relative;
`

const Wrapper = styled.div`
    // background-color: gray;
    width: 100%;

`

const Cover = styled.div`
    margin-top: 9%;
    margin-left: 20%;
    margin-right: 10%;
    width: 100%;
    color: grey;

    p {
        font-size: 300%;
        font-family: system-ui;
    }
`