import React , { Fragment, useEffect } from 'react'
import "./ProductList.css"
import Sidebar from './Sidebar'
import MetaData from './layout/MetaData'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { getProduct, updateProduct } from '../actions/productAction';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

function AddedProductList() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
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

  function stopBidding(id){
    if(checkStatus(id) === false){
      alert("Bidding Already Closed");
      return true;
    }
    else{
      var time = "";
      products &&
      products.forEach((item) => {
         if(item._id === id){
            
            time = new Date(item.date);
            time.setDate(time.getDate() - 1);

            console.log(item.date);
            console.log(time);

            time = new Date();
            var newDate = `${time.getMonth() + 1}-${time.getDate() - 1}-${time.getFullYear()}`;
            console.log(newDate);

            const myForm = new FormData();
            myForm.set("date" , newDate);
            myForm.set("biddingStatus" , "false");
            
            console.log(newDate);
            dispatch(updateProduct(id, myForm));

            window.location.reload();

            alert("Bidding Stopped");
            return;
          }
      })

      return true;
    }

    return true;
  }

  const columns = [
    { field: "id",
      headerName: "Product ID",
      minWidth: 150,
      maxWidth: 220,
      flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      maxWidth: 200,
      flex: 0.5,
    },
    {
      field: "biddingStatus",
      headerName: "Bidding Status",
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
      field: "deliveryStatus",
      headerName: "Status",
      // type: "number",
      minWidth: 150,
      maxWidth: 200,
      flex: 0.5,
    },
    {
      field: "try",
      headerName: "Stop Bidding",
      // type: "number",
      minWidth: 150,
      maxWidth: 150,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Fragment>
              {products && user ? (
                <form onClick={stopBidding.bind(this , params.id)}>
                    <CancelPresentationIcon type = "submit" style={{ color: "red" , cursor: "pointer" }} />
                </form>
              ):(
                <></>
              )}      
          </Fragment>
        )
      }
    },
    {
      headerName: "Go To Product",
      // type: "number",
      minWidth: 150,
      maxWidth: 150,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to = {`/product/${params.getValue(params.id, "id")}`}>
              <OpenInNewIcon style={{ color: "blue" }}/>
            </Link>
          </Fragment>
        )
      }
    },
  ];

  const rows = [];

    products &&
      products.forEach((item) => {
        if(item.user === user._id){
          rows.push({
            id: item._id,
            price: item.price,
            name: item.name,
            biddingStatus: "chalu hai",
            deliveryStatus: "Delivered",
            try: "Hello",
          });
        }
      });

  return (
    <div className = "cover">
      {/* <MetaData title={`ALL PRODUCTS - Admin`} /> */}
      <div className='side'>
        <Sidebar />
      </div>
      <div className="dashboard">
        
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ADDED PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
              disableColumnResize={true}
          />
        </div>
      </div>
    </div>
  )
}

export default AddedProductList