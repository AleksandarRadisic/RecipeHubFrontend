import React from 'react';
import PropTypes from 'prop-types';


const RecipeIngredientListElement = (props) => {
  return (
    <>
      {props.recipeIngredient.ingredient.measureUnit === 0 && <li>{props.recipeIngredient.quantity} grams of {props.recipeIngredient.ingredient.name}</li>}
      {props.recipeIngredient.ingredient.measureUnit === 1 && <li>{props.recipeIngredient.quantity} ml of {props.recipeIngredient.ingredient.name}</li>}
      {props.recipeIngredient.ingredient.measureUnit === 2 && <li>{props.recipeIngredient.quantity} pieces of {props.recipeIngredient.ingredient.name}</li>}
    </>
  )
}

RecipeIngredientListElement.propTypes = {};

RecipeIngredientListElement.defaultProps = {};

export default RecipeIngredientListElement;
