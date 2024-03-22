import React, { useEffect, useRef, useState } from 'react'
import './list.scss'
import ListItem from '../listitem/ListItem'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function List(props) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [moviedata, getShowData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const listRef = useRef();

  const fetchData = () => {
    fetch('https://amazon-prime-server.vercel.app/findshow')
      .then((response) => response.json())
      .then((data) => {
        getShowData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    fetchData();
  }, [])

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
      {props.index === "crime" ? (
        <div>
          <span className="listTitle">
            {props.title}
          </span>
          <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
            {
              isLoading ? <><div className="container"> Loading.. </div></> : <>
                <div className="container" ref={listRef}>
                  {moviedata.filter((show) => show.genre === "crime").map((show, index) => (
                      <ListItem data={show} />
                  ))}
                </div>
              </>
            }
            <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
          </div>
        </div>
      ) : props.type == "categoryseries" ? (
        <div>
          <span className="listTitle">
            {props.title}
          </span>
          <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
            {isLoading ? (
              <div className="container"> Loading.. </div>
            ) : (
              <div className="container" ref={listRef}>
                {moviedata.filter((show) => show.genre === props.genre && show.isSeries).length === 0 ? (
                  <div>No Shows</div>
                ) : (
                  moviedata
                    .filter((show) => show.genre === props.genre && show.isSeries)
                    .map((show, index) => (
                      
                        <ListItem data={show} />
                      
                    ))
                )}
              </div>
            )}

            <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
          </div>
        </div>
      ) : props.type == "categorymovies" ? (
        <div>
          <span className="listTitle">
            {props.title}
          </span>
          <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
            {isLoading ? (
              <div className="container"> Loading.. </div>
            ) : (
              <div className="container" ref={listRef}>
                {moviedata.filter((show) => show.genre === props.genre && !show.isSeries).length === 0 ? (
                  <div>No Shows</div>
                ) : (
                  moviedata
                    .filter((show) => show.genre === props.genre && !show.isSeries)
                    .map((show, index) => (
                      
                        <ListItem data={show} />
                      
                    ))
                )}
              </div>
            )}

            <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
          </div>
        </div>
      ) : props.index === "sports" ? (
        <div>
          <span className="listTitle">
            {props.title}
          </span>
          <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
            {isLoading ? <><div className="container"> Loading.. </div></> : <>
              <div className="container" ref={listRef}>
                {moviedata.filter((show) => show.genre === "sports").map((show, index) => (
                  
                    <ListItem data={show} />
                  
                ))}

              </div>
            </>}

            <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
          </div>
        </div>
      ) : props.index === "romance" ? (
        <div>
          <span className="listTitle">
            {props.title}
          </span>
          <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
            {isLoading ? <><div className="container"> Loading.. </div></> : <>
              <div className="container" ref={listRef}>
                {moviedata.filter((show) => show.genre === "romance").map((show, index) => (
                  
                    <ListItem data={show} />
                  
                ))}
              </div>
            </>}

            <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
          </div>
        </div>
      ) : props.index === "c" ? (
        <div>
          <span className="listTitle">
            {props.title}
          </span>
          <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
            {isLoading ? <><div className="container"> Loading.. </div></> : <>
              <div className="container" ref={listRef}>
                {moviedata.filter((show, index) => index % 2 == 0).reverse().map((show, index) => (
                    <ListItem key={index} data={show} /> 
                ))}
              </div>
            </>}
            <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
          </div>
        </div>
      ) : props.index === "d" ? (
        <div className='listbox'>
          <span className="listTitle">
            {props.title}
          </span>
          <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
            {isLoading ? <><div className="container"> Loading.. </div></> : <>
              <div className="container" ref={listRef}>
                {moviedata.filter((show) => show.genre === "crime" || show.genre === "thriller" || show.genre === "drama").map((show, index) => (
                    <ListItem key={index} data={show} /> 
                ))}
              </div>
            </>}
            <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
          </div>
        </div>
      ) : props.type === "aseries" ? (
        props.genre == "" ? (
          <>
            <div>
              <span className="listTitle">
                {props.title}
              </span>
              <div className="wrapper">
                <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
                <div className="container" ref={listRef}>
                  {moviedata
                    .filter((show) => show.isSeries === true)
                    .map((show, index) => {
                      if (index % 6 == 0) {
                        return (
                          
                            <ListItem key={index} data={show} />
                          
                        );
                      } else {
                        return null;
                      }
                    })
                  }
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
                  {moviedata.filter((show, index) => show.isSeries === true && show.genre === props.genre).map((show, index) => (
                      <ListItem key={index} data={show} /> 
                  ))}
                </div>
                <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
              </div>
            </div>
          </>
        )

      ) : props.type === "bseries" ? (
        props.genre == "" ? (
          <>
            <div>
              <span className="listTitle">
                {props.title}
              </span>
              <div className="wrapper">
                <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
                <div className="container" ref={listRef}>
                  {moviedata.filter((show, index) => [20, 19, 18, 17, 16, 15, 14, 13, 12, 11].includes(index) && show.isSeries === true).map((show, index) => (
                      <ListItem key={index} data={show} /> 
                  ))}
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
                  {moviedata.filter((show, index) => show.isSeries === true && show.genre === props.genre).reverse().map((show, index) => (
                      <ListItem key={index} data={show} /> 
                  ))}
                </div>
                <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
              </div>
            </div>
          </>
        )
      ) : props.type === "cseries" ? (
        props.genre == "" ? (
          <>
            <div>
              <span className="listTitle">
                {props.title}
              </span>
              <div className="wrapper">
                <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
                <div className="container" ref={listRef}>
                  {moviedata.filter((show, index) => [30, 27, 24, 21, 18, 15, 12, 0].includes(index) && show.isSeries === true).map((show, index) => (
                      <ListItem key={index} data={show} /> 
                  ))}
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
                  {moviedata.filter((show, index) => show.isSeries === true && show.genre === props.genre).map((show, index) => (
                      <ListItem key={index} data={show} /> 
                  ))}
                </div>
                <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
              </div>
            </div>
          </>
        )
      ) : props.type === "amovies" ? (
        props.genre == "" ? (
          <>
            <div>
              <span className="listTitle">
                {props.title}
              </span>
              <div className="wrapper">
                <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
                <div className="container" ref={listRef}>
                  {moviedata
                    .filter((show) => show.isSeries === false)
                    .map((show, index) => {
                      if (index % 4 === 0) {
                        return (
                          
                            <ListItem key={index} data={show} />
                          
                        );
                      } else {
                        return null;
                      }
                    })
                  }


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
      ) : props.type === "allshows" ? (
        props.genre == "" ? (
          <>
            <div>
              <span className="listTitle">
                {props.title}
              </span>
              <div className="wrapper">
                <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
                <div className="container" ref={listRef}>
                  {moviedata.reverse().map((show, index) => (
                      <ListItem key={index} data={show} /> 
                  ))}
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
                  {moviedata.filter((show, index) => show.isSeries === false && show.genre === props.genre).reverse().map((show, index) => (
                      <ListItem key={index} data={show} /> 
                  ))}
                </div>
                <ArrowForwardIosOutlinedIcon onClick={() => handleClick("right")} className='sliderArrow right' />
              </div>
            </div>
          </>
        )
      ) : props.type === "cmovies" ? (
        props.genre == "" ? (
          <>
            <div>
              <span className="listTitle">
                {props.title}
              </span>
              <div className="wrapper">
                <ArrowBackIosNewOutlinedIcon onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} className='sliderArrow left' />
                <div className="container" ref={listRef}>
                  {moviedata.filter((show) => show.isSeries === false).map((show, index) => (
                      <ListItem key={index} data={show} /> 
                  ))}
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
      )

      }
    </div>
  )
}

export default List
