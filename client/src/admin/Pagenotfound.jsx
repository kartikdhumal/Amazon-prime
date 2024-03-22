import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Pagenotfound() {
  const navigate = useNavigate();

  // useEffect(() => {
  //     if (!sessionStorage.token) {
  //         navigate('/login');
  //     }
  // }, [navigate]);
  return (
    <div>
       <h1> Page not found - 404</h1>
    </div>
  )
}

export default Pagenotfound
