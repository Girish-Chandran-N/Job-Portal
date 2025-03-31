import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import JobListing from '../components/JobListing'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <JobListing/>
      
      <Footer />
    </div>
  )
}

export default Home
