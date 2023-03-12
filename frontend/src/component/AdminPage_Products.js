import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

function AdminPage_Products() {
  return (
    <Container>
        <Headings>
            
            
                <Outer>
                    <Link to = "/admin/users" style={{ textDecoration: 'none'}}>
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
            Details;
        </Content>
    </Container>
  )
}

export default AdminPage_Products

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 5%;
`

const Headings = styled.div`
    display: flex;
    width: 100%;
    height: 8%;
`
const Boder = styled.div`
height: 1%;
width: 100%;
border-bottom: 1px solid black;
display: flex;
`

const First = styled.div`
  width: 50%;
`

const Outer = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
  width: 50%;
  height: 100%;
  p{
    font-family: system-ui;
    font-size: 150%;
    font-weight: 600;
    color: black;
    width: 100%;
  }
`


const Second = styled.div`
  width: 50%;
  background: red;
`

const Content = styled.div`
`
