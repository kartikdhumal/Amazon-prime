import React from 'react'
import { Route,Routes} from 'react-router-dom'
import Pagenotfound from './Pagenotfound'
import Main from './Main'
import './adminresult.scss'
import Shows from './Shows'
import Editprofile from '../editprofile/Editprofile'
import Editshow from './Editshow'
import Deleteshow from './Deleteshow'
import Deleteuser from './Deleteuser'
import Login from './Login'
import Register from './Register'
import Watch from '../watch/Watch'
import Home from './Home'
import MyShows from './MyShows'
import MyMovies from './MyMovies'
import MyList from './MyList'
import Latest from './Latest'

function AdminResult() {
  return (
    <div className='result'>
       <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/watch/:id" element={<Watch/>} />
        <Route path="/mylist" element={<MyList/>} />
        <Route path="/myshows" element={<MyShows/>} />
        <Route path="/latest" element={<Latest/>} />
        <Route path="/mymovies" element={<MyMovies/>} />
        <Route path="/admin" element={<Main />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/editprofile/:id" element={<Editprofile />} />
        <Route path="/shows" element={ <Shows />} />
        <Route path="/editshow/:id" element={ <Editshow />} />
        <Route path="/deleteshow/:id" element={ <Deleteshow />} />
        <Route path="/deleteuser/:id" element={ <Deleteuser />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  )
}

export default AdminResult
