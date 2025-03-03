import React, { useEffect, useState } from 'react'
import { Spotlight } from '../components/UI/spotlight'
import Search from '../components/Search'
import ThreeDCardDemo from '../components/Card'
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from '../appwrite';
import { Tilt } from 'react-tilt';
import AppLo from '../components/Navbar';
import SparklesPreview from '../section/Sparkles';




const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

const Movie = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() =>
    setDebounceSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage('');
    try {

      const endpoint = query
        ? `${API_BASE_URL}/search/movie?&query=${encodeURIComponent(query)}`
        :
        `${API_BASE_URL}/discover/movie?&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setmovieList([]);
        return;
      }
      setmovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    }
    catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    }
    finally {
      setIsLoading(false);
    }

  }

 const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }
    , [debounceSearchTerm])

  useEffect(() => {
    loadTrendingMovies();
  }
    , [])

    const handleCardClick = () => {
      console.log('Card clicked!');
      const searchbar = document.getElementById('search-bar');
      const offset = 100; 
      searchbar.scrollIntoView({top: searchbar.offsetTop - offset, behavior: 'smooth' });
    }
    const defaultOptions = {
      reverse:        false,  // reverse the tilt direction
      max:            35,     // max tilt rotation (degrees)
      perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
      scale:          1,    // 2 = 200%, 1.5 = 150%, etc..
      speed:          1000,   // Speed of the enter/exit transition
      transition:     true,   // Set a transition on enter/exit.
      axis:           null,   // What axis should be disabled. Can be X or Y.
      reset:          true,    // If the tilt effect has to be reset on exit.
      easing:         "cubic-bezier(0.4, 0, 0.2, 1)",    // Easing on enter/exit.
    }

  return (
   
      <div className="pattern overflow-x-hidden">
        <div className="wrapper">

          <div>
              <div>
              <AppLo/>
              </div>
              
            
            <h1 className='vina'>
              Find Your Favourite <span className='text-gradient'>Movies</span>
            </h1>

            <div onClick={handleCardClick} >
          <ThreeDCardDemo  className="xs:max-w-3xl" />
          </div>
          <div id='search-bar' className='mt-[60px]'>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
          </div>
          </div>
          
          {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
         
        
          <section className="all-movies">
            <h2 className='mt-[40px]'>All movies</h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (

              <ul>
                {movieList.map((movie) => (
                  <Tilt  options={defaultOptions} style={{ height: 500, width: 250 }}><MovieCard key={movie.id} movie={movie} /></Tilt>
                ))}
              </ul>

            )}
          </section>
         
        </div>
        <SparklesPreview/>  
        <Spotlight />
          
      </div>
      
   
  )
}          

export default Movie