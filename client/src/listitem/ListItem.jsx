import React, { useState } from 'react'
import './listitem.scss'
import asurcover from '../images/asurcover.jpg'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

function ListItem({ index, data }) {
  const [isHovered, setIsHovered] = useState(false);
  let totalDuration = 0;
  if (data.seasons) {
    const lastSeason = data.seasons[data.seasons.length - 1];
    if (lastSeason && lastSeason.episodes) {
      lastSeason.episodes.forEach((episode) => {
        totalDuration += episode.duration;
      });
    }
  }

  const hours = Math.floor(totalDuration / 3600);
  const remainingMinutes = Math.floor((totalDuration % 3600) / 60);

  const durationDisplay = hours > 0 ? `${hours} hours ${remainingMinutes} minutes` : `${remainingMinutes} minutes`;



  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 20).join(' ') + '...';
    } else {
      return description;
    }
  };
  return (
    <div className='listItem' style={{ left: isHovered && index * 225 - 50 + index * 2.5 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={data.poster} alt='movie image' />
      {isHovered && (
        <>
          <video src={data.seasons[data.seasons.length - 1].trailer} loop muted autoPlay={true}></video>
          <div className="itemInfo">
            <div className="icons">
              <PlayArrowIcon className='icon' />
              <AddIcon className='icon' />
              <ThumbUpAltOutlinedIcon className='icon' />
              <ThumbDownAltOutlinedIcon className='icon' />
            </div>
            <div className="itemInfoTop">
              <span> {durationDisplay} </span>
              <span className='limits'> {data.limit + "+"} </span>
              <span> {data.seasons[data.seasons.length - 1].year} </span>
            </div>
            <div className="desc">
              {truncateDescription(data.description)}
            </div>
            <div className="genre"> {data.genre} </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ListItem
