import React, { useEffect, useRef, useState } from 'react'
import './editshow.scss'
import { NavLink } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AuthRedirect from './AuthRedirect'
import Axios from 'axios';
import AdminNavbar from './AdminNavbar'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom';
import UnauthorizeAdmin from './UnauthorizeAdmin';
import Avatar from '@mui/material/Avatar';

function Editshow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moviedata, getShowData] = useState([])
  const [trailer, setTrailer] = useState(null)
  const [poster, setPosterImage] = useState(null)
  const [video, setVideo] = useState(null)
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [years, setYears] = useState()
  const [genre, setGenre] = useState()
  const [duration, setDuration] = useState()
  const [isSeries, setSeries] = useState()
  const [uploadingTrailer, setUploadingTrailer] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [addingShow, setAddingShow] = useState(false);
  const [uploadingCastMemberImage, setUploadingCastMemberImage] = useState(false);
  const [castMembers, setCastMembers] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonYears, setSeasonYears] = useState([]);
  const [limit, setLimit] = useState()

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await fetch(`https://amazon-prime-server.vercel.app/getShowUpdateData/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSeasons(data.seasons);
        setCastMembers(data.castMembers);
        const yearsArray = data.seasons.map(season => season.year);
        setPosterImage(data.poster);
        console.log(data.poster);
        setSeasonYears(yearsArray);
        getShowData(data);
      })
      .catch((error) => console.error(error));
  }
  UnauthorizeAdmin()

  const handleTrailer = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingTrailer(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch('https://api.cloudinary.com/v1_1/ddhjzsml9/video/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      const data = await response.json();
      if (data.secure_url) {
        console.log(data.secure_url);
        const updatedMoviedata = { ...moviedata, trailer: data.secure_url };
        getShowData(updatedMoviedata);
      } else {
        console.error('No secure URL found in the response:', data);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
    finally {
      setUploadingTrailer(false);
    }
  };

  const handlePoster = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingPoster(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch('https://api.cloudinary.com/v1_1/ddhjzsml9/image/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      if (data.secure_url) {
        console.log('Uploaded: ' + data.secure_url); // Log the uploaded URL
        setPosterImage(data.secure_url, () => {
          console.log('Poster:', poster); // Log the updated poster state
        });
      } else {
        console.error('No secure URL found in the response:', data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    finally {
      setUploadingPoster(false);
    }
  };

  const handleEpisodeDescriptionChange = (seasonIndex, episodeIndex, e) => {
    const value = e.target.value;
    const updatedSeasons = [...seasons];
    updatedSeasons[seasonIndex].episodes[episodeIndex].description = value;
    setSeasons(updatedSeasons);
  };

  const handleEpisodeDurationChange = (seasonIndex, episodeIndex, e) => {
    const value = e.target.value;
    const updatedSeasons = [...seasons];
    updatedSeasons[seasonIndex].episodes[episodeIndex].duration = value;
    setSeasons(updatedSeasons);
  };

  const handleCastMemberReelNameChange = (index, e) => {
    const updatedCastMembers = [...castMembers];
    updatedCastMembers[index].reelName = e.target.value;
    setCastMembers(updatedCastMembers);
  };

  const handleCastMemberRealNameChange = (index, e) => {
    const updatedCastMembers = [...castMembers];
    updatedCastMembers[index].realName = e.target.value;
    setCastMembers(updatedCastMembers);
  };

  const handleSeasonYearChange = (seasonIndex, e) => {
    const updatedSeasonYears = [...seasonYears];
    updatedSeasonYears[seasonIndex] = e.target.value;
    setSeasonYears(updatedSeasonYears);
  };

  const handleAddSeason = () => {
    setSeasons([...seasons, { episodes: [] }]);
  };

  const handleAddEpisode = (seasonIndex) => {
    const updatedSeasons = [...seasons];
    updatedSeasons[seasonIndex].episodes.push({ video: '', description: '', duration: '' });
    setSeasons(updatedSeasons);
  };

  const handleAddCastMember = () => {
    setCastMembers([...castMembers, { image: '', reelName: '', realName: '' }]);
  };

  const handleEpisodeVideoChange = async (seasonIndex, episodeIndex, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch('https://api.cloudinary.com/v1_1/ddhjzsml9/video/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      const data = await response.json();
      if (data.secure_url) {
        const updatedSeasons = [...seasons];
        if (!updatedSeasons[seasonIndex].videos) {
          updatedSeasons[seasonIndex].videos = [];
        }
        updatedSeasons[seasonIndex].episodes[episodeIndex].video = data.secure_url;
        console.log(updatedSeasons[seasonIndex].episodes[episodeIndex]);
        setSeasons(updatedSeasons);
        console.log(data.secure_url);
      } else {
        console.error('No secure URL found in the response:', data);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
    finally {
      setUploadingVideo(false);
    }
  };

  const handleCastMemberImage = async (index, e) => {
    const file = e.target.files[0];
    if (!file || index < 0 || index >= castMembers.length) return;

    setUploadingCastMemberImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch('https://api.cloudinary.com/v1_1/ddhjzsml9/image/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      if (data.secure_url) {
        const updatedCastMembers = [...castMembers];
        updatedCastMembers[index] = {
          ...updatedCastMembers[index],
          image: data.secure_url
        };
        setCastMembers(updatedCastMembers);
        console.log(data.secure_url);
      } else {
        console.error('No secure URL found in the response:', data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingCastMemberImage(false);
    }
  };

  const handleRemoveSeason = (seasonIndex) => {
    const updatedSeasons = [...seasons];
    updatedSeasons.splice(seasonIndex, 1);
    setSeasons(updatedSeasons);
  };

  const handleRemoveEpisode = (seasonIndex, episodeIndex) => {
    const updatedSeasons = [...seasons];
    updatedSeasons[seasonIndex].episodes.splice(episodeIndex, 1);
    setSeasons(updatedSeasons);
  };

  const handleRemoveCastMember = (index) => {
    const updatedCastMembers = [...castMembers];
    updatedCastMembers.splice(index, 1);
    setCastMembers(updatedCastMembers);
  };

  const handleTitle = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, title: value };
    getShowData(updatedMoviedata);
  };

  const handleDesc = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, description: value };
    getShowData(updatedMoviedata);
  };

  const handleGenre = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, genre: value };
    getShowData(updatedMoviedata);
  };

  const handleLimit = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, limit: value };
    getShowData(updatedMoviedata);
  };

  const handleSelect = (e) => {
    const value = e.target.value === "true";
    const updatedMoviedata = { ...moviedata, isSeries: value };
    getShowData(updatedMoviedata);
  };


  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setAddingShow(true);
      const seasonsData = seasons.map((season, seasonIndex) => {
        return {
          trailer: season.trailer,
          year: seasonYears[seasonIndex],
          episodes: season.episodes.map((episode) => {
            return {
              video: episode.video,
              description: episode.description,
              duration: episode.duration
            };
          })
        };
      });

      const castMembersData = castMembers.map((member) => {
        return {
          image: member.image,
          reelName: member.reelName,
          realName: member.realName
        };
      });

      const formData = {
        title: moviedata.title,
        description: moviedata.description,
        genre: moviedata.genre,
        limit: moviedata.limit,
        isSeries: moviedata.isSeries,
        poster,
        seasons: seasonsData,
        castMembers: castMembersData
      };

      console.log("Form Data:", formData);
      const MyData = await Axios.put(`https://amazon-prime-server.vercel.app/editshow/${id}`, formData);
      if (MyData) {
        alert('Show updated');
        fetchData();
        navigate('/shows');
      }
    } catch (err) {
      console.error(err);
      console.log(err);
      alert("Something went wrong. Please try again later.");
      navigate('/shows');
    }
    finally {
      setAddingShow(false);
    }
  }

  const form = useRef();
  const heads = ['ID', 'poster', 'name', 'Genre', 'year', 'limit', 'isSeries', 'Action']
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className='editshows'>
      <AdminNavbar />
      <div className="updateform">
        <form className='formmy' ref={form} onSubmit={handleUserSubmit}>
          <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <label htmlFor="file-upload" className="filetext">
              Upload Poster
            </label>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "flex-start", width: "100%" }}>
              <input
                type="file"
                accept="image/*"
                name='poster'
                id='posters'
                onChange={handlePoster}
              />
              {poster ? (
                <img
                  src={poster}
                  alt="Uploaded Poster"
                  className="uploadedimage"
                />
              ) : (
                uploadingPoster && <p>Uploading...</p>
              )}
            </div>
          </div>
          <input name='trailer' value={moviedata.title} onChange={handleTitle} type='text' required placeholder='Name of movie/series'></input>
          <input name="description" value={moviedata.description} onChange={handleDesc} type='input' required placeholder='Description'></input>
          <input name='genre' value={moviedata.genre} onChange={handleGenre} type='text' required placeholder='Genre'></input>
          <input name='limit' value={moviedata.limit} onChange={handleLimit} type='number' min="1" required placeholder='Limit'></input>
          <select name='isSeries' onChange={handleSelect} >
            <option disabled selected>{moviedata.isSeries ? "Series" : "Movie"} </option>
            <option value="true">Series</option>
            <option value="false">Movie</option>
          </select>
          <div className="seasons">
            <div className='addseason' onClick={handleAddSeason}>Add Season</div>

            {seasons.map((season, seasonIndex) => (
              <div key={seasonIndex} className='seasonbox'>
                <div className="season-content">
                  <div className="episodediv">
                    <p>Upload Trailer</p>
                    <input
                      type="file"
                      accept="video/*"
                      id={`episodes`}
                      className='trailers'
                      onChange={(e) => handleTrailer(seasonIndex, e)}
                    />
                    <video className='videoshow' controls src={season.trailer}></video>
                  </div>
                  <input
                    type="number"
                    value={seasonYears[seasonIndex]}
                    onChange={(e) => handleSeasonYearChange(seasonIndex, e)}
                    placeholder={`Release Year for Season ${seasonIndex + 1}`}
                  />
                  {season.episodes.length === 0 && (
                    <div className='addepisode' onClick={() => handleAddEpisode(seasonIndex)}>Add Episode</div>
                  )}
                  <div className='removeepisode' onClick={() => handleRemoveSeason(seasonIndex)}>Remove Season {seasonIndex + 1}</div>

                  {season.episodes.map((episode, episodeIndex) => (
                    <div key={episodeIndex} className="episodemy">
                      <p className='episodetext'>SEASON {seasonIndex + 1} - EPISODE {episodeIndex + 1}</p>

                      <div className="episodediv">
                        <p>Upload Episode {episodeIndex + 1}</p>
                        <input
                          type="file"
                          id={`episodes`}
                          accept="video/*"
                          onChange={(e) => handleEpisodeVideoChange(seasonIndex, episodeIndex, e)}
                        />
                        <video className='videoshow' controls src={episode.video}></video>
                      </div>

                      <input
                        type="text"
                        value={episode.description}
                        onChange={(e) => handleEpisodeDescriptionChange(seasonIndex, episodeIndex, e)}
                        placeholder="Description"
                      />

                      <input
                        type="number"
                        value={episode.duration}
                        onChange={(e) => handleEpisodeDurationChange(seasonIndex, episodeIndex, e)}
                        placeholder="Duration"
                      />

                      <div className="episodediv">
                        {season.episodes.length !== 0 && (
                          <div className='addepisode' onClick={() => handleAddEpisode(seasonIndex)}>Add Episode {episodeIndex + 2}</div>
                        )}
                        <div className='addepisode' onClick={() => handleRemoveEpisode(seasonIndex, episodeIndex)}>Remove Episode {episodeIndex + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>


          <div className="casts">
            {castMembers.length > 0 && <div className='addcast'>Add Cast</div>}

            {castMembers.map((member, index) => (
              <div key={index} className="castsbox">
                <div className="episodediv">
                  <label htmlFor={`castImage${index}`}>Upload Cast</label>
                  <input
                    type="file"
                    accept="image/*"
                    id={`episodes`}
                    onChange={(e) => handleCastMemberImage(index, e)}
                  />
                  {member.image && (
                    <Avatar alt={member.image} src={member.image} />
                  )}
                </div>


                <input
                  type="text"
                  value={member.reelName}
                  onChange={(e) => handleCastMemberReelNameChange(index, e)}
                  placeholder="Reel Name"
                />

                <input
                  type="text"
                  value={member.realName}
                  onChange={(e) => handleCastMemberRealNameChange(index, e)}
                  placeholder="Real Name"
                />

                <div className="episodediv">
                  <div className='addmorecast' onClick={handleAddCastMember}>Add Cast</div>
                  <div className='removecast' onClick={() => handleRemoveCastMember(index)}>Remove Cast</div>
                </div>
              </div>
            ))}

            {castMembers.length === 0 && <div className='addcast' onClick={handleAddCastMember}>Add Cast</div>}
          </div>
          <button type='submit' className='submitbtn'>
            {addingShow ? <CircularProgress size={24} /> : "Update show"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Editshow
