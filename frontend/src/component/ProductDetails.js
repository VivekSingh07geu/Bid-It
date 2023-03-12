import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import "./ProductDetails.css"
import styled from 'styled-components'
import {useSelector , useDispatch} from "react-redux"
import {getProduct, getProductDetails, updateProduct, updateProductForArray} from "../actions/productAction"
import { Link, useParams } from 'react-router-dom'
import Timer from './Timer'
import { loadUser, updateUser, updateUserForArray, updateUser_amount } from '../actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {product} = useSelector((state) => state.productDetails);
  const { user } = useSelector((state) => state.user);
  var Previous_added_amount = 0;
  var Money_need_to_be_highest = 0;
  let Bidders_Arr = [];
  
   useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(loadUser());
  } , [dispatch , id]);


  function check_amount_details(){

    if(JSON.stringify(product) !== '{}' && JSON.stringify(user) !== undefined){
        Money_need_to_be_highest = product.price + Number(1);
        Bidders_Arr = [...product.bidders];
        
        for(let i = 0 ; i < Bidders_Arr.length ; i++){
            if(String(Bidders_Arr[i].user_id) === String(user._id)){
                Previous_added_amount = Bidders_Arr[i].user_Added_Amount;
                
                if(Previous_added_amount >= product.price){
                    Money_need_to_be_highest = 0;
                }
                else{
                    let val = Number(1) + Number(product.price) - Number(Previous_added_amount);
                    Money_need_to_be_highest = val;
                }
            }
        }

        toast.info("Your Previous Added Amount is : ₹"+ Previous_added_amount +". And You Need to add ₹"+ Money_need_to_be_highest +" to be highest bidder." , {
            position: toast.POSITION.TOP_CENTER
        });
    }
  }

  // Date Checking and Updating
  var date = new Date(product.date);
    //console.log(product.date);

  /* Adding 1 more day to correct display time */
  const temp = new Date(product.date);
  temp.setDate(temp.getDate() + 1)
  
  var milliseconds = temp.getTime();
  const product_date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

  const current = new Date();
  const current_date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

