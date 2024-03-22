import React, { useEffect, useState } from 'react';
import './listitem.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import CheckIcon from '@mui/icons-material/Check';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

function ListItem({ index, data }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [watchlists, setWatchlists] = useState([]);

  useEffect(() => {
    fetchWatchLists();
    checkIfAddedToWatchlist();
  }, []);

  const checkIfAddedToWatchlist = () => {
    for (const watchlist of watchlists) {
      if (watchlist.showIds.includes(data._id)) {
        setIsAddedToWatchlist(true);
        return;
      }
    }
    setIsAddedToWatchlist(false);
  };

  const fetchWatchLists = () => {
    fetch('https://amazon-prime-server.vercel.app/watchlists')
      .then((response) => response.json())
      .then((datas) => {
        if (datas[0]?.showIds.includes(data._id)) {
          setIsAddedToWatchlist(true);
        }
      })
      .catch((error) => console.error(error));
  }

  const handleDelete = () => {
    fetch(`https://amazon-prime-server.vercel.app/deletewatchlist/${sessionStorage.myuserid}/${data._id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          fetchWatchLists();
          checkIfAddedToWatchlist();
        } else {
          console.error('Error deleting record:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
      });
  };


  const handleAddToWatchlist = async () => {
    try {
      const userId = sessionStorage.myuserid;
      if (!userId) {
        alert('User ID is empty');
        return;
      }
      const showId = data._id;
      if (!showId) {
        alert('Show ID is empty');
        return;
      }

      const response = await fetch('https://amazon-prime-server.vercel.app/addwatchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          showId: showId,
        }),
      });

      if (response.ok) {
        setIsAddedToWatchlist(true);
      } else {
        alert('Failed to add to watchlist');
      }
    } catch (error) {
      console.error('Error adding to watchlist in client:', error);
      alert('An error occurred while adding to watchlist');
    }
  };


  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 20).join(' ') + '...';
    } else {
      return description;
    }
  };

  let totalDuration = 0;
  if (data.seasons) {
    const lastSeason = data.seasons[data.seasons.length - 1];
    if (lastSeason && lastSeason.episodes) {
      lastSeason.episodes.forEach((episode) => {
        totalDuration += episode.duration;
      });
    }
  }
  const hours = Math.floor(totalDuration / 3600);
  const remainingMinutes = Math.floor((totalDuration % 3600) / 60);
  const durationDisplay = hours > 0 ? `${hours} hours ${remainingMinutes} minutes` : `${remainingMinutes} minutes`;

  return (
    <div className='listItem' style={{ left: isHovered ? index * 225 - 50 + index * 2.5 : 0 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={data.poster} alt='Show poster' />
      {isHovered && (
        <>
          <NavLink key={data._id} to={`/watch/${data._id}`}>
            <video src={data.seasons[data.seasons.length - 1].trailer} loop muted autoPlay={true}></video>
          </NavLink>
          <div className="itemInfo">
              <div className='showtitle'>
                <div className="maintitle">
                {data.title} {data.seasons.length > 1 ? data.seasons.length : ''}
                </div>
                <div className="iconsbox">
                <NavLink key={data._id} to={`/watch/${data._id}`}>
                <PlayArrowIcon className='playicon' />
                </NavLink>
              {isAddedToWatchlist ? (
                <CheckIcon className='icon' onClick={handleDelete} />
              ) : (
                <AddIcon className='icon' onClick={handleAddToWatchlist} />
              )}
            </div>
              </div>
              <NavLink key={data._id} to={`/watch/${data._id}`}>
              <div className="itemInfoTop">
                <span> {data.seasons[data.seasons.length - 1].year} </span>
                <span> {durationDisplay} </span>
                <span className='limits'> {'U/A ' + data.limit + "+"} </span>
              </div>
              <div className="description">
                {truncateDescription(data.description)}
              </div>
              {/* <div className="genre"> {data.genre} </div> */}
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}

export default ListItem;