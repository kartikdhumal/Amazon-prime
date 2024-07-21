import React, { useEffect } from 'react'
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthRedirect from './AuthRedirect'
import UnauthorizeAdmin from './UnauthorizeAdmin';

function Deleteshow() {
  const navigate = useNavigate()
//   useEffect(() => {
//     const b = sessionStorage.userid;
//     if(!b){
//       navigate('/login');
//     }
// })
UnauthorizeAdmin()
    const {id}= useParams();
    useEffect(()=>{
        handleDelete();
        },[])
  
        const handleDelete = () => {
          Axios.delete(`https://amazonprime-newserver.vercel.app/deleteshow/${id}`)
            .then((response) => {
              navigate('/shows');
            })
            .catch((error) => {
              console.error('Error deleting record:', error);
              navigate('/shows');
            });
        };
  return (
    <div>
      
    </div>
  )
}

export default Deleteshow
