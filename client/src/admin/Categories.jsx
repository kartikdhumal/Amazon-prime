import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import './categories.scss';

function Categories() {
  const [showGenres, setShowGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://amazon-prime-server.vercel.app/findshow')
      .then((response) => response.json())
      .then((data) => {
        const genres = data.map((show) => show.genre);
        const uniqueGenres = [...new Set(genres)];
        setShowGenres(uniqueGenres);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of error
      });
  };

  return (
    <div className='home'>
      <Navbar />
      <div className='categories-container'>
        <h2 className='title'> Categories </h2>
        <div className='genres'>
          {loading ? (
            <div className='loadingmessage'>Loading...</div>
          ) : showGenres.length === 0 ? (
            <div className='no-category-message'>No Category Found</div>
          ) : (
            showGenres.map((genre, index) => (
              <NavLink to={`/showbycategory/${genre}`} key={index} className='genre-link'>
                <div className='boxes'>{genre}</div>
              </NavLink>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
