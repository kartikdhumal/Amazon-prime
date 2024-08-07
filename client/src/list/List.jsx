import React, { useEffect, useRef, useState } from 'react'
import '../styles/list.scss'
import ListItem from '../listitem/ListItem'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Loader from '../loader/Loader';

function List(props) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [moviedata, getShowData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [mywatchlists, setmywatchlists] = useState([]);
  const listRef = useRef();
  const fetchData = () => {
    fetch('https://amazonprime-newserver.vercel.app/findshow')
      .then((response) => response.json())
      .then((data) => {
        getShowData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    fetchmywatchlists();
  }, [])

  const fetchmywatchlists = () => {
    const userId = sessionStorage.myuserid;
    fetch('https://amazonprime-newserver.vercel.app/watchlists')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('userId') && data[0].hasOwnProperty('showIds')) {
          const usermywatchlists = data.filter(watchlist => watchlist.userId == userId);
          if (usermywatchlists.length > 0) {
            const showIds = usermywatchlists[0].showIds;
            const filteredShows = moviedata.filter(show => showIds.includes(show._id));
            setmywatchlists(filteredShows);
          }
        }
      })
      .catch((error) => {
        console.error("Error in client side " + error);
        setIsLoading(false);
      });
  };

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };


  return (
    <div className="list">
      {props.type === "categoryall" ? (
        <div>
          {moviedata.filter((show) => show.genre === props.genre).length > 0 && (
            <span className="listTitle">
              {props.title}
            </span>
          )}
          <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
            <div className="container" ref={listRef}>
              {moviedata.filter((show) => show.genre === props.genre).length > 0 && (
                moviedata.filter((show) => show.genre === props.genre).map((show, index) => (
                  <ListItem data={show} key={index} />
                ))
              )}
            </div>
            <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
          </div>
        </div>
      ) : props.type == "categoryseries" ? (
        <div>
          {moviedata.filter((show) => show.genre === props.genre && show.isSeries).length > 0 && (
            <span className="listTitle">
              {props.title}
            </span>
          )}
          <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
            <div className="container" ref={listRef}>
              {moviedata.filter((show) => show.genre === props.genre && show.isSeries).length > 0 && (
                moviedata.filter((show) => show.genre === props.genre && show.isSeries).map((show, index) => (
                  <ListItem data={show} key={index} />
                ))
              )}
            </div>
            <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
          </div>
        </div>
      ) : props.type == "categorymovies" ? (
        <div>
          {moviedata.filter((show) => show.genre === props.genre && !show.isSeries).length > 0 && (
            <span className="listTitle">
              {props.title}
            </span>
          )}
          <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
            <div className="container" ref={listRef}>
              {moviedata.filter((show) => show.genre === props.genre && !show.isSeries).length > 0 && (
                moviedata.filter((show) => show.genre === props.genre && !show.isSeries).map((show, index) => (
                  <ListItem data={show} key={index} />
                ))
              )}
            </div>
            <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
          </div>
        </div>
      ) : props.type === "mywatchlists" ? (
        <div>
          <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
            <div className="container" ref={listRef}>
              {mywatchlists.length > 0 && (
                mywatchlists.map((show, index) => (
                  <ListItem data={show} key={index} />
                ))
              )}
            </div>
            <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
          </div>
        </div>
      ) : props.type == "data" ? (
        props.data != "" ? (
          <>
            <div>
              <span className="listTitle">
                {props.title}
              </span>
              <div className="wrapper">
                <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
                <div className="container" ref={listRef}>
                  <ListItem data={props.data} />
                </div>
                <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="listTitle">
                {props.title}
              </span>
              <div className="wrapper">
                <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
                <div className="container" ref={listRef}>
                  {moviedata.filter((show, index) => show.isSeries === false && show.genre === props.genre).map((show, index) => (
                    <ListItem key={index} data={show} />
                  ))}
                </div>
                <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
              </div>
            </div>
          </>
        )
      ) : (
        <></>
      )}
    </div>
  )
}

export default List
