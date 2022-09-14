import React from 'react';
import PropTypes from 'prop-types';

import RecipeList from '../RecipeList/RecipeList';


const RecipePage = () => {
  return(
    <div>
      <h1>Most popular recipes</h1>
      <RecipeList/>
    </div>
  );
};


RecipePage.propTypes = {};

RecipePage.defaultProps = {};

export default RecipePage;
