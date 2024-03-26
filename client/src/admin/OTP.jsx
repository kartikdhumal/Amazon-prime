import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/otp.scss'
import { CircularProgress } from '@mui/material';

function OTP() {
  const navigate = useNavigate();
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const location = useLocation();
  const { otp, email } = location.state;
  const [loading, setLoading] = useState(false);

  const handleKeyDown = (e, inputRef) => {
    if (e.key === 'Backspace' && inputRef.current.selectionStart === 0 && inputRef.current.selectionEnd === 0) {
      switch (inputRef) {
        case input2Ref:
          input1Ref.current.focus();
          break;
        case input3Ref:
          input2Ref.current.focus();
          break;
        case input4Ref:
          input3Ref.current.focus();
          break;
        default:
          break;
      }
    }
  };

  const handleChange = (e, inputRef) => {
    const value = e.target.value;
    if (value.length === 1) {
      switch (inputRef) {
        case input1Ref:
          input2Ref.current.focus();
          break;
        case input2Ref:
          input3Ref.current.focus();
          break;
        case input3Ref:
          input4Ref.current.focus();
          break;
        default:
          break;
      }
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const otpDigits = [
      input1Ref.current.value,
      input2Ref.current.value,
      input3Ref.current.value,
      input4Ref.current.value
    ];

    if (otpDigits.some(digit => isNaN(Number(digit)))) {
      toast.error('Please enter valid numeric digits for OTP.');
      return;
    }
    
    if (otpDigits.some(digit => !digit)) {
      toast.error('Please enter all four digits of the OTP.');
      return;
    }

    const enteredOTP = otpDigits.join('');
    console.log(enteredOTP);
    console.log(otp);
    try {
      setLoading(true);
      if (enteredOTP ==  otp) {
        toast.success('Verification successful');
        navigate('/changepassword', { state: { email } });
        input1Ref.current.value = '';
        input2Ref.current.value = '';
        input3Ref.current.value = '';
        input4Ref.current.value = '';
        input1Ref.current.focus();
      } else {
        toast.error('Incorrect OTP. Please try again.');
        input1Ref.current.value = '';
        input2Ref.current.value = '';
        input3Ref.current.value = '';
        input4Ref.current.value = '';
        input1Ref.current.focus();
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Failed to verify OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='otp-container'>
      <div className='otp-form'>
        <h2 className='title'>Enter OTP</h2>
        <div className='otp-inputs'>
          <input
            ref={input1Ref}
            type='text'
            maxLength='1'
            onKeyDown={(e) => handleKeyDown(e, input1Ref)}
            onChange={(e) => handleChange(e, input1Ref)}
          />
          <input
            ref={input2Ref}
            type='text'
            maxLength='1'
            onKeyDown={(e) => handleKeyDown(e, input2Ref)}
            onChange={(e) => handleChange(e, input2Ref)}
          />
          <input
            ref={input3Ref}
            type='text'
            maxLength='1'
            onKeyDown={(e) => handleKeyDown(e, input3Ref)}
            onChange={(e) => handleChange(e, input3Ref)}
          />
          <input
            ref={input4Ref}
            type='text'
            maxLength='1'
            onKeyDown={(e) => handleKeyDown(e, input4Ref)}
            onChange={(e) => handleChange(e, input4Ref)}
          />
        </div>
        <button onClick={handleOTPSubmit} className='submit-button'>
          {loading ? <CircularProgress/> : 'Submit OTP'}
        </button>
      </div>
    </div>
  );
}

export default OTP;
