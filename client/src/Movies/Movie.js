import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, movies, setMovies }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { push } = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log(res)
        // props.setMovie(res.data);
        // push('/item-list');
        // res.data ==> just the id
         const deleteMovie = movies.filter(v => `${v.id}` !== res.data)
        setMovies(deleteMovie)
         push('/')
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button className="updateButton" onClick={() => push(`/update-movie/${movie.id}`)}>Update Movie</button>
      <button className="deleteButton" onClick={deleteMovie}>Delete</button>
    </div>
  );
}

export default Movie;
