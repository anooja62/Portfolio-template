import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import ContactMe from '../components/ContactMe'

const Home = () => {
  return (
    <div>
      <Hero/>
      <About/>
      <Projects/>
      <ContactMe/>
    </div>
  )
}

export default Home
