import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './Components/MoviesList';
import MovieListHeading from './Components/MovieListHeading';
import AddFavourites from './Components/AddFavouites';
import RemoveFavourites from './Components/RemoveFavourites';


const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=avengers&apikey=85a0f3b7`;
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return ( 
    <div class="row">
  <div class="column col-5 col-sm-5">
    <h4 class="m-3">Movies</h4>
    <MovieList
      movies={movies}
      handleFavouritesClick={addFavouriteMovie}
      favouriteComponent={AddFavourites}
    />
  </div>
  <div class="column col-5 col-sm-5">
    <h4 class="m-3">Favourite Movies</h4>
    <MovieList
      movies={favourites}
      handleFavouritesClick={removeFavouriteMovie}
      favouriteComponent={RemoveFavourites}
    />
    
  </div>
</div>

	);
};

export default App;
