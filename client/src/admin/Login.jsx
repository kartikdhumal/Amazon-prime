import React, { useState } from 'react'
import './login.scss'
import logo from '../images/amazonprime.png'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Axios from 'axios';
import { toast } from 'react-toastify'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (email === "" || password === "") {
        toast.warning("Please enter your Email and Password");
        setIsLoading(false);
        return;
      }

      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        toast.warning("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      if (password.length < 2) {
        toast.warning("Password must be at least 2 characters long");
        setIsLoading(false);
        return;
      }

      const response = await Axios.post(
        'https://amazon-prime-server.vercel.app/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.usernot) {
        toast.error('User not exists');
        setEmail("");
        setPassword("");
      } else if (response.data.passwordnot) {
        toast.warning('Incorrect Password');
        setPassword("");
      } else if (response.data && response.data.success) {
        if (response.data.isadmin === true) {
          toast.info('Login successful');
          sessionStorage.setItem('userid', response.data.userid);
          sessionStorage.setItem('email', response.data.email);
          setEmail("");
          setPassword("");
          navigate('/admin');
        } else {
          toast.info('Login successful');
          sessionStorage.setItem('myuserid', response.data.userid);
          sessionStorage.setItem('email', response.data.email);
          setEmail("");
          setPassword("");
          navigate('/homepage');
        }
      } else {
        toast.error('Something went wrong');
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error('Try Again!', error);
      setEmail("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="loginbox">
        <div className="top">
          <div className="wrapper">
            <img className='logo' src={logo} alt='logo' />
          </div>
        </div>
        <div className="container">
          <form onSubmit={handleLogin}>
            <p> Sign in </p>
            <input type='email' id='email' value={email} onChange={handleEmail} required placeholder='Email' />
            <input type='password' value={password} onChange={handlePassword} required id='password' placeholder='Password' />

            <button className="loginButton">
              {isLoading ? <CircularProgress size={24} /> : "Continue"} </button>
            <span> By continuing, you agree to the Amazon <span>Conditions of Use and Privacy Notice</span> </span>
          </form>
          <div className='newtoamazon'> ---------------------------------- New to Amazon? ----------------------------------</div>
          <NavLink className="createButton" to={'/register'}> <div>
            Create Your Amazon Account</div> </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Login