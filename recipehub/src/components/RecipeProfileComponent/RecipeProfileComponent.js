import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import RecipeIngredientList from '../RecipeIngredientList/RecipeIngredientList';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import CommentList from '../CommentList/CommentList';


const RecipeProfileComponent = (props) => {

  let navigate = useNavigate()

  const goToUpdateRecipe = (e) => {
    e.preventDefault()
    navigate('/update-recipe/' + props.recipe.recipe.id, {state: props.recipe})
  }

  return(
    <div className="container mb-3">    
      <h1>{props.recipe.recipe.name}</h1>
      <div className="panel-body">
        <p>{props.recipe.recipe.description}</p>
      </div>
      <br/>
      <h2>Ingredients</h2>
      <div className='panel-footer' style={{ width: "40%", margin: "auto" }}>
        <RecipeIngredientList recipeIngredients={props.recipe.recipe.recipeIngredients}/>
      </div>
      <br/>
      <h2>Instructions</h2>
      <div className="panel-body">
        <p>{props.recipe.recipe.instructions}</p>
      </div>
      <div style={{ width: "50%", height: "500px", margin: "auto"}}>
        <ImageCarousel images={props.recipe.pictures}/>
      </div>
      {
        props.recipe.recipe.userId === localStorage.getItem('id') && <button class="btn btn-primary" onClick={(e) => goToUpdateRecipe(e)}><strong>Update recipe</strong></button>
      }
      <br/>
      <br/>
      <h2>Comments</h2>
      <div className='panel-footer'>
        <CommentList comments={props.recipe.recipe.comments} ownerId={props.recipe.recipe.userId}/>
      </div>
    </div>
  )
}

  

RecipeProfileComponent.propTypes = {};

RecipeProfileComponent.defaultProps = {};

export default RecipeProfileComponent;
