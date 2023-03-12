import { get } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { clearErrors , loadUser, login } from "../actions/userAction"
// import { useAlert } from "react-alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HttpsIcon from '@mui/icons-material/Https';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, user, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    function go(){
        toast.success("Succesfully Logged In" , {position: toast.POSITION.TOP_CENTER ,
            onClose: () => navigate("/")
        });
    }
    
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));

        const timer = setTimeout(() => {
            window.location.reload();
            
          }, 2000);
        clearTimeout(timer);
    };
    
    return (
        <Container>
            {!user ? (
            <CTA>
                <Left>
                        <img src = "/login.png" alt = "" />
                </Left>
                <Right>
                    <Wrap>
                        <Title>
                            <h1>Login</h1>
                            <Description>Welcome back! Please login to your account.</Description>
                        </Title>
                        <form onSubmit={loginSubmit}>
                            <Input>
                                <Description>
                                    Email
                                </Description>
                                <Input_div>
                                    <EmailOutlinedIcon />
                                    <input 
                                        type = "text" 
                                        placeholder='username@gmail.com'
                                        name = "username"
                                        value = {loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                    />
                                </Input_div>
                            </Input>
                            <Input>
                                <Description>
                                    Password
                                </Description>
                                <Input_div>
                                    <HttpsIcon/>
                                    <input 
                                        type = "password" 
                                        placeholder='Password'
                                        name = "password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required   
                                    />
                                </Input_div>
                            </Input>
                            
                            <Log type="submit" value="Login">Login</Log>
                        </form>
                        <Fpas>
                            <Description>
                                Forget Password?
                            </Description>
                        </Fpas>
                        <NewUser>
                            <div>
                                <Description>New User?</Description>
                            </div>
                            
                            <SignUp>
                                <Link to = {`/signup`}>
                                    <p>SignUp</p>
                                </Link>
                            </SignUp>    
                        </NewUser>
                    </Wrap>
                </Right>
            </CTA>
            ) : (
                <>
                    {go()}
                    <ToastContainer 
                        autoClose={200}
                    />
                </>
            )}
        </Container>
    )
}

export default Login

const Container = styled.div`
    // background-color: #C0C0C0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5%;
    height: 100vh;
    position: relative;

    &:before{
        margin-top: 4%;
        height: auto;
        width: 100%;
        background: url("/login_back.jpg") center center / cover;
            content: "";
            position: absolute;
            top:0;
            left:0;
            right: 0;
            bottom: 0; 
            z-index: -1;
    }
`
const CTA = styled.div`
    width: 70%;
    height: 85%;
    display: flex;
    background-color: white;
    border-radius: 30px;
    overflow: hidden;
`

const Log = styled.button`
    width: 75%;
    background-color: #0063e5;
    font-weight: bold;
    padding: 17px 0;
    color: #f9f9f9;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 250ms;
    letter-spacing: 1.5px;
    margin-top: 28px;
    border: transparent;

    &:hover {
        background: #0063e5;
    }
`
const Description = styled.p`
    font-size: 13px;
    letter-spacing: 1.2px;
    color: #989898;
    font-family: system-ui;
    padding-bottom: 1%;
`
const Left = styled.div`
    width: 50%;
    height: 100%;
    
    img {
        width: 100%;
        height: 100%;
    }
`

const Right = styled.div`
    width: 50%;
`

const Title = styled.div`
    margin-bottom: 20px;
    h1{
        font-family: system-ui;
    }
`
const Input = styled.div`
    padding-bottom: 3%;
`

const Wrap = styled.div`
width: 80%;
height: 80%;
margin: 18%;
`

const Input_div = styled.div`
 display: flex;
 line-height: 28px;
 align-items: center;
 position: relative;
 max-width: 80%;
 background-color: #f3f3f4;
 padding-left: 2%;

 &:hover{
    outline: none;
    border: 1px solid rgba(234,76,137,0.4);
    background-color: #fff;
    box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
 }

input {
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    border: 2px solid transparent;
    // border-radius: 14%;
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: .3s ease;
}

`

const Fpas = styled.div`
    width: 75%;
    display: flex;
    justify-content: end;
    aligm-items: center;
    margin-bottom: -5%;
`

const NewUser = styled.div `
    width: 32%;
    display: flex;
    justify-content: space-between;
`

const SignUp = styled.div`
font-size: 13px;
letter-spacing: 1.4px;
color: black;
    p{
        color: black;
        font-family: system-ui;
        font-weight: bold;
    }
`