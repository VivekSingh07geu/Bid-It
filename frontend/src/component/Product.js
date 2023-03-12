import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import styled from 'styled-components';




const Product = ({product}) => {
  const options = {
    edit: false,
    color: "rgba(20  20 , 20 , 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  }

  return (
    <Cover>
      <Link className = "productCard" to = {`/product/${product._id}`}>
          {/* <img src = {product.images[0].url} alt = {product.name} /> */}
          {/* <img src = {product.image} alt = {product.name} />
          <p>{product.name}</p>
          <div>
              <ReactStars {...options} /> <span> (0 Reviews)</span>
          </div>
          <span>{`₹${product.price}`}</span> */}

          <Card>
            <img src = {product.image} alt = {product.name} />
          </Card>
      </Link>
      <p>{product.name}</p>
    </Cover>
  )
}

export default Product

const Card = styled.div`
border-radius: 10px;
cursor: pointer;
overflow: hidden;
height: 200px;
width: 250px;
border: 3px solid rgba(249 , 249 , 249 , 0.1);
box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
margin-left: auto;
margin-right: auto;
// margin-bottom: 18px;
display: flex;
justify-content: center;
// padding: 10px;

img {
    max-width: 100%;
    max-height: 100%;
} 

&:hover {
    transform: scale(1.10);
    border-color: rgba(249 , 249 , 249 , 0.8);
}

&:active{
  transform: scale(0.95) rotateZ(1.7deg);
}

`

const Cover = styled.div`
    p {
        margin-top: 15px;
        text-align: center;
        text-transform: capitalize;
        font-family: system-ui;
    }
`