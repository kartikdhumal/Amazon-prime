import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { useParams } from 'react-router-dom';
import '../styles/showbycategory.scss';
import List from '../list/List';
import Loader from '../loader/Loader';

function Showbycategory() {
    const { genre } = useParams();
    const [showGenres, setShowGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    };

    return (
        <div>
            <Navbar />
            <div className='categorycontainer'>
                <h2 className='cattitle'> {genre} </h2>
                <div className='genress'>
                    {isLoading ? (
                        <p><Loader/></p>
                    ) : showGenres.includes(genre) ? (
                        <>
                            <List title="Movie" type="categorymovies" genre={genre} />
                            <List title="Series" type="categoryseries" genre={genre} />
                        </>
                    ) : (
                        <p>No Shows Found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Showbycategory;
