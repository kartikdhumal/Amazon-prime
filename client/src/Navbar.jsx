import React, { useEffect, useState } from 'react'
import '../src/styles/navbar.scss';
import netflix from './images/amazonprime.png'
import MenuIcon from '@mui/icons-material/Menu';
import avatar from './images/usericon.png'
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import UnauthorizeUser from './admin/UnauthorizeUser';

function Navbar() {
  const navigate = useNavigate()
  const id = sessionStorage.myuserid;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('myuserid');
    alert('Logged out');
    navigate('/login');
  };
  UnauthorizeUser()

  const openNavbar = () => {
    const elementToToggle = document.getElementById('elementToToggle');
    const toggleButton = document.getElementById('toggleButton');
    const middlelogo = document.getElementById('middlelogo');
    if (elementToToggle.style.display === 'none' || elementToToggle.style.display === '') {
      elementToToggle.style.display = 'block';
      toggleButton.style.display = 'none';
      middlelogo.style.display = 'none';
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
      middlelogo.style.display = 'block';
    } else {
      elementToToggle.style.display = 'block';
    }
  }

  return (
    <div className={"navbar"}>
      <div className='container'>
        <div className='left' id="elementToToggle">
          <MenuIcon className='closeicon' onClick={closeNavbar} />
          <img src={netflix} alt='logo'></img>
          <span> <NavLink className="link" to={`/homepage`}>  <span className="navbarmainLinks"> Home </span> </NavLink> </span>
          <span> <NavLink className="link" to={`/myshows`}>  <span className="navbarmainLinks"> Shows </span> </NavLink></span>
          <span> <NavLink className="link" to={`/mymovies`}>  <span className="navbarmainLinks"> Movies </span> </NavLink> </span>
          <span> <NavLink className="link" to={`/latest`}>  <span className="navbarmainLinks"> Latest </span>  </NavLink></span>
          <span> <NavLink className="link" to={`/mylist`}>  <span className="navbarmainLinks">  My List  </span></NavLink></span>
        </div>
        <MenuIcon className='menuicon' onClick={openNavbar} id="toggleButton" />
        <img src={netflix} alt='logo' id='middlelogo' className='middlelogo'></img>
        <div className='right'>
          <SearchIcon className='icon' />
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
