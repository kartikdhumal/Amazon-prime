import React, { useRef, useState } from 'react'
import '../styles/register.scss'
import logo from '../images/amazonprime.png'
import { NavLink, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import bcrypt from "bcryptjs";
import { toast } from 'react-toastify';

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [clicked, isClicked] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef()
    const passwordRef = useRef()

    const openLogin = () => {
        navigate('/login')
    }
    const handleEmail = (event) => {
        const value = event.target.value;
        setEmail(value);
        console.log(event.target.name + " " + email);
    }
    const handlePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
    }

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleStart = () => {
        isClicked(true);
    }
    const handleUserSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (email == "" && password == "") {
            toast.warning('Please enter the field');
            setIsLoading(false);
        }
        else if (!validateEmail(email)) {
            toast.warning('Please enter a valid email address.');
            setIsLoading(false);
            isClicked(false);
        }
        else if (password.length < 2) {
            toast.warning('Password must be at least 2 characters long.');
            setIsLoading(false);
            setPassword('');
        }
        else {
            try {
                const mydata = await Axios.post('https://amazonprime-newserver.vercel.app/register', {
                    email: email,
                    password: bcrypt.hashSync(password, 8),
                    isAdmin: isAdmin
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (mydata.data.userexists) {
                    toast.error('User already exists');
                    setEmail("");
                    setPassword("");
                    setIsLoading(false);
                }
                if (mydata.data.userid) {
                    sessionStorage.setItem('myuserid', mydata.data.userid);
                    sessionStorage.setItem('email', mydata.data.userData.email);
                    toast.info('Registered Successfully');
                    setIsLoading(false);
                    setEmail("");
                    setPassword("");
                    navigate('/homepage');
                }
                setIsLoading(false);
            } catch (err) {
                console.error("Error : " + err);
                toast.error('User already exists');
                setIsLoading(false);
                setEmail("");
                setPassword("");
            }
        }
    }
    return (
        <div>
            <div className="register">
                <div className="top">
                    <div className="wrapper">
                        <img className='logo' src={logo} alt='logo' />
                    </div>
                </div>
                <div className="container">
                    <form method='post' className='form' onSubmit={handleUserSubmit}>
                        <p> Create Account  </p>
                        <input type='email' name='email' value={email} id='email' required onChange={handleEmail} placeholder='Email'></input>
                        <input type='password' name='password' value={password} required onChange={handlePassword} id='password' placeholder='password'></input>
                        <button type='submit' className="registerButton">
                            {isLoading ? <CircularProgress /> : "Continue"}
                        </button>
                        <span> Already have an account ?<NavLink to={'/login'}> <span className='signintext'>Sign In</span></NavLink></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register