import React from 'react'
import { CiSearch } from "react-icons/ci";

const Search = ({searchTerm, setSearchTerm}) => {

    
  return (
    <div className="search flex items-center">
     <CiSearch scale={'500px'} color='white'/>
     <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
    </div>
  )
}

export default Search
 