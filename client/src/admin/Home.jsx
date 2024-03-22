import React from 'react'
import Navbar from '../Navbar'
import Featured from '../featured/Featured'
import List from '../list/List'
import './home.scss'

function Home() {
  return (
    <div className='home'>
       <Navbar />
       <Featured type=""/>
       <List title="Crime thriller" index="crime"/>
       <List title="Romance" index="romance"/>
       <List title="Sports" index="sports" />
    </div>
  )
}

export default Home
