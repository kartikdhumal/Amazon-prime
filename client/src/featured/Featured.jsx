import React, { useEffect, useState } from 'react'
import './featured.scss'
import mirzapur from '../images/kaalenbhaiyaa.jpg'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import mirzapurtext from '../images/mirzapurtext.png'
import nlogo from '../images/nlogo.png'
import { NavLink, useNavigate } from 'react-router-dom';

function Featured({ type, onTypeChange }) {
  const [moviedata, getShowData] = useState([])
  const [mydata, setMyData] = useState([])
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
        {/* {
          type && (
            <div className="category">
              <span> {type === "movie" ? "Movies" : "Series"} </span>
              <select onChange={handleTypeChange} name="genre" id="genre">
                <option disabled> Genre </option>
                <option value="adventure"> Adventure </option>
                <option value="comedy"> Comedy </option>
                <option value="crime"> Crime </option>
                <option value="fantasy "> Fantasy </option>
                <option value="histrotical"> Histrotical </option>
                <option value="horror"> Horror </option>
                <option value="romance "> Romance  </option>
                <option value="sci-Fi "> Sci-Fi </option>
                <option value="thriller"> Thriller </option>
                <option value="western"> Western </option>
                <option value="animation"> Animation </option>
                <option value="drama"> Drama </option>
                <option value="documentary"> Documentary </option>
              </select>
            </div>
          )
        } */}
        {mydata.seasons && mydata.seasons.length > 0 && (
          <video autoPlay muted loop className='featuredvideo' src={mydata.seasons[mydata.seasons.length - 1].trailer}></video>
        )}
        <div className="info">
          <div className="line">
            {/* <img src={nlogo}></img>  */}
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
            <button className="more">
              <InfoOutlinedIcon />
              <span> Info </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
