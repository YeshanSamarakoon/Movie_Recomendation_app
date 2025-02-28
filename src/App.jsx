import React, { useEffect, useState } from 'react'
import { Spotlight } from './components/UI/spotlight'
import Search from './components/Search'
import ThreeDCardDemo from './components/Card'
import Spinner from './components/Spinner';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY =  import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json' , 
    Authorization: `Bearer ${API_KEY}`,
  }
}


const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => { 

    setIsLoading(true);
    setErrorMessage('');
    try{  

      const endpoint = `${API_BASE_URL}/discover/movie?&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

     if(!response.ok){
      throw new Error('Failed to fetch movies');
     }
     
      const data = await response.json();
      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setmovieList([]);
        return;
      }
      setmovieList(data.results || []);
    }
    catch(error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    }
    finally{
      setIsLoading(false);
    }

  }

  useEffect(() => {
    fetchMovies();
  }
  ,[])
  return (
    <main>
    <div className="pattern overflow-x-hidden">
      <div className="wrapper">
        
        <header>
          <h1>
            Find Your Favourite <span className='text-gradient'>Movies</span>
          </h1>
        </header>
        <ThreeDCardDemo className="xs:max-w-3xl"/>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <h1 className='text-white'>{searchTerm}</h1>
        <section className="all-movies">
            <h2>All movies</h2>
            {isLoading ?(
              <Spinner/>
            ): errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (

                <ul>
                  {movieList.map((movie) => (
                    <p key={movie.id} className='text-white'>{movie.title}</p>
                  ))}
                </ul>

            )}
        </section>
      </div>
      <Spotlight/>
    </div>
    </main>
  )
}  

export default App
