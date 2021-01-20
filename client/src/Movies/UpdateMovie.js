import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";


const UpdateMovie = props => {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const updateMovie = () => {
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then((res) => {
        history.push("/");
        history.go(0);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const inputChange = (e) => {
    setMovie({...movie, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    updateMovie();
  }
  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  

  return (
    <form onSubmit={onSubmit}>
      <label for="title">Title: </label>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={inputChange}
        />
      <label for="director">Director: </label>
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={inputChange}
        />
      <label for="metascore">Metascore: </label>
        <input
          type="number"
          name="metascore"
          value={movie.metascore}
          onChange={inputChange}
        />
      <button>Update</button>
    </form>
  );
}

export default UpdateMovie;