import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import AuthRedirect from './AuthRedirect'
import UnauthorizeAdmin from './UnauthorizeAdmin';

function Deleteuser() {
  const {id}= useParams();
    const navigate = useNavigate();
    // useEffect(()=>{
    //   if (!sessionStorage.userid) {
    //     navigate('/login');
    // }
    //     handleDelete();
    //     },[navigate])
       UnauthorizeAdmin()
        const handleDelete = () => {
          Axios.delete(`https://amazonprime-newserver.vercel.app/deleteuser/${id}`)
            .then((response) => {
              navigate('/users');
            })
            .catch((error) => {
              console.error('Error deleting record:', error);
              navigate('/users');
            });
        };
  return (
    <div>
      
    </div>
  )
}

export default Deleteuser
