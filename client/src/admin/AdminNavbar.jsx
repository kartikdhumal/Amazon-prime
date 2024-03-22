import React, { useEffect, useState } from 'react'
import './addnavbar.scss'
import netflix from '../images/amazonprime.png'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink , useNavigate} from 'react-router-dom';
import avatar from '../images/avatar.png'
import UnauthorizeAdmin from './UnauthorizeAdmin';

function Navbar() {
  
  const id = sessionStorage.userid;
  const navigate = useNavigate()
  const handleLogin = () =>
  { 
        sessionStorage.removeItem("userid");
        alert("Logged out");
        navigate('/login');
  }
   UnauthorizeAdmin()

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
        <div className='rightside'>
             <img src={avatar}></img>
             <div className='profile'>
                <ArrowDropDownIcon className="icon"/>
                <div className='options'>
                <span> <NavLink to={`/editprofile/${id}`}> Profile </NavLink> </span>
                <span onClick={handleLogin}> Logout </span>
                </div>
             </div>
        </div>
        </div> 
    </div>
  )
}

export default Navbar
