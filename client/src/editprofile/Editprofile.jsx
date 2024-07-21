import React, { useEffect, useState } from 'react'
import '../styles/editprofile.scss'
import { useNavigate, useParams } from 'react-router-dom';
import avatar from '../images/avatar.png'
import Navbar from '../navbar/Navbar'
import AdminNavbar from '../admin/AdminNavbar'
import CircularProgress from '@mui/material/CircularProgress';
import bcrypt from "bcryptjs";
import { toast } from 'react-toastify';

function Editprofile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let id;
  if (sessionStorage.userid) {
    id = sessionStorage.getItem('userid');
  } else {
    id = sessionStorage.getItem('myuserid');
  }
  const fetchData = async () => {
    try {
      const response = await fetch(`https://amazonprime-newserver.vercel.app/fetcheditprofile/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEmail(data.email);
        setRole(data.role);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (!id) {
      navigate('/login');
    }
    fetchData();
  }, [])

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const validatePassword = (password) => {
    return password.length >= 2;
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Both email and password are required.');
    } else if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
    } else if (password.length < 2) {
      toast.error('Password must be at least 2 characters long.');
    } else {
      try {
        setLoading(true);
        const response = await fetch(`https://amazonprime-newserver.vercel.app/editprofile/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: bcrypt.hashSync(password, 8)
          }),
        });

        if (response.ok) {
          if (sessionStorage.userid) {
            toast.info('Profile updated successfully!');
            navigate('/admin');
          }
          if (sessionStorage.myuserid) {
            toast.info('Profile updated successfully!');
            navigate('/homepage');
          }
        } else {
          toast.error('Profile update failed');
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  }

  return (
    <div className='editprofile'>
      {
        sessionStorage.myuserid ? <>
          <Navbar />
        </> : <>
          <AdminNavbar />
        </>
      }
      <h5>Edit profile</h5>
      <div className="formbox">
        {loading ? <>
          <form className='myform'>
            <CircularProgress />
          </form>
        </> : <>
          <form className='myform' method='post' onSubmit={onHandleSubmit}>
            <input type='email'  placeholder='email' id='email' value={email || ''} onChange={handleEmail} name="email" required></input>
            <input type='password' placeholder="New Password" id='password' value={password || ''} onChange={handlePassword} name='password' required></input>
            <button type='submit' >Update profile</button>
          </form>
        </>}
      </div>
    </div>
  )
}

export default Editprofile
