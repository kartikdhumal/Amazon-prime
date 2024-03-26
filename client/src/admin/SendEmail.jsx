import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'
import { toast } from 'react-toastify';
import '../styles/sendemail.scss'
import { CircularProgress } from '@mui/material';

function SendEmail() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [userdata, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    const fetchUsers = () => {
        fetch('https://amazon-prime-server.vercel.app/finduser')
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => console.error(error));
    }

    const handleSendOTP = () => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        else {
            const userExists = userdata.find(user => user.email === email);
            if (!userExists) {
                toast.warning('No user found with this email');
                setEmail('');
            } else {
                const otp = Math.floor(1000 + Math.random() * 9000);
                setLoading(true);

                const templateParams = {
                    to_email: email,
                    subject: 'Your OTP for resetting password',
                    message: otp,
                };

                emailjs.send('service_ekhgoiq', 'template_bei6puv', templateParams, '4bTjCO33g6vqxyOyK')
                    .then((response) => {
                        toast.success('An OTP has been sent to your email address ' + email);
                        navigate('/otp', { state: { otp, email } });
                        setEmail('');
                    })
                    .catch((error) => {
                        console.error('Email send error:', error);
                        toast.error('Failed to send OTP. Please try again later.');
                        setEmail('');
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    return (
        <div className='send-email-container'>
            <div className='form-container'>
                <p className='title'>Type your email to get OTP</p>
                <div className='input-container'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='emailinput'
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {error && <p className='error-message'>{error}</p>}
                </div>
                <button onClick={handleSendOTP} className='submit-button'>
                    {loading ? <CircularProgress /> : 'Continue'}
                </button>
            </div>
        </div>
    );
}

export default SendEmail;
