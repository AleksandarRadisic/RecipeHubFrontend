import React from 'react';
import PropTypes from 'prop-types';


const RecipeComponent = (props) => {
  return(
    <tr>
      <td>{props.recipe.name}</td>
      <td>{props.recipe.description}</td>
      <td>{props.recipe.rating}</td>
    </tr>
  )
};

RecipeComponent.propTypes = {};

RecipeComponent.defaultProps = {};

export default RecipeComponent;
