import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/changepassword.scss'
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import bcrypt from "bcryptjs";

function ChangePassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [id, setUserId] = useState(null);
  const [userdata, setUserData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;

  const handleChange = (e) => {
    setPassword(e.target.value);
    if (error) {
      setError('');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios.get('https://amazonprime-newserver.vercel.app/finduser')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      });
  };

  useEffect(() => {
    const user = userdata.find(user => user.email === email.trim());
    if (user) {
      setUserId(user._id);
    }
  }, [userdata, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.warning('Password cannot be empty');
    } else if (password.length < 6) {
      toast.warning('Password must be at least 6 characters long.');
    } else if (!id) {
      toast.error('User not found');
    } else {
      setIsLoading(true);
      try {
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
       console.log(response);
        if (response.ok) {
          toast.success('Password changed successfully');
          navigate('/login');
          setPassword('');
        } else {
          toast.error('Failed to change password');
          setPassword('');
        }
      } catch (error) {
        console.error('Error changing password:', error);
        toast.error('Failed to change password');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="registerbox">
      <div className="containerbox">
        <form method='post' className='form' onSubmit={handleSubmit}>
          <p>Change Password</p>
          <input type='email' name='email' value={email} id='email' readOnly></input>
          <input type='password' name='password' value={password} required onChange={handleChange} className={`${error ? 'error' : ''}`} id='password' placeholder='password'></input>
          <button type='submit' className="registerButton">
            {isLoading ? <CircularProgress /> : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
