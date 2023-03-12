import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { getProductDetails, updateProduct } from '../actions/productAction';
import { loadUser } from '../actions/userAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrder } from '../actions/orderAction';

function Checkout() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {product} = useSelector((state) => state.productDetails);
    const { user } = useSelector((state) => state.user);


    useEffect(() => {
        dispatch(getProductDetails(id));
        dispatch(loadUser());
    } , [dispatch , id]);

    function Placed(){

        if(product.status === "sold"){
            toast.error(
                'Already Placed',
                {
                    position: toast.POSITION.TOP_CENTER,
                },
             );

            return;
        }

        dispatch(createOrder(user.name , user.address , user.city , user.state ,
            user.country , user.pin_code , user.phone_no , product.name , product.originalPrice,
            product.price , product.image , product.user , product.highestBidder, 
            product._id
        ));

        const myForm1 = new FormData();
        myForm1.set("status" , "sold");

        dispatch(updateProduct(id , myForm1));

        toast.success(
            'Order Placed',
            {
                position: toast.POSITION.TOP_CENTER,
                onClose: () => window.location.reload()
            },
         );

    }

  return (
    <Container>
        {user ? (
            <Wrap>
                <Wrapper1>
                    <Text1>
                        <p>Review your bag.</p>
                    </Text1>
                    <Link to = "/dashboard/profile/update">
                        <Button1>
                            Update Shipping Details
                        </Button1>
                    </Link>
                </Wrapper1>
                <Line />
                <Text2>Free delivery and free returns.</Text2>
                <Wrapper2>
                    <W2_Cover1>
                        <Image>
                            <img src = {product.image} alt = "" />
                        </Image>
                        <Details>
                            <div>
                                <Text3>{product.name}</Text3>
                            </div>
                            <div>
                                <Text4>Description</Text4>
                                <Text5>{product.description}</Text5>
                            </div>
                        </Details>
                    </W2_Cover1>
                    <W2_Cover2>
                        <Text4>Shipping Details</Text4>
                        <Line />
                        <Text6>{user.address}</Text6>
                            <Text6>{user.city},</Text6>
                            <Text6>{user.state},</Text6>
                            <Text6>{user.country}</Text6>
                            <Text6>{user.pin_code}</Text6>

                    </W2_Cover2>

                </Wrapper2>
                <Line />
                <Wrapper3>
                    <div>
                        <Text2>SUBTOTAL:</Text2>
                        <Text2>SHIPPING:</Text2>
                    </div>
                    <W3_1>
                        <div>
                            <Text1>₹{product.price}</Text1>
                        </div>
                        <W3_1_2>
                            <Text1>FREE</Text1>
                        </W3_1_2>
                    </W3_1>
                </Wrapper3>
                <Line />
                <Wrapper4>
                    <div>
                        <Text1>TOTAL:</Text1>
                    </div>
                    <div>
                        <Text1>₹{product.price}</Text1>
                        <Text7>PAID</Text7>
                    </div>
                </Wrapper4>
                <Wrapper5>
                    <Button2 onClick = {Placed}> Place Order </Button2>
                    <ToastContainer />
                </Wrapper5>
            </Wrap>
        ):(
            <></>
        )}


    </Container>
  )
}

export default Checkout

const Container = styled.div`
    height: 100vh;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 5%;
`

const Wrap = styled.div`
`
const Wrapper1 = styled.div`
    display: flex;
    justify-content: space-between;
`
const Line = styled.hr`
    margin-top: 1%;
    border-top: 2px solid #EEEDE7;
    
`
const Wrapper2 = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1%;
`

const W2_Cover1 = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 60%;
`

const W2_Cover2 = styled.div`
    width: 20%;
    padding-top: 6%; 
    display: flex;
    flex-direction: column;
`

const Image = styled.div`
background: white;
border-radius: 10%;
width: 100%;
height: auto;
border: 3px solid rgba(249 , 249 , 249 , 0.1);
padding: 2%;
// margin: 2%;
display: flex;
justify-content: center;
align-items: center;
img {
    max-width: 100%;
    max-height: 100%;
} 
`

const Details = styled.div`
    padding: 2%;

`

const Wrapper3 = styled.div`
    padding-top: 1%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1%;
`
const W3_1 = styled.div`
`

const W3_1_2 = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Wrapper4 = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 1%;
`
const Wrapper5 = styled.div``

// Text

const Text1 = styled.p`
    font-size: 120%;
    font-weight: bold;
    font-family: system-ui;
`
const Text2 = styled.p`
    margin-top: 0.5%;
    font-size: 100%;
    font-weight: bold;
    font-family: system-ui;
    color: #959491;
`

const Text3 = styled.p`
    font-size: 160%;
    font-weight: bold;
    font-family: system-ui;
    margin-bottom: 5%;
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
const Text7 = styled.p`
    margin-top: 0.5%;
    font-size: 120%;
    font-weight: bold;
    font-family: system-ui;
    color: rgb(61, 243, 45);
`


// button

const Button1 = styled.button`
font-family: system-ui;
font-weight: bold;
width: auto;
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

const Button2 = styled.button`
font-family: system-ui;
font-weight: bold;
width: 20%;
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