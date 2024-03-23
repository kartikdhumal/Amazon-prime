import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Featured from '../featured/Featured'
import List from '../list/List'
import './home.scss'

function Home() {
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
      <Featured type="" />
      {
        uniqueGenres.map((data, index) => (
          <List key={index} title={data} type="categoryall" genre={data} />
        ))
      }
    </div>
  )
}

export default Home
