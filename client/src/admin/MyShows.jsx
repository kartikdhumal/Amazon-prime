import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Featured from '../featured/Featured'
import List from '../list/List'
import './home.scss'
import { useNavigate } from 'react-router-dom'

function MyShows() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [mydata , dropdowndata ] = useState([])

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };
  const navigate = useNavigate()
  const handleGenreChange = (selectedGenre) => {
    setSelectedGenre(selectedGenre); 
    console.log(selectedGenre);
  };

  const fetchData = async () =>
  { await fetch(`https://netflix-clone-alpha-pearl.vercel.app/findgenre/${selectedGenre}`)
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
                   <Navbar/>
       <Featured onTypeChange={handleGenreChange} type="series" />
      {
        selectedGenre == "" ? (
          <>
          <List title="Continue to Watch" type="aseries" genre=""/>
          <List title="Trending Now" type="bseries" genre=""/>
          <List title="Popular on Netflix" type="cseries" genre=""/>
          </>
        ) : (
          <>
          <List title="Continue to Watch" type="aseries" genre={selectedGenre}/>
          <List title="Trending Now" type="bseries" genre={selectedGenre}/>
          <List title="Popular on Netflix" type="cseries" genre={selectedGenre}/>
          </>
        )
      }
    </div>
  )
}

export default MyShows
