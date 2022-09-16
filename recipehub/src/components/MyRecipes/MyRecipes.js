import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';

import Navbar from '../Navbar/Navbar';
import RecipeList from '../RecipeList/RecipeList';
import { useNavigate } from 'react-router-dom';


const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(true);

  let navigate = useNavigate()

  const fetchRecipes = async () => {
    setLoading(true);
    axios.get(axios.defaults.baseURL + 'Recipe/logged-user',
     { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
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
    if(!localStorage.getItem('token')){
      navigate("/login")
    }
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

  return(
    <div>
      <div>
        <Navbar />
      </div>
      {loading && <h3>Loading...</h3>}
      {!loading && recipes &&
        <div>

          <h1>My recipes</h1>
          <RecipeList recipes={getRecipes()} />
        </div>
      }
    </div>
  )
}

MyRecipes.propTypes = {};

MyRecipes.defaultProps = {};

export default MyRecipes;
