import React, { useState } from 'react'
import { Spotlight } from './components/UI/spotlight'
import Search from './components/Search'
import ThreeDCardDemo from './components/Card'


const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  return (
    <main>
    <div className="pattern overflow-x-hidden">
      <div className="wrapper">
        
        <header>
          
          <h1>
            Find Your Favourite <span className='text-gradient'>Movies</span>
          </h1>
        </header>
        <ThreeDCardDemo/>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <Spotlight/>
    </div>
    </main>
  )
} 

export default App
