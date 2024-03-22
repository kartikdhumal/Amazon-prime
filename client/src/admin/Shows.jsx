import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import EditNoteIcon from '@mui/icons-material/EditNote';
import './shows.scss'
import CircularProgress from '@mui/material/CircularProgress';
import AdminNavbar from './AdminNavbar'
import axios from 'axios';
import { Cloudinary } from "@cloudinary/url-gen";

function Users() {
  const [moviedata, getShowData] = useState([])
  const [trailer, setTrailer] = useState('')
  const [poster, setPosterImage] = useState('')
  const [video, setVideo] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [years, setYears] = useState('')
  const [genre, setGenre] = useState('')
  const [duration, setDuration] = useState('')
  const [isSeries, setSeries] = useState(false)
  const [limit, setLimit] = useState('')
  const [addingShow, setAddingShow] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [uploadingCastMemberImage, setUploadingCastMemberImage] = useState(false);
  const [castMembers, setCastMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [seasons, setSeasons] = useState([]);
  const [uploadingTrailer, setUploadingTrailer] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [seasonYears, setSeasonYears] = useState([]);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - moviedata.length) : 0;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterData();
  }, [searchQuery, moviedata]);



  const fetchData = () => {
    fetch('https://amazon-prime-server.vercel.app/findshow')
      .then((response) => response.json())
      .then((data) => {
        getShowData(data);
      })
      .catch((error) => console.error(error));
  }

  const handleDelete = (recordId) => {
    axios.delete(`https://amazon-prime-server.vercel.app/deleteshow/${recordId}`)
      .then((response) => {
        // alert('Show Deleted');
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
      });
  };

  const handleTrailer = async (seasonIndex, e) => {
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
        const updatedSeasons = [...seasons];
        updatedSeasons[seasonIndex].trailer = data.secure_url;
        setSeasons(updatedSeasons);
        console.log(data.secure_url);
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


  const filterData = () => {
    if (!searchQuery) {
      setFilteredData(moviedata);
    } else {
      const filtered = moviedata.filter((movie) => {
        const isSeriesValue = movie.isSeries ? 'Series' : 'Movie';
        return (
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.year.toString().includes(searchQuery) ||
          movie.limit.toString().includes(searchQuery) ||
          movie.duration.toString().includes(searchQuery) ||
          isSeriesValue.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredData(filtered);
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
        setPosterImage(data.secure_url);
        console.log(data.secure_url);
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


  const handleTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  const handleDesc = (e) => {
    const value = e.target.value;
    setDescription(value);
  };
  const handleDuration = (e) => {
    const value = e.target.value;
    setDuration(value);
  };
  const handleGenre = (e) => {
    const value = e.target.value;
    setGenre(value);
  };

  const handleYears = (e) => {
    const value = e.target.value;
    if (value.length === 4 && !isNaN(value)) {
      setYears(parseInt(value));
    }
  };

  const handleLimit = (e) => {
    const value = e.target.value;
    setLimit(value);
    console.log(limit);
  };

  const handleSeasonYearChange = (seasonIndex, e) => {
    const updatedSeasonYears = [...seasonYears];
    updatedSeasonYears[seasonIndex] = e.target.value;
    setSeasonYears(updatedSeasonYears);
  };

  const handleSelect = (e) => {
    const isSeriesValue = e.target.value === "true";
    setSeries(isSeriesValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const CustomTablePagination = styled(TablePagination)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.actions} {
      display: flex;
      gap: 0.25rem;
    }
  `;

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      title,
      description,
      genre,
      limit,
      isSeries,
      poster,
      seasons: seasonsData,
      castMembers: castMembersData
    };

    console.log("Form Data:", formData.seasons);
    try {
      const dataToUpdate = {
        title,
        description,
        genre,
        limit,
        isSeries,
        poster,
        seasons: seasonsData,
        castMembers: castMembersData
      };
      const MyData = await axios.post('https://netflix-clone-alpha-pearl.vercel.app/shows', dataToUpdate, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (MyData) {
        alert('Show added');
        setTitle('');
        setDescription('');
        setGenre('');
        setLimit('');
        setSeries(false);
        setPosterImage('');
        setSeasons([]);
        setSeasonYears([]);
        setCastMembers([]);
        fetchData()
      }
    } catch (err) {
      console.error(err);
      console.log(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
      setTitle('');
      setDescription('');
      setGenre('');
      setLimit('');
      setSeries(false);
      setPosterImage('');
      setSeasons([]);
      setSeasonYears([]);
      setCastMembers([]);
      fetchData()
    }
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

  const heads = ['ID', 'poster', 'name', 'Genre', 'year', 'limit', 'Movie/Series', 'Action']
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className='shows'>
      <AdminNavbar />
      <div className="addform">
        <form className='formmy' onSubmit={handleUserSubmit}>
          <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <label htmlFor="file-upload" className="filetext">
              Upload Poster
            </label>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "flex-start", width: "100%" }}>
              <input
                type="file"
                accept="image/*"
                name='poster'
                id="posters"
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
          <input name='name' id='name' onChange={handleTitle} value={title} type='text' required placeholder='Name of movie/series'></input>
          <input name="description" onChange={handleDesc} value={description} type='input' required placeholder='Description'></input>
          <input name='genre' onChange={handleGenre} value={genre} type='text' required placeholder='Genre'></input>
          <input name='limit' onChange={handleLimit} value={limit} type='number' min="1" required placeholder='Limit'></input>
          <select name='isSeries' value={isSeries} onChange={handleSelect} required>
            <option disabled>Show Type</option>
            <option value="false"> Movie </option>
            <option value="true"> Series </option>
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
                    {
                      season.trailer ? <>
                        <video className='videoshow' controls src={season.trailer}></video>
                      </> : <></>
                    }
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
                    <div key={episodeIndex} className="episodeshows">
                      <p className='episodetext'>SEASON {seasonIndex + 1} - EPISODE {episodeIndex + 1}</p>

                      <div className="episodediv">
                        <p>Upload Episode {episodeIndex + 1}</p>
                        <input
                          type="file"
                          id={`episodes`}
                          accept="video/*"
                          onChange={(e) => handleEpisodeVideoChange(seasonIndex, episodeIndex, e)}
                        />
                        {episode.video && (
                          <video className='videoshow' controls src={episode.video}></video>
                        )}
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


          <button type='submit' className='addshowbtn'>
            {isLoading ? <CircularProgress size={24} /> : "Add Show"}
          </button>
        </form>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search show info..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='searchbox'
        />
      </div>
      <table aria-label="custom pagination table" cellPadding="10px" cellSpacing="10px">
        <tr>
          {
            heads.map((val) => {
              return <th> {val} </th>
            })
          }
        </tr>
        <tbody>
          {(rowsPerPage > 0
            ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredData
          ).map((row, index) => (
            <tr key={row.name}>
              <td>{index + page * rowsPerPage + 1}</td>
              <td style={{ width: 160 }} align="right">
                <img src={row.poster} style={{ width: "50%" }}></img>
              </td>
              <td> {row.title}</td>
              <td> {row.genre}</td>
              <td>
                {row.seasons && row.seasons.length > 0 && row.seasons.map((season, seasonIndex) => (
                  <span key={seasonIndex}>
                    {season.year}
                    {seasonIndex < row.seasons.length - 1 && ', '}
                  </span>
                ))}
              </td>

              <td> {row.limit}</td>
              <td style={{ width: 160 }} align="right">
                {row.isSeries == true ? "Series" : "Movie"}
              </td>
              <td>
                <NavLink to={`/editshow/${row._id}`}><EditNoteIcon className='editicon' /></NavLink>   <DeleteIcon onClick={(event) => handleDelete(`${row._id}`, event)} className='deleteicons' />
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} aria-hidden />
            </tr>
          )}
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={8}
              count={moviedata.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Users
