import React from 'react';
import PropTypes from 'prop-types';

import RecipeIngredientListElement from '../RecipeIngredientListElement/RecipeIngredientListElement'


const RecipeIngredientList = (props) => {
  return(
    <ul className='list-group list-group-flush'>
      {
        (props.recipeIngredients).map((recipeIngredient, index) => {
          return(
            <RecipeIngredientListElement recipeIngredient={recipeIngredient}/>
          )
        })
      }
    </ul>
  )
}

RecipeIngredientList.propTypes = {};

RecipeIngredientList.defaultProps = {};

export default RecipeIngredientList;
