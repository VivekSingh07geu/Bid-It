import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/userAction';
import AdminContainerUser from './AdminContainerUser';

import { ToastContainer, toast } from 'react-toastify';

function AdminPage_Users() {

  const dispatch = useDispatch();

  const {users} = useSelector(
    (state) => state.allUsers
    );

    useEffect(() => {
        dispatch(getAllUsers());   
    } , [dispatch]);


  return (
    <Container>
      {users ? (
        <div>
        <Headings>
            
            <Outer>
              <Link to = "/admin/users" style={{ textDecoration: 'none' }}>
                  <div>
                    <p>All Users</p>
                  </div>
              </Link>
            </Outer>
            <Outer>
                <Link to = "/admin/products" style={{ textDecoration: 'none' }}>
                  <div>
                    <p>All Products</p>
                  </div>
                </Link>
            </Outer>
        </Headings>
        <Boder>
          <First>
          </First>
          <Second>
          </Second>
        </Boder>
        <Content>
          {users.map(user => (
                <AdminContainerUser data = {user} />
            ))}
          <ToastContainer />
        </Content>
        </div>
      ):(
        <></>
      )}
    </Container>
  )
}

export default AdminPage_Users

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 5%;
`

const Headings = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 8%;
`
const Boder = styled.div`
height: 1%;
width: 100%;
border-bottom: 1px solid black;
// background: red;
display: flex;
`

const First = styled.div`
  width: 50%;
  background: red;
`

const Outer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p{
    font-family: system-ui;
    font-size: 150%;
    font-weight: 600;
    color: black;
  }
`


const Second = styled.div`
  width: 50%;
`

const Content = styled.div`
  height: 100vh;
  background: #dde1e7;
`
