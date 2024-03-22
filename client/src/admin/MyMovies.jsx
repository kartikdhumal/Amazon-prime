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

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };
  useEffect(() => {
    fetchData();
  }, [])
  const handleGenreChange = (selectedGenre) => {
    setSelectedGenre(selectedGenre);
    console.log(selectedGenre);
  };

  const fetchData = async () => {
    await fetch(`https://netflix-clone-alpha-pearl.vercel.app/findgenre/${selectedGenre}`)
      .then((response) => response.json())
      .then((data) => dropdowndata(data))
      .catch((error) => console.error(error));
  }

  // useEffect(()=>{
  //   fetchData()
  //   if (!sessionStorage.myuserid) {
  //     navigate('/login');
  //   }
  //   },[selectedGenre])

  return (
    <div className='home'>
      <Navbar />
      <Featured onTypeChange={handleGenreChange} type="movie" />
      {
        selectedGenre == "" ? (
          <>
            <List title="Continue to Watch" type="amovies" genre="" />
            <List title="Trending Now" type="bmovies" genre="" />
            <List title="Popular on Netflix" type="cmovies" genre="" />
          </>
        ) : (
          <>
            <List title="Continue to Watch" type="amovies" genre={selectedGenre} />
            <List title="Trending Now" type="bmovies" genre={selectedGenre} />
            <List title="Popular on Netflix" type="cmovies" genre={selectedGenre} />
          </>
        )
      }
    </div>
  )
}

export default MyShows
