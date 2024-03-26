import React, { useEffect, useState } from 'react'
import '../styles/addnavbar.scss'
import netflix from '../images/amazonprime.png'
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink , useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UnauthorizeAdmin from './UnauthorizeAdmin';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import avatar from '../images/usericon.png'
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';

function Navbar() {
  const id = sessionStorage.userid;
  const navigate = useNavigate()
  const handleLogout = () =>
  { 
        sessionStorage.removeItem("userid");
        toast.info("Logged out");
        navigate('/login');
  }
   UnauthorizeAdmin()

   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };

  const openNavbar = () =>{
    const elementToToggle = document.getElementById('elementToToggle');
    const toggleButton = document.getElementById('toggleButton');
    const middlelogo = document.getElementById('middlelogo');
    if (elementToToggle.style.display === 'none' || elementToToggle.style.display === '') {
      elementToToggle.style.display = 'block';
      toggleButton.style.display = 'none';
      // middlelogo.style.display = 'none';
    } else {
      elementToToggle.style.display = 'none';
    }
  }

  const closeNavbar = () => {
    const elementToToggle = document.getElementById('elementToToggle');
    const toggleButton = document.getElementById('toggleButton');
    const middlelogo = document.getElementById('middlelogo');
    if (elementToToggle.style.display === 'block' || elementToToggle.style.display === '') {
      elementToToggle.style.display = 'none'; 
      toggleButton.style.display = 'block';
      // middlelogo.style.display = 'block';
// Show the element
    } else {
      elementToToggle.style.display = 'block'; 
    }
  }
    const [isScrolled,setIsScrolled ] = useState(false);
    window.onscroll = () =>{
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
   
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar scrolled"}>
       <div className='container'>
        <div className='left'>
          <img src={netflix} alt='logo'></img>
        </div>
        <div className="sidebar" id='elementToToggle'>
            <ul >
                <li><MenuIcon className='closeicon' onClick={closeNavbar}/></li>
                <li> <NavLink style={({ isActive }) => { return isActive ? { color : "#00a8e1" , transition : "0.175s ease-in-out "} : {}}} to="/admin"> Home </NavLink> </li>
                <li> <NavLink style={({ isActive }) => { return isActive ? { color : "#00a8e1" , transition : "0.175s ease-in-out "} : {}}} to="/users"> Users </NavLink> </li>
                <li> <NavLink style={({ isActive }) => { return isActive ? { color : "#00a8e1" , transition : "0.175s ease-in-out "} : {}}} to="/shows"> Shows </NavLink> </li>
            </ul>
         </div>
         <MenuIcon className='menuicon' onClick={openNavbar} id="toggleButton"/>
        <img src={netflix} alt='logo' id='middlelogo' className='middlelogo'></img>
        <div className='right'>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Profile">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar src={avatar} sx={{ width: 32, height: 32 }}></Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            className='menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                borderRadius: "10px",
                backgroundColor: "#0f171e",
                color: "#f2f2f2",
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "#f2f2f2",
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar src={avatar} sx={{ width: 32, height: 32 }}></Avatar>Kartik Dhumal
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" sx={{ color: "#f2f2f2" }} />
              </ListItemIcon>
              <NavLink style={{ color: "#f2f2f2" }} to={`/editprofile/${sessionStorage.myuserid}`}>Profile</NavLink>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: "#f2f2f2" }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
        </div> 
    </div>
  )
}

export default Navbar
