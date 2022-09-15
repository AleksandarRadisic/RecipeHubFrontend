import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';

import RecipeComponent from '../RecipeComponent/RecipeComponent'



const RecipeList = (props) => {
  return(
    <div class="container mb-3">
        <table class="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {
              
              (props.recipes).map((recipe, index) => {
                    return (
                          <RecipeComponent recipe={recipe} key={recipe.id}/>
                      )
                    })
            }
          </tbody>
        </table>
    </div>
  );
};



RecipeList.propTypes = {};

RecipeList.defaultProps = {};

export default RecipeList;
