import React from 'react'
import { Spotlight } from './components/UI/spotlight'


const App = () => {
  return (
    <main>
    <div className="pattern overflow-hidden">
      <div className="wrapper">
        <header>
          <h1>
            Find Your Favourite <span className='text-gradient'>Movies</span>
          </h1>
        </header>
        <p>Search</p>
      </div>
      <Spotlight/>
    </div>
    </main>
  )
} 

export default App
