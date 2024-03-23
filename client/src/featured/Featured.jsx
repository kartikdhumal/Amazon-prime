import React, { useEffect, useState } from 'react'
import './featured.scss'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { NavLink, useNavigate } from 'react-router-dom';

function Featured({ type, onTypeChange }) {
  const [moviedata, getShowData] = useState([])
  const [mydata, setMyData] = useState([])
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [watchlists, setWatchlists] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`https://amazon-prime-server.vercel.app/findshow/${type}`)
        .then((response) => response.json())
        .then((data) => getShowData(data))
        .catch((error) => console.error(error));
    }
    fetchData();
  }, [onTypeChange])

  useEffect(() => {
    fetchWatchLists();
    checkIfAddedToWatchlist();
  }, []);

  const checkIfAddedToWatchlist = () => {
    for (const watchlist of watchlists) {
      if (watchlist.showIds.includes(mydata._id)) {
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
        if (datas[0]?.showIds.includes(mydata._id)) {
          setIsAddedToWatchlist(true);
        }
      })
      .catch((error) => console.error(error));
  }

  const handleDelete = () => {
    fetch(`https://amazon-prime-server.vercel.app/deletewatchlist/${sessionStorage.myuserid}/${mydata._id}`, {
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
      const showId = mydata._id;
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
        alert('Something is wrong');
      }
    } catch (error) {
      console.error('Error adding to watchlist in client:', error);
      alert('An error occurred while adding to watchlist');
    }
  };

  useEffect(() => {
    if (moviedata.length > 0) {
      randomc();
    }
  }, [moviedata]);

  const randomc = () => {
    const randomElement = moviedata[Math.floor(Math.random() * moviedata.length)];
    setMyData(randomElement);
  };

  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    onTypeChange(selectedValue);
  };

  const truncateDescription = (description) => {
    if (description) {
      const words = description.split(' ');
      if (words.length > 30) {
        return words.slice(0, 30).join(' ') + '...';
      } else {
        return description;
      }
    } else {
      return '';
    }
  };


  return (
    <div>
      <div className="featured">
        {mydata.seasons && mydata.seasons.length > 0 && (
          <video autoPlay muted loop className='featuredvideo' src={mydata.seasons[mydata.seasons.length - 1].trailer}></video>
        )}
        <div className="info">
          <div className="line">
            {<h1> {mydata.title} </h1>}
          </div>
          <span className="desc">
            {truncateDescription(mydata.description)}
          </span>
          <div className="buttons">
            <button className="play">
              <PlayArrowIcon />
              <NavLink className='playbutton' to={`/watch/${mydata._id}`}> <span> Play </span> </NavLink>
            </button>
            <div>
              {isAddedToWatchlist ? (
                <CheckIcon className='myicon' onClick={handleDelete} />
              ) : (
                <AddIcon className='myicon' onClick={handleAddToWatchlist} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
