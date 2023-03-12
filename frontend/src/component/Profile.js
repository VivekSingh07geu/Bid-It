import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { loadUser, updateProfile, updateUser } from '../actions/userAction';
import Sidebar from './Sidebar';

function Profile() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);


    let [name, setName] = useState("");
    let [phone_no , setPhone] = useState("");
    let [address , setAddress] = useState("");
    let [city , setCity] = useState("");
    let [state , setState] = useState("");
    let [country , setCountry] = useState("");
    let [pin_code , setPin] = useState("");

    
    useEffect(() => {
        dispatch(loadUser());
    } , []);


    function handleSubmit(e){
        e.preventDefault();

        if(!user){
            alert("Please Login");
            return;
        }

        if(name.length === 0)
            name = user.name;
        if(phone_no.length === 0)
            phone_no = user.phone;
        if(address.length === 0)
            address = user.address;
        if(city.length === 0)
            city = user.city;
        if(state.length === 0)
            state = user.state;
        if(country.length === 0)
            country = user.country;
        if(pin_code.length === 0)
            pin_code = user.pin_code;


        dispatch(updateUser(user._id , name , phone_no , address , city , state , country , pin_code));
        alert("Profile Updated");
        window.location.reload();
    }

  return (
    <>
    <Sidebar />
    <Container>
        {user ? (
        <Wrap>
          <Wrapper1>
            <Box1>
                <Add>
                    <Heading1>
                        <p>MY PROFILE</p>
                    </Heading1>
                </Add>

                <ImgBox>
                    <UserImg src = "/Profile.png" alt = ""/>
                    <Btn type = 'submit'>Change</Btn>
                
                </ImgBox>
                <DataBox>
                    <Title>name :</Title>
                    <Data>{user.name}</Data>
                </DataBox>
                <DataBox>
                    <Title>email :</Title>
                    <Data>{user.email}</Data>
                </DataBox>
                <DataBox>
                    <Title>Phone Number :</Title>
                    <Data>{user.phone_no}</Data>
                </DataBox>
                <DataBox>
                    <Title>Address :</Title>
                    <Data>{user.address}</Data>
                    <Data>{user.city}</Data>
                    <Data>{user.state}</Data>
                    <Data>{user.country}</Data>
                    <Data>{user.pin_code}</Data>
                </DataBox>
            </Box1>
          </Wrapper1>
          <Wrapper2>
            <Box2>
                <Add>
                    <Heading>Update Details</Heading>
                </Add>
                <form onSubmit = {handleSubmit}>
                <Field>
                      <input 
                        className="input100"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="off"
                        // required
                      />
                      {/* <Label className="focus-input100"></Label> */}
                </Field>

                <Field>
                      <input 
                        className="input100"
                        type="text"
                        name="phone_no"
                        placeholder="Phone Number"
                        value = {phone_no}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="off"
                        // required
                      />
                      {/* <Label className="focus-input100"></Label> */}
                </Field>
                <Field>
                      <input 
                        className="input100"
                        type="text"
                        name="address"
                        placeholder="Address"
                        value = {address}
                        onChange={(e) => setAddress(e.target.value)}
                        autoComplete="off"
                        // required
                      />
                      {/* <Label className="focus-input100"></Label> */}
                </Field>
                <Field>
                      <input 
                        className="input100"
                        type="text"
                        name="city"
                        placeholder="City"
                        value = {city}
                        onChange={(e) => setCity(e.target.value)}
                        autoComplete="off"
                        // required
                      />
                      {/* <Label className="focus-input100"></Label> */}
                </Field>
                <Field>
                      <input 
                        className="input100"
                        type="text"
                        name="state"
                        placeholder="State"
                        value = {state}
                        onChange={(e) => setState(e.target.value)}
                        autoComplete="off"
                        // required
                      />
                      {/* <Label className="focus-input100"></Label> */}
                </Field>
                <Field>
                      <input 
                        className="input100"
                        type="text"
                        name="country"
                        placeholder="Country"
                        value = {country}
                        onChange={(e) => setCountry(e.target.value)}
                        autoComplete="off"
                        // required
                      />
                      {/* <Label className="focus-input100"></Label> */}
                </Field>
                <Field>
                      <input 
                        className="input100"
                        type="text"
                        name="pin_code"
                        placeholder="Pincode"
                        value = {pin_code}
                        onChange={(e) => setPin(e.target.value)}
                        autoComplete="off"
                        // required
                      />
                      {/* <Label className="focus-input100"></Label> */}
                </Field>
                <Add>
                    <Button type = 'submit'>UPDATE</Button>
                </Add>
                </form>
            </Box2>
          </Wrapper2>
        </Wrap>
        ):(
            <>
                <h1>Please Login</h1>
            </>
        )}
    </Container>
    </>
)
}

export default Profile

const Container = styled.div`
padding-left: 10%;
padding-top: 7%;
padding-bottom: 2%;
display: flex;
justify-content: center;
align-items: center;
background: #dde1e7;
color: #f6f6f7;
`

