import React, { useEffect, useState } from 'react'
import '../styles/main.scss'
import AdminNavbar from './AdminNavbar'
import { useNavigate } from 'react-router-dom';

function Main() {
  const [UserCount, setUserCount] = useState(0);
  const [showCount, setShowCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);

  useEffect(() => {
    fetch('https://amazonprime-newserver.vercel.app/finduser')
      .then((response) => response.json())
      .then((data) => {
        let users = data.filter((user) => user.isAdmin === false).length;
        setUserCount(users);
      })
      .catch((error) => console.error(error));

    fetch('https://amazonprime-newserver.vercel.app/findshow')
      .then((response) => response.json())
      .then((data) => {
        let shows = data.filter((show) => show.isSeries === true).length;
        setShowCount(shows);
      })
      .catch((error) => console.error(error));

    fetch('https://amazonprime-newserver.vercel.app/findshow')
      .then((response) => response.json())
      .then((data) => {
        let movies = data.filter((movie) => movie.isSeries === false).length;
        setMovieCount(movies);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='homepage'>
      <AdminNavbar />
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
            {UserCount}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
