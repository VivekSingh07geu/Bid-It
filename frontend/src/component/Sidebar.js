import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <div>
        <Link to="/dashboard">
          <p>
            <DashboardIcon /> Dashboard
          </p>
        </Link>
      </div> */}
      <div>
        <Link to ="/dashboard/profile/update">
          <p>
            <PersonIcon /> Profile
          </p>
        </Link>
      </div>
      <div>
        <Link to = "/product/new">
          <p>
            <AddIcon /> Add Product
          </p>
        </Link>
      </div>
      <div>
        <Link to = "/product/list">
          <p>
            <PostAddIcon /> Bidded Products
          </p>
        </Link>
      </div>
      
      <div>
        <Link to="/product/added_products">
          <p>
            <ListAltIcon />
            Added Products
          </p>
        </Link>
      </div>
      <div>
        <Link to="/dashboard/orders">
          <p>
            <LocalMallIcon />
            Orders
          </p>
        </Link>
      </div>
      {/* <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link> */}
    </div>
  );
};

export default Sidebar;