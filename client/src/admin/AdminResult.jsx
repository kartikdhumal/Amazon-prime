import React from 'react'
import { Route,Routes} from 'react-router-dom'
import Pagenotfound from './Pagenotfound'
import Main from './Main'
import '../styles/adminresult.scss'
import Shows from './Shows'
import Editprofile from '../editprofile/Editprofile'
import Editshow from './Editshow'
import Deleteshow from './Deleteshow'
import Deleteuser from './Deleteuser'
import Login from './Login'
import Register from './Register'
import Watch from '../watch/Watch'
import Users from './Users'
import Home from './Home'
import MyShows from './MyShows'
import MyMovies from './MyMovies'
import Watchlist from '../watchlist/Watchlist'
import Categories from './Categories'
import SendEmail from './SendEmail'
import OTP from './OTP'
import ChangePassword from './ChangePassword'
import Showbycategory from './Showbycategory'

function AdminResult() {
  return (
    <div className='result'>
       <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/watch/:id" element={<Watch/>} />
        <Route path="/myshows" element={<MyShows/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/mymovies" element={<MyMovies/>} />
        <Route path="/admin" element={<Main />} />
        <Route path="/users" element={<Users/>} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/editprofile/:id" element={<Editprofile />} />
        <Route path="/watchlists" element={<Watchlist/>}/>
        <Route path="/shows" element={ <Shows />} />
        <Route path="/sendemail" element={ <SendEmail />} />
        <Route path="/otp" element={ <OTP/>} />
        <Route path="/changepassword" element={ <ChangePassword/>} />
        <Route path="/editshow/:id" element={ <Editshow />} />
        <Route path="/showbycategory/:genre" element={ <Showbycategory />} />
        <Route path="/deleteshow/:id" element={ <Deleteshow />} />
        <Route path="/deleteuser/:id" element={ <Deleteuser />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  )
}

export default AdminResult
