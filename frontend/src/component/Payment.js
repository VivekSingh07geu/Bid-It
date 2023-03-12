import { useDispatch, useSelector } from "react-redux";
import "./Payment.css"
import MeraData from "./layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js"

import axios from "axios";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Fragment, useEffect, useRef, useState } from "react";
import { loadUser, updateUserForArray, updateUser_amount } from "../actions/userAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Payment = () => {

    const dispatch = useDispatch();
    const payBtn = useRef(null);
    const elements = useElements();
    const {user, isAuthenticated } = useSelector((state) => state.user);
    const stripe = useStripe();

    const [money , setMoney] = useState("");

    useEffect(() => {
        dispatch(loadUser());
    },[]);

    function updateUserDetails(){
        // Update User Money
        var newAmount = Number(money) + Number(user.amount);
        dispatch(updateUser_amount(user._id , newAmount));

        // Notification;
        var msg = "₹"+ money +" succesfully added to your account.";
        let Arr = [{message: msg , readed: 0} , ...user.notifications];
        dispatch(updateUserForArray(user._id , Arr));
    }


    const paymentData = {
        amount: Number(1) * 100,
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disable = true;

        if(money === ""){
            return;
        }

        try{

            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if(!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret , {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: user.address,
                            city: user.city,
                            state: user.state,
                            postal_code: user.pin_code,
                            country: "IN",
                        },
                    }
                }
            })

            if(result.error) {
                payBtn.current.disable = false;
                toast.error( result.error.message , {
                    position: toast.POSITION.TOP_CENTER
                });
            }else {
                if(result.paymentIntent.status === "succeeded") {
                    // add amount to user account
                    // add to notification.

                    updateUserDetails();
                    toast.success( "Payment Successfully Done and Amount added to your account." , {
                        position: toast.POSITION.TOP_CENTER,
                        onClose: () => window.location.reload()
                    });

                    setMoney = "";
                }
                else {
                    toast.error( "There's some issue while processing payment." , {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            }

        } catch (error) {
            payBtn.current.disable = false;
            alert(error.response.data.message);
        }
    };
    return (
        <Fragment>
            <MeraData title = "Payment" />
            
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <p>Add Amount</p>
                    <div className="box">
                        <CurrencyRupeeIcon />
                        <input 
                            className="paymentInput"
                            type = "number"
                            placeholder="Enter Amount"
                            id = "money"
                            value={money}
                            onChange = {e => setMoney(e.target.value)}
                            required
                        />
                    </div>
                    <div className="box">
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                        
                    </div>
                    <div className="box">
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                        
                    </div>
                    <div className="box">
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                        
                    </div>
                    <div className="btnCover">
                        <input 
                            type = "submit"
                            value = {`Pay`}
                            ref = {payBtn}
                            className = "paymentFormBtn"
                        />
                        <ToastContainer />
                    </div>
                    <div className="msg">
                        <p>*Currently using test mode.</p>
                        <p>So, Use this card Number 4000002760003184 for payment.</p>
                    </div>
                </form>
            </div>
        </Fragment>
    )
};

export default Payment;