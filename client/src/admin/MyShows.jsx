import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Featured from '../featured/Featured'
import List from '../list/List'
import '../styles/home.scss'

function MyShows() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [moviedata, getShowData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const uniqueGenres = Array.from(new Set(moviedata.map(data => data.genre)));

  const fetchData = () => {
    fetch('https://amazon-prime-server.vercel.app/findshow')
      .then((response) => response.json())
      .then((data) => {
        getShowData(data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className='home'>
    <Navbar />
    <Featured type="series" />
    {
      uniqueGenres.map((data, index) => (
        <List key={index} title={data} type="categoryseries" genre={data} />
      ))
}
  </div>
  )
}

export default MyShows
