import React, { useEffect, useState } from 'react'
import '../styles/main.scss'
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
    fetch('https://amazon-prime-server.vercel.app/countAdminUsers')
      .then((response) => response.json())
      .then((data) => setAdminCount(data.count))
      .catch((error) => console.error(error));

      fetch('https://amazon-prime-server.vercel.app/countShows')
      .then((response) => response.json())
      .then((data) => setShowCount(data.count))
      .catch((error) => console.error(error));

      fetch('https://amazon-prime-server.vercel.app/countMovies')
      .then((response) => response.json())
      .then((data) => setMovieCount(data.count))
      .catch((error) => console.error(error));
  }, []);
  
  return (
    <div className='homepage'>
       <AdminNavbar/>
      <div className="box">
        <div className='totalmovies'>
          <div className="analyticstitle">
          Total movies
            </div>
            <div className="num">
              {movieCount}
            </div>
        </div>
        <div className='totalseries'>
        <div className="analyticstitle">
          Total series
            </div>
            <div className="num">
              {showCount}
            </div>
        </div>
        <div className='totalusers'>
        <div className="analyticstitle">
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
