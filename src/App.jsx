import React, { useEffect, useState } from 'react'
import { Spotlight } from './components/UI/spotlight'
import Search from './components/Search'
import ThreeDCardDemo from './components/Card'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [treandingMovies, setTreandingMovies] = useState([]);

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

  const LoadTreandingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTreandingMovies(movies);
    }
    catch (error) {
      console.error(`Error fetching treanding movies: ${error}`);

    }
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }
    , [debounceSearchTerm])

  useEffect(() => {
    LoadTreandingMovies();
  }
    , [])

    const handleCardClick = () => {
      console.log('Card clicked!');
      const searchbar = document.getElementById('search-bar');
      const offset = 100; 
      searchbar.scrollIntoView({top: searchbar.offsetTop - offset, behavior: 'smooth' });
    }

  return (
    <main>
      <div className="pattern overflow-x-hidden">
        <div className="wrapper">

          <header>
            <h1>
              Find Your Favourite <span className='text-gradient'>Movies</span>
            </h1>

            <div onClick={handleCardClick} >
          <ThreeDCardDemo  className="xs:max-w-3xl" />
          </div>
          <div id='search-bar' className='mt-[60px]'>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
          </div>
          </header>
          {treandingMovies.length > 0 && (
            <section className="treanding-movies">
                <h2>Trending Movies</h2>
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
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>

            )}
          </section>
        </div>
        <Spotlight />
      </div>
    </main>
  )
}          

export default App