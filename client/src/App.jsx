// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Pagenotfound from './admin/Pagenotfound'
// import Main from './admin/Main'
// import Users from './admin/Users'
// import './App.css'
// import Shows from './admin/Shows'
// import Editprofile from './editprofile/Editprofile'
// import Editshow from './admin/Editshow'
// import Deleteshow from './admin/Deleteshow'
// import Deleteuser from './admin/Deleteuser'
// import Login from './admin/Login'
// import Register from './admin/Register'
// import Watch from './watch/Watch'
// import Home from './admin/Home'
// import MyShows from './admin/MyShows'
// import MyMovies from './admin/MyMovies'
// import MyList from './admin/MyList'
// import Latest from './admin/Latest'

// function App() {
//   return (
//     <div className='result'>
//        <Routes>
//         <Route path="/" element={<Login/>} />
//         <Route path="/register" element={<Register/>} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/watch/:id" element={<Watch/>} />
//         <Route path="/mylist" element={<MyList/>} />
//         <Route path="/myshows" element={<MyShows/>} />
//         <Route path="/latest" element={<Latest/>} />
//         <Route path="/mymovies" element={<MyMovies/>} />
//         <Route path="/admin" element={<Main />} />
//         <Route path="/homepage" element={<Home />} />
//         <Route path="/editprofile/:id" element={<Editprofile />} />
//         <Route path="/users" element={ <Users />} />
//         <Route path="/shows" element={ <Shows />} />
//         <Route path="/editshow/:id" element={ <Editshow />} />
//         <Route path="/deleteshow/:id" element={ <Deleteshow />} />
//         <Route path="/deleteuser/:id" element={ <Deleteuser />} />
//         <Route path="*" element={<Pagenotfound />} />
//       </Routes>
//     </div>
//   )
// }

// export default App

import React from 'react'
import AdminResult from './admin/AdminResult'

function App() {
  return (
    <div>
      <AdminResult/>
    </div>
  )
}

export default App

