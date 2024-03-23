import React, { useEffect, useState } from 'react'
import '../src/styles/navbar.scss';
import netflix from './images/amazonprime.png'
import avatar from './images/usericon.png'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from 'react-router-dom';
import UnauthorizeUser from './admin/UnauthorizeUser';

function Navbar() {
  const navigate = useNavigate()
  const [moviedata, getShowData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [boxopened, setboxopened] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const id = sessionStorage.myuserid;


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('https://amazon-prime-server.vercel.app/findshow')
      .then((response) => response.json())
      .then((data) => {
        getShowData(data);
      })
      .catch((error) => console.error(error));
  }

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length === 0) {
      setShowSearchResults(false);
      return;
    }
    const filteredResults = moviedata.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
    setShowSearchResults(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('myuserid');
    alert('Logged out');
    navigate('/login');
  };
  UnauthorizeUser()

  const opensearchbox = () => {
    setboxopened(true);
  }
  const closesearchbox  = () => {
    setboxopened(false);
  }
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
          <span><NavLink className="link" to={`/homepage`}><span className="navbarmainLinks">Home</span></NavLink></span>
          <span><NavLink className="link" to={`/myshows`}><span className="navbarmainLinks">Shows</span></NavLink></span>
          <span><NavLink className="link" to={`/mymovies`}><span className="navbarmainLinks">Movies</span></NavLink></span>
          <span><NavLink className="link" to={`/categories`}><span className="navbarmainLinks">Categories</span></NavLink></span>
          <span><NavLink className="link" to={`/watchlists`}><span className="navbarmainLinks">Watchlist</span></NavLink></span>
        </div>
        <MenuIcon className='menuicon' onClick={openNavbar} id="toggleButton" />
        <img src={netflix} alt='logo' id='middlelogo' className='middlelogo'></img>
        <div className='right'>
          {
            boxopened ? <>
              <CloseIcon className='icon' onClick={closesearchbox}/>
            </> : <>
              <SearchIcon className='icon' onClick={opensearchbox} />
            </>
          }
          {boxopened && (
            <div className="searchdivbox">
              <Paper
                component="form"
                className="searchinput"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon sx={{ fontSize: 28 }} />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: 22, color: '#f2f2f2' }}
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search google maps' }}
                  onChange={handleSearchChange}
                />
              </Paper>
            </div>
          )}
          {boxopened && showSearchResults && (
            <div className="search-results">
              {searchResults.map((result) => (
                <div key={result.id} className="search-result-item">
                  <img src={result.poster} className="poster" alt={result.title} />
                  <NavLink className="resulttitle" to={`/watch/${result._id}`}>
                    <span>{result.title}</span>
                  </NavLink>
                  <span className='resultyear'>{result.seasons[result.seasons.length - 1].year}</span>
                </div>
              ))}
            </div>
          )}

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
              <Avatar src={avatar} sx={{ width: 32, height: 32 }}></Avatar>
              {
                sessionStorage.email ? sessionStorage.email : 'user'
              }
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
