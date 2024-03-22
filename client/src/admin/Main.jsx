import React, { useEffect, useState } from 'react'
import './main.scss'
import AdminNavbar from './AdminNavbar'
import { useNavigate } from 'react-router-dom';

function Main() {
  const [adminCount, setAdminCount] = useState(0);
  const [showCount, setShowCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const navigate = useNavigate();

  // useEffect(() => {
  //     if (!sessionStorage.userid) {
  //         navigate('/login');
  //     }
  // }, [navigate]);

  useEffect(() => {
    fetch('https://netflix-clone-alpha-pearl.vercel.app/countAdminUsers')
      .then((response) => response.json())
      .then((data) => setAdminCount(data.count))
      .catch((error) => console.error(error));

      fetch('https://netflix-clone-alpha-pearl.vercel.app/countShows')
      .then((response) => response.json())
      .then((data) => setShowCount(data.count))
      .catch((error) => console.error(error));

      fetch('https://netflix-clone-alpha-pearl.vercel.app/countMovies')
      .then((response) => response.json())
      .then((data) => setMovieCount(data.count))
      .catch((error) => console.error(error));
  }, []);
  
  return (
    <div className='homepage'>
       <AdminNavbar/>
      <div className="box">
        <div className='totalmovies'>
          <div className="title">
          Total movies
            </div>
            <div className="num">
              {movieCount}
            </div>
        </div>
        <div className='totalseries'>
        <div className="title">
          Total series
            </div>
            <div className="num">
              {showCount}
            </div>
        </div>
        <div className='totalusers'>
        <div className="title">
          Total users
            </div>
            <div className="num">
              {adminCount}
            </div>
        </div>        
      </div>
    </div>
  )
}

export default Main
