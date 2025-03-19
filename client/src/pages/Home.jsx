import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import JobListing from '../components/JobListing'

function Home() {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <JobListing/>
    </div>
  )
}

export default Home
