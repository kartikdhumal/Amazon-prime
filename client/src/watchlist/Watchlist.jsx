import React, { useEffect, useRef, useState } from 'react';
import '../styles/myhome.scss';
import Navbar from '../navbar/Navbar';
import '../styles/watchlist.scss';
import Loader from '../loader/Loader';
import { NavLink } from 'react-router-dom';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

function Watchlist() {
    const listRef = useRef();
    const [mywatchlists, setmywatchlists] = useState([]);
    const [moviedata, getShowData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (moviedata.length > 0) {
            fetchMyWatchlists();
        }
    }, [moviedata]);


    const handleDelete = async (showId) => {
        try {
            const userId = sessionStorage.myuserid;
            const response = await axios.delete(`http://localhost:6001/deletewatchlist/${userId}/${showId}`);
            if (response.status >= 200 && response.status < 300) {
                console.log('Delete successful');
                fetchData();
                fetchMyWatchlists();
            } else {
                console.error('Error deleting record:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };


    const fetchData = () => {
        fetch('https://amazonprime-newserver.vercel.app/findshow')
            .then((response) => response.json())
            .then((data) => {
                getShowData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }

    const fetchMyWatchlists = () => {
        const userId = sessionStorage.myuserid;
        fetch('https://amazonprime-newserver.vercel.app/watchlists')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('userId') && data[0].hasOwnProperty('showIds')) {
                    const userMyWatchlists = data.find(watchlist => watchlist.userId === userId);
                    if (userMyWatchlists) {
                        const showIds = userMyWatchlists.showIds;
                        const filteredShows = moviedata.filter(show => showIds.includes(show._id));
                        setmywatchlists(filteredShows);
                        setIsLoading(false);
                    }
                }
            })
            .catch((error) => {
                console.error("Error in client side " + error);
                setIsLoading(false);
            });
    };

    return (
        <div className='mymains'>
            <Navbar />
            <div className="myresults">
                <p> Watchlists </p>
                {isLoading ? (
                    <Loader />
                ) : (
                    mywatchlists.length === 0 ? (
                        <span className='empty'>Your watchlist is empty.</span>
                    ) : (
                        mywatchlists.map((result) => (
                            <div key={result.id} className="resultitem">
                                <img src={result.poster} className="resultposter" alt={result.title} />
                                <NavLink className="resulttitle" to={`/watch/${result._id}`}>
                                    <span>{result.title}</span>
                                </NavLink>
                                <span className='resultyear'>{result.seasons[result.seasons.length - 1].year}</span>
                                <span>
                                    <RemoveCircleOutlineIcon className='removeicon' onClick={() => handleDelete(result._id)} />
                                </span>
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
}

export default Watchlist;
