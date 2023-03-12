import React from 'react'
import styled from 'styled-components';

const Message = ({message}) => {

  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  )
}

export default Message

const Container = styled.div`
  height: fit-content;
  width: 100%;
  margin-bottom: 3%;
  border: 2px solid #8707ff;
  border-radius: 1rem;
  transition: 0.3s;
  
  p {
      display: flex;
    align-items: center;
    justify-content: center;
    font-family: system-ui;
    border: none;
    padding: 1rem;
    border-radius: 1rem;
    background: #ebebeb;
    -webkit-box-shadow: 5px 5px 15px #cccccc,
                -5px -5px 15px #ffffff;
    box-shadow: 5px 5px 15px #cccccc,
                -5px -5px 15px #ffffff;
    -webkit-transition: box-shadow 0.3s ease-in-out;
    transition: box-shadow 0.3s ease-in-out;
    
  }

  &:hover {
    transform: scale(1.05);
    

  }

`