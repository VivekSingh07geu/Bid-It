import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadUser, updateUserForArray } from '../actions/userAction';
import Message from './Message';

function Notification() { 
    const dispatch = useDispatch();
    const {user, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        dispatch(loadUser());   
    } , [dispatch]);

    // update message readed to 1   

    if(user){
        if(user.notifications){
            let arr = [...user.notifications];

            for(let i = 0 ; i < arr.length ; i++){
                arr[i].readed = 1;
            }

            dispatch(updateUserForArray(user._id , arr));
        }
    }

  return (
    <Container>  
        <h1> Notifications</h1>
        {user ? (
            <Wrap>
            {user.notifications ? (
                <>
                    {user.notifications.map(message => (
                        <Message message = {message} />
                    ))}
                </>
            ):(
                <>
                    <h1>You Don't have any notification</h1>
                </>
            )}
        </Wrap>):(
            <>
            </>
        )}
    </Container>
  )
}

export default Notification

const Container = styled.div`
    height: 100vh;  
    width: 100%;
    display: flex;
    padding-top: 7%;
    justify-content: flex-start;
    background: #e8e8e8;
    flex-direction: column;
    align-items: center;

    h1 {
        text-transform: uppercase;
        letter-spacing: 5px;
        font-family: system-ui;
        margin-bottom: 2%;
        border-bottom: 1px solid black;
    }
`

const Wrap = styled.div`
    width: 55%;
`
