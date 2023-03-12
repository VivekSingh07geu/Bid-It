import React, { Fragment, useEffect, useState } from 'react'
import "./ProductList.css"
import MetaData from './layout/MetaData'
import Sidebar from './Sidebar'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import {
    clearErrors,
    getAdminProduct,
    deleteProduct,
    getProduct,
  } from "../actions/productAction";
  import { DELETE_PRODUCT_RESET } from "../constants/productConstants";
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { loadUser } from '../actions/userAction';


function ProductList() {
    const dispatch = useDispatch();

  // const alert = useAlert();

  const { products } = useSelector((state) => state.products);
  const {user} = useSelector((state) => state.user);
  let deliveryStatus = "";

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getProduct());
  }, [dispatch]);

  function checkStatus(id){

      var have = false;
      products &&
      products.forEach((item) => {
         if(item._id === id){
            if(item.biddingStatus === "true"){
              have = true;
            }
         }
      })

      return have;
  }

  function checkWin(id){
    var have = false;
    products && user &&
    products.forEach((item) => {
       if(item._id === id){
          if(item.highestBidder === user._id){
            have = true;
          }
       }
    })

    return have;
  }

  function checkDeliveryStatus(id){
    if(checkStatus(id)){
      deliveryStatus = "Bidding not over yet";
    }
    else{
      if(checkWin(id)){
        deliveryStatus = user.delivery_status;
      }
      else{
        deliveryStatus = "You Didn't Win"
      }
    }

    return true;
  }

  const columns = [
    { field: "id",
      headerName: "Product ID",
      minWidth: 200,
      maxWidth: 250,
      flex: 0.5 
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      maxWidth: 150,
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Current Sold Price",
      // type: "number",
      minWidth: 150,
      maxWidth: 150,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      // type: "number",
      minWidth: 150,
      maxWidth: 150,
      flex: 0.5,
      renderCell: (params) =>{
        return (
          <>
            { products ? (
              <>
                {checkStatus(params.id) ? (<>
                  <p>Bidding Running</p>
                </>) : (<>
                  <p>Bidding Closed</p>
                </>)}
              </>
            ) : (<>

            </>)}
          </>
        )
      }
    },
    {
      field: "bidder",
      headerName: "Are You Winning",
      // type: "number",
      minWidth: 100,
      maxWidth: 150,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Fragment>
            {(user && products) ? (
              <>
                {checkWin(params.id) ? (
                  <>
                    
                    <CheckCircleRoundedIcon style={{ color: "green" }}/>
                    
                  </>
                ) : (
                  <CancelRoundedIcon style={{ color: "red" }}/>
                )}
              </>
            ) : (
              <>
                <OpenInNewRoundedIcon/>
              </>
            )}
          </Fragment>
        )
      }
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      // type: "number",
      minWidth: 10,
      maxWidth: 200,
      flex: 0.5,
      renderCell: (params) =>{
        return (
          <>
            { products ? (
              <>
                {checkDeliveryStatus(params.id) ? (
                <>
                  <p>{deliveryStatus}</p>
                </>
                ) : (
                  <></>
                )}
              </>
              
            ) : (<>

            </>)}
          </>
        )
      }
    },

    {
      field: "butt",
      headerName: "Go To Product",
      // type: "number",
      minWidth: 10,
      maxWidth: 150,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to = {`/product/${params.getValue(params.id, "id")}`}>
              <OpenInNewRoundedIcon style={{ color: "blue" }}/>
            </Link>
          </Fragment>
        )
      }
    },
  ];

  // item.bidders mai check karo id

    const rows = [];

    products &&
      products.forEach((item) => {
        let arr = [...item.bidders];
        let find = false;
        if(arr.length > 0){
          arr.forEach((it) => {
            if(it.user_id === user._id){
                find = true;
            }
          })
        }

        if(find){
          rows.push({
            id: item._id,
            price: item.price,
            name: item.name,
            biddingStatus: "chalu hai",
            deliveryStatus: "Implemet it...",
          });
        }
      });
  return (
    <>
    <div className='cover'>
      {/* <MetaData title={`All Bidded Products`} /> */}
      <div className='side'>
        <Sidebar />
      </div>
      <div className="dashboard">
        
        <div className="productListContainer">
            <h1 id="productListHeading">ALL BIDDED PRODUCTS</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              // disableSelectionOnClick
              className="productListTable"
              autoHeight
              disableColumnResize={true}
            />
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductList