import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import '../styles/categories.scss';
import Loader from '../loader/Loader';

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
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); 
      });
  };

  return (
    <div className='home'>
      <Navbar />
      <div className='maincontainer'>
        <h2 className='title'> Categories </h2>
        <div className='genres'>
          {loading ? (
            <div className='loadingmessage'><Loader/></div>
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
