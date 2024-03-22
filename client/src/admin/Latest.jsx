import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import List from '../list/List';
import Featured from '../featured/Featured';
import Navbar from '../Navbar'

function Latest() {
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
    await fetch(`https://amazon-prime-server.vercel.app/findgenre/${selectedGenre}`)
      .then((response) => response.json())
      .then((data) => dropdowndata(data))
      .catch((error) => console.error(error));
  }


  return (
    <div className='home'>
       <Navbar/>
       <Featured onTypeChange={handleGenreChange} type="movie" />
       <List title="Latest" type="allshows" genre=""/>
    </div>
  )
}

export default Latest