const Wrap = styled.div`
background-color: white;
// top: 60px;
// left: 150px;
height: calc(100vh - 20vh);
width: 65%;
border-radius: 25px;
overflow: hidden;
box-shadow: -8px -8px 9px rgba(255,255,255,0.45), 8px 8px 9px rgba(94,104,121,0.3);
  

// box-shadow: rgb(10 0 0 / 69%) 0px 100px 220px 90px,
// rgb(0 0 0 / 73%) 0px 0px 0px 0px;
transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
display: flex;
`
const Wrapper1 = styled.div`
    width: 50%;
    background-color: #430caf;
    display: flex;
    align-items: center;
    justify-content: center;


    -webkit-box-shadow: inset -2px -7px 47px 18px rgba(119,58,194,0.82);
-moz-box-shadow: inset -2px -7px 47px 18px rgba(119,58,194,0.82);
box-shadow: inset -2px -7px 47px 18px rgba(119,58,194,0.82);
`
const ImgBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Btn = styled.button`
    border: 1px solid #f9f9f9;
    margin-right: 10%;
    width: 40%;
    height: 50%;
    padding: 8px 16px;
    border-radius: 30px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: all 0.2s ease 0s;
    cursor: pointer;
    background-color: #0ee387;
    font-weight: bold;
    color: white;
    border-color: transparent;
    -webkit-box-shadow: 6px 13px 27px 2px rgba(14,227,135,0.66);
    -moz-box-shadow: 6px 13px 27px 2px rgba(14,227,135,0.66);
    box-shadow: 6px 13px 27px 2px rgba(14,227,135,0.66);
        background-color: #0bbf71;
`

const UserImg = styled.img`
    width : 85px;
    height: 85px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid white;
    margin-bottom: 5%;
`

const Title = styled.p`
    font-family: cursive;
    font-size: 68%;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: white;
    font-family: system-ui;
`
const Data = styled.div`
    font-family: system-ui;
    font-size: 110%;
    letter-spacing: 0.5px;
`
const DataBox = styled.p`
    margin-bottom: 5%;
`

const Wrapper2 = styled.div`
    width: 50%; 
    display: flex;
    align-items: center;
    justify-content: center;
`
const Heading = styled.div`
font-size: 130%;
font-weight: bold;
text-transform: uppercase;
color: gray;
letter-spacing: 1.5px;
font-family: "Gill Sans", sans-serif;
border-bottom: 2px solid gray;
`
const Heading1 = styled.div`
p{
    font-size: 180%;
    font-weight: lighter;
    text-transform: uppercase;
    color: white;
    letter-spacing: 2px;
    font-family: system-ui;
}
border-bottom: 1px solid white;
`

const Details = styled.form`
margin-bottom: 30px;
height:70%;
display: flex;
flex-direction: column;
justify-content: space-between;
`

const Box1 = styled.div`
    color: white;
    height: calc(100vh - 35vh);
    width: 70%;
    margin-left: 10%;
`
const Box2 = styled.div`
    color: black;
    height: calc(100vh - 30vh);
    width: 70%;
    padding-top: 3%;
`

const Left = styled.div`
width: 400px; 
`
const Right= styled.div`
width: 400px;
`

const Label = styled.span`
margin-left: 3px;
margin-bottom: 3px;
font-size: 13px;
font-weight: 500;
letter-spacing: 1px;
`
const Field = styled.div`
top:0;
left: 0;
font-size: 6px;
margin: 25px;
display: flex;
flex-direction: column;

input{
width: 300px;
letter-spacing: 1px;
font-size: 12px;
padding: 5px 12px;
line-height: 20px;
border-radius: 6px;
border: 2px solid #EEEDE7;
outline: none;

// border-color: transparent; 
// border-bottom: 1px solid black;
// width: 300px;
// letter-spacing: 1px;
// font-size: 18px;
}
textarea{
width: 300px;
letter-spacing: 1px;
font-size: 16px;
padding: 5px 12px;
line-height: 20px;
border-radius: 6px;
border: 3px solid #EEEDE7;
outline: none;
resize: none;
}

`
const Add = styled.div`
display: flex;
justify-content: center;
margin-bottom: 5%;

// padding-right: 40px;

`
const Button = styled.button`
// margin-left: 25px;
border: 1px solid #f9f9f9;
width: 60%;
padding: 8px 16px;
border-radius: 30px;
letter-spacing: 1.5px;
text-transform: uppercase;
transition: all 0.2s ease 0s;
cursor: pointer;
background-color: #0ee387;
font-weight: bold;
color: white;
border-color: transparent;
-webkit-box-shadow: 6px 13px 27px 2px rgba(14,227,135,0.66);
-moz-box-shadow: 6px 13px 27px 2px rgba(14,227,135,0.66);
box-shadow: 6px 13px 27px 2px rgba(14,227,135,0.66);
    background-color: #0bbf71;
}
`