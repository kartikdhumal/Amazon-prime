import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function UnauthorizeUser() {
    const navigate = useNavigate()
    useEffect(() => {
        const myuserId = sessionStorage.myuserid;
        if (!myuserId) {
          navigate('/login');
        }
      }, []);
  return (
    <div>
      
    </div>
  )
}

export default UnauthorizeUser
