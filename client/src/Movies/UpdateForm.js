import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};
const UpdateForm = (props) => {
    console.log({ props });

  const { push } = useHistory();
  const [movies, setMovies] = useState(initialMovie);
  const { id } = useParams;

  return (
    <div>
      <p>UpdateForm</p>
    </div>
  );
};
export default UpdateForm;