//   console.log(product_date);
//   console.log(current_date);
//   console.log("Date");


    function checkBiddingTime() {
        if(current.getTime() > temp.getTime()){
            const myForm3 = new FormData();
            myForm3.set("biddingStatus" , "false");
            dispatch(updateProduct(product._id , myForm3));

            console.log("Hello");
            window.location.reload();
            return false;
        }
        else
            return true;
    }

    // product model -> bidders array with added amount

    const [money , setMoney] = useState('');

    function handleSubmit(e){
        e.preventDefault();

        if(current.getTime() > temp.getTime()){

            const myForm2 = new FormData();
            myForm2.set("biddingStatus" , "false");
            dispatch(updateProduct(product._id , myForm2));

            toast.warning("Bidding Over." , {position: toast.POSITION.TOP_CENTER ,
                onClose: () => window.location.reload()
            });
            return;
        }

        if(!user){
            toast.warning("Please Login." , {position: toast.POSITION.TOP_CENTER})
            return;
        }

        if(money === ''){
            toast.warning("Enter Amount" , 
            {
                position: toast.POSITION.TOP_CENTER
            })
            return;
        }

        if(user.phone_no === '' || user.address === '' || user.city === ''
           || user.country === '' || user.pin_code === ''){
            toast.warning("Fill Address Details. Go to Dashboard -> Profile" , {
                position: toast.POSITION.TOP_CENTER
                }
            );
            return;
        }

        let MaxAmount = product.price;

        let newArr = [...product.bidders];
        let user_found = false;    
        
        for(var i = 0 ; i < newArr.length; i++){
            if(String(newArr[i].user_id) === String(user._id)){
                MaxAmount -= newArr[i].user_Added_Amount;
                user_found = true;
            }
        }     

        if(user._id === product.user){
            toast.error('You Added this product. You can not bid.', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }


        if(Number(money) <= Number(MaxAmount)){
            toast.error('Your Entered amount is less.', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        if(Number(user.amount) < Number(MaxAmount)){
            toast.error('Not Enough Balance !', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        if(user_found){
            for(var i = 0 ; i < newArr.length; i++){
                if(String(newArr[i].user_id) === String(user._id)){
                    let val = Number(newArr[i].user_Added_Amount) + Number(money);
                    newArr[i].user_Added_Amount = val;
                }
            }
        }
        else{
            newArr = [...newArr , {user_id: user._id , user_Added_Amount: money}];
        }
        dispatch(updateProductForArray(id , newArr));

        // Updating Product Price

        const myForm = new FormData();
        let pr = Number(product.price) + Number(money);
        if(user_found)
            pr = Number(product.price) + Number(money);
        else
            pr = Number(money);
        myForm.set("price" , pr);
        myForm.set("highestBidder" , user._id);
        dispatch(updateProduct(id , myForm));

        // update amount in user Account
        let user_remain_amount = Number(user.amount) - Number(money);
        dispatch(updateUser_amount(user._id , user_remain_amount));
      
        var msg = "You succesfully bid for the product "+ product.name +".";
        let Arr = [{message: msg , readed: 0} , ...user.notifications];
        dispatch(updateUserForArray(user._id , Arr));
      
        toast.success(
            'Bidded Successfully',
            {
                position: toast.POSITION.TOP_CENTER,
                onClose: () => window.location.reload()
            },
         );
         
    }

    console.log(product);

  return (
    <Container>
        {(product) && (
            <Main>
                {/* <h4>*Note: If you didn't win the bid, your amount will be credited in your account. </h4> */}
                <Cover>
                    <Wrap1> 
                        <Image>
                            <img src = {product.image} alt = "" />
                        </Image>
                    </Wrap1>

                    <Wrap2>
                        <Wrap2Mid>
                            <Name><span>{product.name}</span></Name>
                            <Description>Current Sold Price</Description>
                            <Price><span>₹{product.price}.00</span></Price>
                                
                            <Description>Description</Description>
                            <About>
                                {product.description}
                            </About>

                            
                            <Log1 type = "submit" onClick={check_amount_details}>Check Money Need To Be Highest Bidder</Log1>


                            {((product.biddingStatus === "true") && checkBiddingTime()) ? (<form onSubmit = {handleSubmit}>
                                <Description>Enter Bidding Amount</Description>
                                <Input>
                                    <Input_Wrap>
                                    <div>
                                    <input 
                                        placeholder='Enter Amount'
                                        id = 'money'
                                        type = 'number'
                                        value = {money}
                                        onChange ={e => setMoney(e.target.value)}
                                    />
                                    </div>
                                    <div>
                                        <Log type = "submit">Bid</Log>
                                    </div>
                                    </Input_Wrap>
                                    </Input>
                                <ToastContainer />
                            </form>) : (
                                <>
                                    {(user && user._id === product.highestBidder) ? (
                                        <Outer>
                                        <Link to = {`/checkout/${product._id}`}>
                                            
                                                <Log> Get Product </Log>
                                        </Link>
                                        </Outer>
                                    ) : (
                                        <Outer>
                                            <Log1> You Didn't win this bid </Log1>  
                                        </Outer>
                                    )}
                                </>
                            )}
                        </Wrap2Mid>
                    </Wrap2>
                </Cover>
                <CountDown>
                    {product.biddingStatus === "true" ? (
                        <Timer 
                            countdownTimestampMs = {milliseconds}
                            id = {id}
                        />
                    ) : (
                        <Name1><span>BIDDING CLOSED</span></Name1>
                    ) }
                    
                </CountDown>
            </Main>
        )}
        
    </Container>
)
}

export default ProductDetails

const Container = styled.div`
// height: calc(100vh - 70px);
height: 100vh;
// margin-top: 5%;
// display: flex;
// padding-top: 5%;
// position: relative;

// background: #C6FFDD;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
// background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
// background: #e0e0e0;
background: #f4f0f0;

`

const Cover = styled.div`
display: flex;
// height: 100%;
// height: 90%;
padding-top: 7%;
// background: red;
width: 100%;
`
const Main = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
height: 100%;

`

const Wrap1 = styled.div`
width: 50%;
height: 100%;
display: flex; 
align-items: center;
justify-content: center;
// background: #e0e0e0;
background: #f4f0f0;
`
const Wrap2 = styled.div`
width: 50%;
`

const Wrap2Mid = styled.div`
// margin-top: 50px;
// width: 60%;
// // padding: 15px;
// // margin-top: 50px;
// // width: 70%;
// // border: 4px solid grey;
// // border-radius: 15px;
// // background-color: white;

display: flex;
flex-direction: column;

`


const CountDown = styled.div`
display: flex;
justify-content: center;
// // background-color: white;
height: 20%;
`

const Image = styled.div`

border-radius: 18px;
background: #f4f0f0;
box-shadow:  13px 13px 26px #aba8a8,
             -13px -13px 26px #ffffff;




// background: white;
// background: #e0e0e0;
// border-radius: 10px;
max-width: 60%;
max-height: auto;
// border: 3px solid rgba(249 , 249 , 249 , 0.1);

// box-shadow:  -8px -8px 9px 0 rgba(255 , 255, 255 , 0.5),  8px 8px 9px 0 rgba(0 , 0 , 0 , 0.2);
// box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
//     rgb(0 0 0 / 73%) 0px 16px 10px -10px;
transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
// padding: 20px;
// margin: 15px;
display: flex;
justify-content: center;
align-items: center;
img {
    border-radius: 20px;
    max-width: 100%;
    max-height: 100%;
    padding: 4%;
} 
`

const Name = styled.div`

letter-spacing: 1.5px;
text-transform: uppercase;
font-size: 35px;
font-weight: lighter;
margin-bottom: 3%;
margin-left: 1%;
// border-bottom: 1px solid black;
// display: table-cell;

font-family: system-ui;
width: fit-content;
padding-top: 0.5%;
padding-bottom: 0.5%;
padding-left: 2%;
padding-right: 2%;
border-radius: 18px;
background: linear-gradient(145deg, #dcd8d8, #ffffff);
box-shadow:  13px 13px 26px #aba8a8,
             -13px -13px 26px #ffffff;

`

const Price = styled.div`
// margin-top: -10px;
margin-bottom: 2%;
letter-spacing: 1.5px;
text-transform: uppercase;
font-size: 25px;
// color: #A52A2A;
margin-left: 2%;

// font-size: 16px;
// color: #989898;
// margin-left:2px;

text-transform: uppercase;
font-weight: lighter;

font-family: system-ui;
width: fit-content;
padding-top: 0.5%;
padding-bottom: 0.5%;
padding-left: 2%;
padding-right: 2%;
border-radius: 18px;
border-radius: 9px;
background: linear-gradient(145deg, #dcd8d8, #ffffff);
box-shadow:  7px 7px 14px #9c9a9a,
             -7px -7px 14px #ffffff;

`
const About = styled.div`
margin-bottom: 2%;
letter-spacing: 1px;
font-size: 15px;
// color: #A52A2A;
margin-top: -1%;

// font-size: 16px;
// color: #989898;
// margin-left:2px;

font-weight: lighter;

font-family: system-ui;
max-width: 80%;
max-height:
padding-top: 0.5%;
padding-bottom: 0.5%;
padding-left: 2%;
padding-right: 2%;
border-radius: 18px;
// border-radius: 9px;
// background: linear-gradient(145deg, #dcd8d8, #ffffff);
// box-shadow:  7px 7px 14px #9c9a9a,
//              -7px -7px 14px #ffffff;


`


const Input = styled.div`
input {
    border: none;
    padding: 1rem;
    border-radius: 1rem;
    background: #e8e8e8;
    box-shadow: 8px 8px 9px #c5c5c5,
           -8px -8px 9px #ffffff;
    transition: 0.3s;
   }
   
   input:focus {
    outline-color: #e8e8e8;
    background: #e8e8e8;
    box-shadow: inset 20px 20px 60px #c5c5c5,
           inset -20px -20px 60px #ffffff;
    transition: 0.3s;
   }
`

const Description = styled.p`
display: block;
    font-size: 7em;
    font-weight: 900;
color: #7f00ff;
    font-family: 'poppins' , sans-serif;
font-size: 16px;
letter-spacing: 1.4px;

margin-bottom: 0.5%;
// border-bottom: 1px solid black;
// display: table-cell;

// font-family: system-ui;
width: fit-content;
padding-top: 0.5%;
padding-bottom: 0.5%;
padding-left: 2%;
padding-right: 2%;
border-radius: 18px;
// background: #f4f0f0;
// box-shadow:  13px 13px 26px #aba8a8,
//              -13px -13px 26px #ffffff;
`

const Log = styled.button`
    // color: #4181f098;
    color: #357af0;
    text-transform: uppercase;
    letter-spacing: 5px;
    /* border: none; */
    font-weight: bold;
    font-size: 17px;
    padding: 1rem 2rem;
    border: 1px solid #ffffff1f;
    cursor: pointer;
    border-radius: 20px;
    background: #ebebeb;
    -webkit-box-shadow: 5px 5px 15px #cccccc,
                -5px -5px 15px #ffffff;
    box-shadow: 5px 5px 15px #cccccc,
                -5px -5px 15px #ffffff;
    -webkit-transition: box-shadow 0.3s ease-in-out;
    transition: box-shadow 0.3s ease-in-out;

  &:hover {
    color: #357af0;
    background: linear-gradient(145deg, #d4d4d4, #fbfbfb);
    -webkit-box-shadow: 5px 5px 15px #cccccc,
                -5px -5px 15px #ffffff;
    box-shadow: 5px 5px 15px #cccccc,
                -5px -5px 15px #ffffff;
  }
  
  &:active {
    color: #357af0;
    background: #ebebeb;
    -webkit-box-shadow: inset 5px 5px 15px #cccccc,
                inset -5px -5px 15px #ffffff;
    box-shadow: inset 5px 5px 15px #cccccc,
                inset -5px -5px 15px #ffffff;
  }
`

const Log1 = styled.button`
margin-left: 2%;
margin-bottom: 2%;
background-color: #333;
color: #fff;
padding: 12px 24px;
border: none;
border-radius: 5px;
box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
cursor: pointer;
transition: all 0.3s ease-in-out;
font-size: 17px;
max-width: 50%;

&:hover {
transform: translateY(-3px);
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
background-color: rgb(128, 95, 247);
}

&:active {
transform: translateY(0.5em);
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}
`

const Input_Wrap = styled.div`
width: 100%;
display: flex;
align-items: center;

 div{
    margin-left: 2%;
    margin-right: 3%;
 }
`

const Outer = styled.div`
 max-width: 60%;
 min-width: fit-content;
`

const Name1 = styled.div`
letter-spacing: 20px;
text-transform: uppercase;
font-size: 55px;
font-weight: lighter;
margin-bottom: 3%;
margin-left: 1%;
// border-bottom: 1px solid black;
// display: table-cell;
display: flex;
align-items: center;

font-family: system-ui;
width: fit-content;
padding-top: 0.5%;
padding-bottom: 0.5%;
padding-left: 5%;
padding-right: 5%;
border-radius: 18px;
background: linear-gradient(145deg, #dcd8d8, #ffffff);
box-shadow:  13px 13px 26px #aba8a8,
             -13px -13px 26px #ffffff;

`
