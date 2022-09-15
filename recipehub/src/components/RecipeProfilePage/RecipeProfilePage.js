import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import RecipeProfileComponent from '../RecipeProfileComponent/RecipeProfileComponent';
import Navbar from '../Navbar/Navbar';




const RecipeProfilePage = () => {
  const [recipe, setRecipe] = useState();

  const [loading, setLoading] = useState(true);

  let { id } = useParams()

  const fetchRecipe = async () => {
    setLoading(true);
    axios.get(axios.defaults.baseURL + 'Recipe/' + id)
      .then(res => {
        let recipe = res.data
        setRecipe(recipe);
        setLoading(false);
      }).catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        });
      });
  };

  useEffect(() => {
    fetchRecipe();
  }, [])

  useEffect(() => {
    if (recipe) setLoading(false)
    else setLoading(true)
  }, [recipe])

  const getRecipe = () => {
    return recipe;
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        {loading && <h3>Loading...</h3>}
        {!loading && recipe &&
          <RecipeProfileComponent recipe={recipe} />
        }
      </div>
    </div>
  )

}

RecipeProfilePage.propTypes = {};

RecipeProfilePage.defaultProps = {};

export default RecipeProfilePage;
