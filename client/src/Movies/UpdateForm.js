import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};
const UpdateForm = (props) => {
  // console.log({ props });

  const { push } = useHistory();
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  //   console.log({id})

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        // console.log({ res });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (e) => {
    e.persist();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
          console.log(res)
         props.setMovies([...props.movies, res.data]);
        push('/');
      })
      .catch(err => console.log(err));
  };
  
 
 
  return (
    <div className="updateForm">
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit} className="updateForm">
        {/* <label htmlFor="id">Id: </label>
        <input
          type="number"
          name="id"
          onChange={changeHandler}
          placeholder="ID#"
          value={movie.id}
        /> */}
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <label htmlFor="director">Director: </label>
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <label htmlFor="metascore">MetaScore: </label>
        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <label htmlFor="star">Stars: </label>
        {movie.stars.map((star, index) => {
        //   console.log(star);
          return (
            <input
              key={index}
              type="text"
              name="star"
              onChange={changeHandler}
              placeholder="Star"
              value={star}
            />
          );
        })}
        <button className="updateFormButton">Update</button>
      </form>
    </div>
  );
};
export default UpdateForm;
