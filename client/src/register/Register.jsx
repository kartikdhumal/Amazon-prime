import React, { useRef, useState } from 'react'
import './register.scss'
import logo from '../images/netflix.png'
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef()
    const passwordRef = useRef()
    
    const openLogin = () => {
          navigate('/login')
    }
    const handleStart = () => {
        setEmail(emailRef.current.value)
    }
    const handleFinish = () => {
        setPassword(passwordRef.current.value)
    }
    return (
        <div>
            <div className="register">
                <div className="top">
                    <div className="wrapper">
                        <img className='logo' src={logo} alt='logo' />
                        <button className="loginButton" onClick={openLogin}> 
                        Sign in 
                        </button>
                    </div>
                </div>
                <div className="container">
                    <h1> Unimited movies , TV shows and more. </h1>
                    <h2> Watch anywhere. Cancel anytime </h2>
                    <p>
                        Ready to watch? Enter your email to create or restart your membership
                    </p>{
                        !email ? (
                            <div className='input'>
                                <input type='email' ref={emailRef} id='email' placeholder='email address'></input>
                                <button onClick={handleStart} className="registerButton">Get Started </button>
                            </div>
                        ) : (
                            <div className='input'>
                            <input type='password' ref={passwordRef} id='password' placeholder='password'></input>
                            <button  onClick={handleFinish} className="registerButton"> Start </button>
                        </div>  
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Register
