import React, { useEffect, useRef, useState } from 'react'
import './home.scss'
import Navbar from '../Navbar'
import ListItem from '../listitem/ListItem'
import { NavLink, useNavigate } from 'react-router-dom'
import './mycards.scss'

function MyList() {
  const listRef = useRef();
  const [moviedata, getShowData] = useState([])
  const fetchData = () => {
    fetch('https://netflix-clone-alpha-pearl.vercel.app/findshow')
    .then((response) => response.json())
    .then((data) => getShowData(data))
    .catch((error) => console.error(error));
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className='mymains'>
      <div className="navbas">
        <Navbar />
      </div>
      <div className="cards">
      <div className="mycards" ref={listRef}>
          {moviedata
            .filter((show) => show)
            .map((show, index) => {
                return (
                  <NavLink to={`/watch/${show._id}`}>
                    <ListItem key={index} data={show} />
                  </NavLink>
                );
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MyList
