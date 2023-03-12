import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
// import { selectProducts } from '../features/product/productSlice'
// import db from '../Firebase'
import {getRemainingTimeUntilMsTimestamp} from './CountdownTimeUtils'

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

function Timer({countdownTimestampMs , id}) {

  const [remainingTime , setRemainingTime] = useState(defaultRemainingTime)

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearTimeout(intervalId);
    } , [countdownTimestampMs])

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }


  /// handling bidding status

    const [ product , setProduct ] = useState(''); 

    // useEffect(() => {
    //     db.collection("products")
    //     .doc(id)
    //     .get()
    //     .then((doc)=>{
    //         if(doc.exists){
    //             setProduct(doc.data());
    //         } else {

    //         }
    //     })
    // }, [])

    // const state = product.biddingStatus;
    // var biddingStatus = state;
    // if(remainingTime.days === "00" &&
    //    remainingTime.hours === "00" &&
    //    remainingTime.minutes ==="00" &&
    //    remainingTime.seconds === "00" && biddingStatus === "1"){

    //     biddingStatus = "0";
    //     db.collection('products')
    //     .doc(id)
    //     .update({biddingStatus})
    //     .then(response => {
    //     console.log(response)
    //     }).catch(error => console.log(error.message))
        
    //   }

  return (
    <Container>
        <Wrap>
          <Time><span>{remainingTime.days}</span></Time>
          <Tag><span>Days</span></Tag>
        </Wrap>

        <Wrap>
          <Time><span>{remainingTime.hours}</span></Time>
          <Tag><span>Hours</span></Tag>
        </Wrap>
        
        <Wrap>
          <Time><span>{remainingTime.minutes}</span></Time>
          <Tag><span>Minutes</span></Tag>
        </Wrap>
        
        <Wrap>
          <Time><span>{remainingTime.seconds}</span></Time>
          <Tag><span>Seconds</span></Tag>
        </Wrap>
    </Container>
  )
}

export default Timer


const Container = styled.div`
    width: 85%;
    height: 85%;
    // background-color: green;
    font-family: "Oswald";
    font-size: 30px;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    span{
        margin-left: 5px;
        margin-right: 5px;
    }

`

const Wrap = styled.div`

background: linear-gradient(145deg, #dcd8d8, #ffffff);
box-shadow:  13px 13px 26px #aba8a8,
             -13px -13px 26px #ffffff;
// background: white;
border-radius: 10px;
width: 15%;
height: 100%;
box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
padding: 10px;
margin: 15px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`
const Time = styled.div`
display: flex;
justify-content: center;
span {
    font-size: 60px;
    font-family: system-ui;
  }
`
const Tag = styled.div`
display: flex;
justify-content: center;  
  span {
    font-size: 18px;
    letter-spacing: 1.5px;
    color: #989898;
    font-family: system-ui;
  }

`