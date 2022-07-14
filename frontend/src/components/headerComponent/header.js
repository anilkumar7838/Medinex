import React, { useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import AddIcon from '@mui/icons-material/Add';
import CallIcon from "@mui/icons-material/Call";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";
import Img from "../../assets/7.png"

const menu=[
  {
    icon:HomeIcon,
    item:"Home",
    Location:"/",
  },
  {
    icon:AddIcon,
    item:"Add med",
    Location:"/medicines",
  },
  {
    icon:RoomServiceIcon,
    item:"Notifications",
    Location:"/notify",
  },
  {
    icon:CallIcon,
    item:"ContactUs",
    Location:"/contact",
  },
]

const Header = () => {


  const navigate= useNavigate();
  const dispatch=useDispatch();
  const [navbar, setNavbar] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const {isAuthenticated} = useSelector((state)=>state.user);
  const sidebarHandle = () => {
    setSidebar(!sidebar);
  };
  const handleClickAway = () => {
    return setSidebar(false);
  };

  const changeNav = () => {
    if (window.scrollY >= 20) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  
  window.addEventListener("scroll", changeNav);

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  
  return (
    <>
      <nav className={navbar ? "navbar sticky" : "navbar"}>
        <div className="inner-width">
          <div className="mainHeading">
            <Link to="/" className="logo">
              <img src={Img} alt="not-found" />
            </Link>
          </div>
          <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <button
              onClick={sidebarHandle}
              className={sidebar ? "menu-toggler active" : "menu-toggler"}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className={sidebar ? "navbar-menu active" : "navbar-menu"}>
              {menu.map((menu)=>{
                return (
                  <Link className="navlink" to={menu.Location}>
                    <menu.icon className="navicon" />
                    {menu.item}
                  </Link>
                )
              })
              }
              {isAuthenticated ? (<Link className="navlink" onClick={()=>{
                logoutUser()
              }}
               to="/">
                <LogoutIcon className="navicon" />
                Logout
              </Link>):(
              <Link className="navlink" to="/login">
                <LoginIcon className="navicon" />
                Login
              </Link>
              )}
              
            </div>
            </div>
          </ClickAwayListener>
        </div>
      </nav>
    </>
  );
};

export default Header;
