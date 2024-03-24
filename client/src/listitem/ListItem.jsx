import React, { useEffect, useState } from 'react';
import './listitem.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { NavLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardMedia from '@mui/material/CardMedia';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';

function ListItem({ index, data }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [watchlists, setWatchlists] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchWatchLists();
    checkIfAddedToWatchlist();
  }, []);

  const checkIfAddedToWatchlist = () => {
    for (const watchlist of watchlists) {
      if (watchlist.showIds.includes(data._id)) {
        setIsAddedToWatchlist(true);
        return;
      }
    }
    setIsAddedToWatchlist(false);
  };

  const fetchWatchLists = () => {
    fetch('https://amazon-prime-server.vercel.app/watchlists')
      .then((response) => response.json())
      .then((datas) => {
        if (datas[0]?.showIds.includes(data._id)) {
          setIsAddedToWatchlist(true);
        }
      })
      .catch((error) => console.error(error));
  }

  const handleDelete = () => {
    fetch(`https://amazon-prime-server.vercel.app/deletewatchlist/${sessionStorage.myuserid}/${data._id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          fetchWatchLists();
          checkIfAddedToWatchlist();
        } else {
          console.error('Error deleting record:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
      });
  };


  const handleAddToWatchlist = async () => {
    try {
      const userId = sessionStorage.myuserid;
      if (!userId) {
        toast.warning('User ID is empty');
        return;
      }
      const showId = data._id;
      if (!showId) {
        toast.warning('Show ID is empty');
        return;
      }

      const response = await fetch('https://amazon-prime-server.vercel.app/addwatchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          showId: showId,
        }),
      });

      if (response.ok) {
        setIsAddedToWatchlist(true);
      } else {
        toast.error('Failed to add to watchlist');
      }
    } catch (error) {
      console.error('Error adding to watchlist in client:', error);
      toast.error('An error occurred while adding to watchlist');
    }
  };


  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 20).join(' ') + '...';
    } else {
      return description;
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let totalDuration = 0;
  if (data.seasons && data.seasons.length > 0) {
    const lastSeason = data.seasons[data.seasons.length - 1];
    if (lastSeason && lastSeason.episodes) {
      lastSeason.episodes.forEach((episode) => {
        totalDuration += episode.duration;
      });
    }
  }
  const hours = Math.floor(totalDuration / 3600);
  const remainingMinutes = Math.floor((totalDuration % 3600) / 60);
  const durationDisplay = hours > 0 ? `${hours} hours ${remainingMinutes + 1} minutes` : `${remainingMinutes + 1} minutes`;

  return (
    <div className='listcard' style={{ left: isHovered ? index * 225 - 50 + index * 2.5 : 0 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={data.poster} alt='Show poster' onClick={handleOpen} className='listposter' />
      <Modal open={open} onClose={handleClose} className='model' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: 300, bgcolor: '#000000', color: '#f2f2f2', border: "1px solid gray", borderRadius: "10px", p: 2, outline: 'none' }}>
          <CardMedia component='video' src={data.seasons[data.seasons.length - 1].trailer} muted autoPlay ype="video/mp4" className='listvideo' />
          <Grid container marginTop="10px">
            <Grid item xs={8}>
              <Typography variant="h6" sx={{ fontWeight: "bold", width: "100%", textTransform: "capitalize" }}>{data.title} {data.seasons.length > 1 ? data.seasons.length : ''}</Typography>
            </Grid>
            <Grid item xs={4} container justifyContent="flex-end" alignItems="center">
              <PlayArrowIcon sx={{
                backgroundColor: "#333333",
                "&:hover": {
                  color: "#000000",
                  backgroundColor: "#f2f2f2"
                },
                marginRight: "10px", cursor: "pointer", color: "#f2f2f2", borderRadius: "50%", padding: "5px"
              }} className='playicn' onClick={() => navigate(`/watch/${data._id}`)} />
              {isAddedToWatchlist ? (
                <CheckIcon sx={{
                  backgroundColor: "#333333", "&:hover": {
                    color: "#000000",
                    backgroundColor: "#f2f2f2"
                  }, cursor: "pointer", color: "#f2f2f2", borderRadius: "50%", padding: "5px"
                }} className='myicon' onClick={handleDelete} />
              ) : (
                <AddIcon sx={{
                  backgroundColor: "#333333", "&:hover": {
                    color: "#000000",
                    backgroundColor: "#f2f2f2"
                  }, cursor: "pointer", color: "#f2f2f2", borderRadius: "50%", padding: "5px"
                }} className='myicon' onClick={handleAddToWatchlist} />
              )}
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2, color: "gray" }}>
            <Typography sx={{ fontSize: "17px" }}>{data.seasons[data.seasons.length - 1].year}</Typography>
            <Typography sx={{ fontSize: "17px" }}>{durationDisplay}</Typography>
            <Typography sx={{ backgroundColor: "#333333", color: "#f2f2f2", fontWeight: "bold", padding: "5px", borderRadius: "5px" }}>{'U/A ' + data.limit + "+"}</Typography>
          </Grid>
          <Typography id="modal-modal-description" sx={{ mt: 2, color: "gray" }}>
            {data.description}
          </Typography>
        </Box>
      </Modal>
      {/* {isHovered && (
          <div className="itemInfo">
            <div className='showtitle'>
              <div className="maintitle">
                {data.title} {data.seasons.length > 1 ? data.seasons.length : ''}
              </div>
              <div className="iconsbox">
                <PlayArrowIcon className='playicn' onClick={() => navigate(`/watch/${data._id}`)} />
                {isAddedToWatchlist ? (
                  <CheckIcon className='myicon' onClick={handleDelete} />
                ) : (
                  <AddIcon className='myicon' onClick={handleAddToWatchlist} />
                )}
              </div>
            </div>
            <div className="itemInfoTop" onClick={() => navigate(`/watch/${data._id}`)}>
              <span> {data.seasons[data.seasons.length - 1].year} </span>
              <span> {durationDisplay} </span>
              <span className='limits'> {'U/A ' + data.limit + "+"} </span>
            </div>
            <div className="description">
              {truncateDescription(data.description)}
            </div>
          </div>
        )} */}
    </div>
  );
}

export default ListItem;
