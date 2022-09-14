import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import RecipeProfilePage from '../RecipeProfilePage/RecipeProfilePage';


const RecipeComponent = (props) => {
  let navigate = useNavigate()

  const GoToRecipe = () => {
    navigate("/recipe/" + props.recipe.id)
  }

  return(
    <tr onClick={(e) => GoToRecipe()}>
        <td>{props.recipe.name}</td>
        <td>{props.recipe.description}</td>
        {props.recipe.rating === 0 && <td>No ratings</td>}
        {props.recipe.rating !== 0 && <td>props.recipe.rating</td>}
    </tr>
  )
};

RecipeComponent.propTypes = {};

RecipeComponent.defaultProps = {};

export default RecipeComponent;
