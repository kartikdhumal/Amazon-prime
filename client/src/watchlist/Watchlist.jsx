import React, { useEffect, useRef, useState } from 'react';
import '../admin/home.scss';
import Navbar from '../Navbar';
import ListItem from '../listitem/ListItem';
import './watchlist.scss';

function Watchlist() {
  const listRef = useRef();
  const [watchlists, setWatchlists] = useState([]);
  const [moviedata, getShowData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWatchLists();
    fetchData();
  }, []);

  const fetchWatchLists = () => {
    const userId = sessionStorage.myuserid;
    fetch('http://localhost:9000/watchlists')
      .then((response) => response.json())
      .then((data) => {
        const userWatchlists = data.filter(watchlist => watchlist.userId === userId);
        setWatchlists(userWatchlists);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error in client side " + error);
        setIsLoading(false);
      });
  };

  const fetchData = () => {
    fetch('https://amazon-prime-server.vercel.app/findshow')
      .then((response) => response.json())
      .then((data) => {
        getShowData(data);
      })
      .catch((error) => console.error(error));
  }
  const filteredShows = moviedata.filter(movie => watchlists[0].showIds.includes(movie._id));

  return (
    <div className='mymains'>
      <div className="navbas">
        <Navbar />
      </div>
      <div className="cards">
        <p className='title'> Watchlist </p>
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : watchlists[0].showIds.length === 0 ? (
          <div className="empty-watchlist">Your Watchlist is currently empty</div>
        ) : (
          <div className="mycards" ref={listRef}>
            {filteredShows.map((show, index) => {
              return (
                <ListItem data={show} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
