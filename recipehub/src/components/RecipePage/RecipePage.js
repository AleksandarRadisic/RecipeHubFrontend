import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';


import RecipeList from '../RecipeList/RecipeList';
import Navbar from '../Navbar/Navbar';


const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    setLoading(true);
    axios.get(axios.defaults.baseURL + 'Recipe')
      .then(res => {
        let recipeArray = Array.from(res.data)
        setRecipes(recipeArray);
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
    fetchRecipes();
  }, [])

  useEffect(() => {
    console.log(recipes)
    if (recipes) setLoading(false)
    else setLoading(true)
  }, [recipes])

  const getRecipes = () => {
    return recipes;
  }
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {loading && <h3>Loading...</h3>}
      {!loading && recipes &&
        <div>

          <h1>Most popular recipes</h1>
          <RecipeList recipes={getRecipes()} />
        </div>
      }
    </div>
  );
};


RecipePage.propTypes = {};

RecipePage.defaultProps = {};

export default RecipePage;
