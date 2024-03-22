import React, { useEffect, useState } from 'react';
import './watch.scss';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import netflix from '../fullvideos/netflix.mp4';
import UnauthorizeUser from '../admin/UnauthorizeUser';
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

function Watch() {
  const [showData, setShowData] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [castMembers, setCastMembers] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [sdata, setsdata] = useState([]);
  const [isMovie, setIsMovie] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleArrow = () => {
    navigate('/homepage');
  };

  UnauthorizeUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`https://amazon-prime-server.vercel.app/watch/${id}`);
        if (response.status >= 200 && response.status < 300) {
          const data = response.data[0];
          const lastSeason = data.seasons[data.seasons.length - 1];
          const firstEpisode = lastSeason.episodes[0];
          setsdata(data);
          setIsMovie(data.isSeries);
          console.log(isMovie);
          setShowData(firstEpisode.video);
          setSeasons(data.seasons);
          setEpisodes(lastSeason.episodes);
          setCastMembers(data.castMembers);
          setSelectedSeason(lastSeason);
          setIsFetched(true);
          setSelectedEpisode(firstEpisode);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setShowData('');
      }
    };

    fetchData();
  }, [id]);

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
    setEpisodes(season.episodes);
    setSelectedEpisode(season.episodes[0]);
    setShowData(season.episodes[0].video);
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setShowData(episode.video);
  };

  return (
    <div className="main">
      <div className='watch'>

        {selectedEpisode && (
          <h3 className='title'>
            {selectedSeason ? `${!isMovie ? '' : 'S'}${!isMovie ? '' : seasons.indexOf(selectedSeason) + 1}${!isMovie ? '' : ':E'}${!isMovie ? '' : episodes.indexOf(selectedEpisode) + 1} ${selectedEpisode.description}` : selectedEpisode.description}
          </h3>
        )}
        <div className="back">
          <ArrowBackOutlinedIcon onClick={handleArrow} className='icon' />
        </div>
        {isFetched ? (
          <ShakaPlayer autoPlay src={showData} className="video" />
        ) : (
          <video src={netflix} className="video" autoPlay controls ></video>
        )}
      </div>

      {isFetched && (
        <div className="infobox">
          <p className='stitle'> {sdata.title} {' - ' + selectedSeason.year} </p>
          <p className='sdesc'> {sdata.description} </p>
          <p className='syear'>
            <div className="sgenre">{sdata.genre}</div>
            <div className="slimit">{sdata.limit + '+'}</div>
          </p>
        </div>
      )}


      {
          <>
            <div className="seasonbox">
              {seasons.map((season, index) => (
                <div
                  key={season._id}
                  className={`season ${selectedSeason === season ? 'selected' : ''}`}
                  onClick={() => handleSeasonClick(season)}
                  style={{ backgroundColor: selectedSeason === season ? '#00a8e1' : 'transparent', color: selectedSeason === season ? 'black' : '' }}
                >
                  {
                    !isMovie ? <> Part {index + 1} </> : <> Season {index + 1} </>
                  }
                </div>
              )
              )}
            </div>

            <div className="episodebox">
              {episodes.map((episode, index) => (
                <div key={episode._id} className="episode" style={{ backgroundColor: selectedEpisode === episode ? '#333333' : 'transparent' }} onClick={() => handleEpisodeClick(episode)}>
                  <video src={episode.video} muted></video>
                  <p className='description'>{!isMovie ? '' : `E${index + 1}-`} {episode.description}</p>
                  <p className='duration'>{`${String(Math.floor(episode.duration / 60)).padStart(2, '0')}:${String(episode.duration % 60).padStart(2, '0')}`}</p>
                </div>
              ))}
            </div>
          </>
      }

      <div className="castbox">
        {
          castMembers.length > 0 && (
            <p className="casttitle">
              Cast
            </p>
          )
        }
        <div className='castdivs'>
          {castMembers.map((cast, index) => (
            <div key={index} className="castMember">
              <img src={cast.image} alt={cast.realName} className="castImage" />
              <div className="castname">
                <p className="realname">{`${cast.realName}`}</p>
                <p className="reelname">{`${cast.reelName}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watch;
