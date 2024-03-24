import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Featured from '../featured/Featured'
import List from '../list/List'
import './home.scss'
import { useNavigate } from 'react-router-dom'

function MyShows() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const navigate = useNavigate()
  const [mydata, dropdowndata] = useState([])
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
      <Featured type="movie" />
      {
        uniqueGenres.length > 0 && (
          uniqueGenres.map((data, index) => (
            <List title={data} type="categorymovies" genre={data} />
          ))
        )
      }
    </div>
  )
}

export default MyShows
