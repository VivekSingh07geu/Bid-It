import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser , logout } from '../../actions/userAction';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        dispatch(loadUser());   
    } , [dispatch]);

    let newMessages = false;
    let num = 0;
    if(user){

        if(user.notifications){
            let arr = [...user.notifications];
            arr.forEach((item) => {
                if(item.readed === 0){
                    newMessages = true;
                }
            })
        }
    }

    const signOut = () => {
        dispatch(logout()); 
        window.location.reload();
    }

  return (
    <Nav>
        <Container>
            <Logo>
                <LOGO_IMG>
                    <img src = "/logo_prev_ui.png" alt = "" />
                </LOGO_IMG>
            </Logo>

            <Items>
                <div>
                    
                    <Link to = "/" style={{ textDecoration: 'none' }}>
                        <a> 
                            <span>Home</span> 
                        </a>
                    
                    </Link>
                </div>
                {user ? (
                    <>
                        <div>
                        <Link to = "/dashboard/profile/update" style={{ textDecoration: 'none' }}>
                            
                                <a> 
                                    <span>Dashboard</span> 
                                </a>
                            
                        </Link>
                        </div>
                        <div>
                            <Link to = "/payment" style={{ textDecoration: 'none' }}>
                                
                                    <a> 
                                        <span>Add Amount</span> 
                                    </a>
                                
                            </Link>
                        </div>

                        {(user.role === "admin") ? (
                            <div>
                                <Link to = "/admin/users" style={{ textDecoration: 'none' }}>    
                                    <a> 
                                        <span>Admin</span> 
                                    </a>
                                </Link>
                            </div>
                        ):(
                            <></>
                        )}
                </>
                ) : (
                    <></>
                )}
                
            </Items>
        </Container>

        { !isAuthenticated ? (
                    <Right>
                        <Link to = "/signup">
                            <Login> sign Up </Login>
                        </Link>
                        <Link to = "/login">
                            <Login> Login </Login>
                        </Link>
                    </Right>
                ) : (
                    <Wrap>
                        <Email>Hello , {user.name}</Email>
                        <Balance>
                            <Title>
                                <span>Balance:</span>
                            </Title>
                            <IMG>
                                <img src = "/LeetCoin.png" alt = "" />
                            </IMG>
                            <Amount>
                                <span>{user.amount}</span>
                            </Amount>

                            {newMessages ? (
                                    <Bell>
                                        <Link to = "/notification">
                                            <NotificationsRoundedIcon />
                                        </Link>
                                    </Bell>
                                ):(
                                    <Bell2>
                                     <Link to = "/notification">
                                        <NotificationsRoundedIcon />
                                    </Link>
                                    </Bell2> 
                                )
                            }
                        </Balance>
                        
                        <div>
                            <Login onClick={signOut} > Logout </Login>
                        </div>
                    </Wrap>
                    )
                }
        
    </Nav>
  )
}

export default Header

const Nav = styled.div`
    height: 70px;
    width: 100%;
    background: black;
    color : white;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
    justify-content: space-between;
    position: fixed;
    z-index: 4;
`
const Container = styled.div`
    display: flex;
    // background-color: white;
    width: 60%;

`

const Left = styled.div`

`


const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    width: 20%;
    height: content-fit;
`
const LOGO_IMG = styled.div`
    margin-top: 1%;
    img{
        width: 65%;
        height: 65%;
    }
`

const Email = styled.div`
font-size: 13px;
letter-spacing: 1.20px;
display: flex;
align-items: center;
font-family: system-ui;
`

const Balance = styled.div`
    display: flex;
    align-items: center;
    
`
const IMG = styled.div`
    display: flex;
    align-items: center;
    margin-right: 4px;
    img {
        width: 25px;
        height: 25px;
    }
`

const Amount = styled.div`
    display: flex;
    align-itmes: center;
    color: #ffd800;
    span {
        font-weight: bold;
        font-size: 18px;
    }
`
const Bell2 = styled.div`
    margin-left: 10%;
    margin-right: 2%;
    margin-top: 4%;
    position: relative;
    cursor: pointer;
`

const Bell = styled.div`
    margin-left: 10%;
    margin-right: 2%;
    margin-top: 4%;
    position: relative;
    cursor: pointer;

    &::after{
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 40%;
        height: 35%;
        border-radius: 50%;
        background: red;
    }
`

const Title = styled.div`
    margin-right: 10px;
    font-family: system-ui;
`

const Items = styled.div`
    // background: white;
    display: flex;
    flex: 1;
    margin-left: 1%;
    align-items: center;

    div {
        margin-right: 1%;
        width: 14%;
    }

    a {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-right: 1%;
        span {
            font-size: 13px;
            letter-spacing: 1.20px;
            position: relative;
            font-family: system-ui;
            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom : -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
                transform: scaleX(0);
            }
        }

        &:hover {
            span:after{
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`
const Right = styled.div`
    display: flex;
    justify-content: space-between;
    width: 14%;
`

const Wrap = styled.div`  
    width: 40%;
    display: flex;
    justify-content: space-between;
`

const Login = styled.button`
    width: 100%;
    height: 40px;
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0 , 0 , 0 , 0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;
    color: white;
    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`
const Add = styled.div`
    
`