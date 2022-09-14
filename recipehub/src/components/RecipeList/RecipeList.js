import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import RecipeComponent from '../RecipeComponent/RecipeComponent'



const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    setLoading(true);
    axios.get(axios.defaults.baseURL + 'Recipe')
        .then(res => {
            let recipeArray = Array.from(res.data)
            //console.log(recipeArray)
            setRecipes(recipeArray);
            //console.log(recipes);
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

  useEffect(() =>{
    console.log(recipes)
    if(recipes)setLoading(false)
    else setLoading(true)
  }, [recipes])

  const getRecipes = () => {
      return recipes;
  }

  return(
    <div>
      {loading && <h3>Loading...</h3>}
      {!loading && recipes && 
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {
              
              (getRecipes()).map((recipe, index) => {
                    return (
                          <RecipeComponent recipe={recipe} key={recipe.id}/>
                      )
                    })
            }
          </tbody>
        </table>
      }
    </div>
  );
};



RecipeList.propTypes = {};

RecipeList.defaultProps = {};

export default RecipeList;
