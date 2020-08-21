import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = () => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // find saved movie
    const savedMovie = saved.find(movie => movie.id === id);

    // find movie object by id
    const movie = movieList.find(movie => movie.id === id);

    // if saved movie exists, alert the user
    if (savedMovie) {
      alert("This movie has already been added to your saved list.");
    } else {
      setSaved([...saved, movie])
    }
  };

  return (
    <div>
      <SavedList list={saved} />
      <Switch>
        <Route path='/' exact><MovieList movies={movieList}/></Route>
        <Route path='/movies/:id' ><Movie addToSavedList={addToSavedList} /></Route>
      </Switch>
    </div>
  );
};

export default App;
