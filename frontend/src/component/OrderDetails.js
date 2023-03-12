import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { getProductDetails, updateProduct } from '../actions/productAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateOrder } from '../actions/orderAction';




const OrderDetails = ({order}) => {
    const dispatch = useDispatch();
    const [status , setStatus] = useState(null);

    useEffect(() => {
      dispatch(getProductDetails(order.product_id));
    } , []);


    const handleSubmit = (e) => {
      e.preventDefault();

      if(order.orderStatus === "Delivered"){
        toast.error('Product Already Delivered !', {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }

      if(status === null || status === "Select"){
        toast.error('Select Status !', {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }
      const myForm = new FormData();
      myForm.set("delivery_status" , status);

      dispatch(updateProduct(order.product_id , myForm));
      
      const myForm1 = new FormData();
      myForm1.set("orderStatus" , status);

      console.log(order._id);
      dispatch(updateOrder(order._id , myForm1));
      
      toast.success('Status Updated', {
        position: toast.POSITION.TOP_CENTER,
        onClose: () => window.location.reload()
      });


    };

  return (
    <Container>
        
        <Wrap>
          <Wrapper1>
              <Image>
                  <img src = {order.image} alt = "" />
              </Image>
              <Details>
                  <div>
                    <Text3>{order.productName}</Text3>
                  </div>
                  <div>
                    <Text4>Original Price</Text4>
                    <Text5>{order.originalPrice}</Text5>
                  </div>
                  <div>
                    <Text4>Sold Price</Text4>
                    <Text5>{order.soldPrice}</Text5>
                  </div>
              </Details>
          </Wrapper1>
          <Wrapper2>
              <Text4>Shipping Details</Text4>
              {/* <Line /> */}
              <Text6>{order.address}</Text6>
              <Text6>{order.city},</Text6>
              <Text6>{order.state},</Text6>
              <Text6>{order.country}</Text6>
              <Text6>{order.pinCode}</Text6>
          </Wrapper2>
          <Wrapper3>
              <Text4>Current Order Status</Text4>
              <Text6>{order.orderStatus}</Text6>
              <Form onSubmit={handleSubmit}>
                <Text4>Set Order Status</Text4> 
                <Field>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="Select">Select...</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </Field>
                <Btn type="submit">Set Status</Btn>
                
              </Form>
          </Wrapper3>
        </Wrap>
    </Container>
  )
}

export default OrderDetails

const Container = styled.div`
    // background-color: red;
    background: #dde1e7;
    block-size: fit-content;
    padding-top: 2%;
    padding-bottom: 2%;
    margin-left: 20%;
    margin-right: 5%;
    margin-top: 7%;
    margin-bottom: -3%;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -8px -8px 9px rgba(255,255,255,0.45), 8px 8px 9px rgba(94,104,121,0.3);
    transition: all 0.2s ease 0s;
    // &:hover {
    //   transform: scale(1.05);
    // }
  `

  const Wrap = styled.div`
    height: 80%;
    width: 90%;
    display: flex;
    justify-content: space-evenly;
  `

  const Wrapper1 = styled.div`
    width: 50%;
    // background-color: red;
    display: flex;
  `

  const Image = styled.div`
  display: flex;
    align-items: center;
  background: #dde1e7;
  border-radius: 10%;
  width: 50%;
  height: auto;
  border: 3px solid rgba(249 , 249 , 249 , 0.1);
  // padding: 2%;
  // margin: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
      max-width: 100%;
      max-height: 100%;
      border-radius: 12%;
  }
  `

  const Wrapper2 = styled.div`
    width: 25%;
    // background-color: blue;
    padding-top: 2%;
  `

  const Details = styled.div`
  padding: 3%;

`

const Wrapper3 = styled.div`
  width: 20%;
  padding-top: 2%;
  // background: green;
`

const Field = styled.div`
font-size: 7px;
margin-top: 5%;

select{
  letter-spacing: 1px;
  font-size: 12px;
  padding: 5px 12px;
  line-height: 20px;
  border-radius: 6px;
  border: 1px solid #797876;
  outline: none;
}
`

const Btn = styled.button`
font-family: system-ui;
font-weight: 600;
margin-top: 10%;
height: 40px;
border: 1.5px solid #f9f9f9;
padding: 8px 16px;
border-radius: 35px;
letter-spacing: 1.5px;
text-transform: uppercase;
background-color: rgb(255, 85, 23);
transition: all 0.2s ease 0s;
cursor: pointer;
color: white;
&:hover {
    color: rgb(224, 70, 15);
    color: #000;
    border-color: transparent;
}
`
const Form = styled.form`
  margin-top: 8%;
`

const Text3 = styled.p`
    font-size: 160%;
    font-weight: bold;
    font-family: system-ui;
    margin-bottom: 5%;
    color: #797876;
`


  
const Text4 = styled.p`
font-weight: bold;
font-family: system-ui;
color: #797876;
margin-bottom: 1%;
`

const Text5 = styled.p`
font-size: 85%;
// font-weight: bold;
font-family: system-ui;
color: #797876;
`

const Text6 = styled.p`
font-size: 85%;
// font-weight: bold;
font-family: system-ui;
color: #797876;
`