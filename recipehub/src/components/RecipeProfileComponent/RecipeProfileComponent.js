import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

import RecipeIngredientList from '../RecipeIngredientList/RecipeIngredientList';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import CommentList from '../CommentList/CommentList';


const RecipeProfileComponent = (props) => {

  let navigate = useNavigate()

  const goToUpdateRecipe = (e) => {
    e.preventDefault()
    navigate('/update-recipe/' + props.recipe.recipe.id, { state: props.recipe })
  }

  const deleteRecipe = (e) => {
    e.preventDefault()
    confirmAlert({
      title: "Are you sure?",
      message: "Are you sure you want to delete this recipe?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.delete(axios.defaults.baseURL + "Recipe/" + props.recipe.recipe.id,
              { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
              .then(res => {
                console.log(res)
                Swal.fire({
                  icon: 'success',
                  title: 'success',
                  text: res.data
                })
                navigate("/")
              }).catch(err => {
                console.log(err)
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.response.data,
                })
              })
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }

  return (
    <div className="container mb-3">
      {console.log(props.recipe)}
      <h1>{props.recipe.recipe.name}</h1>
      <br />
      <h2>Description</h2>
      <div className="panel-body">
        <p>{props.recipe.recipe.description}</p>
      </div>
      <br />
      <h2>Ingredients</h2>
      <div className='panel-footer' style={{ width: "40%", margin: "auto" }}>
        <RecipeIngredientList recipeIngredients={props.recipe.recipe.recipeIngredients} />
      </div>
      <br />
      <h2>Instructions</h2>
      <div className="panel-body">
        <textarea rows="14" readOnly={true} style={{ resize: "none", width: "60%" }} value={props.recipe.recipe.instructions} />
      </div>
      <br />
      <div>
        <ImageCarousel images={props.recipe.pictures} />
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div style={{ margin: "auto" }}>
        {
          props.recipe.recipe.userId === localStorage.getItem('id') && <button className="btn btn-primary" onClick={(e) => goToUpdateRecipe(e)}><strong>Update recipe</strong></button>
        }
        {
          props.recipe.recipe.userId === localStorage.getItem('id') &&
          <div style={{ display: "inline-block", marginLeft: "5%" }}></div>
        }
        {
          (props.recipe.recipe.userId === localStorage.getItem('id') || localStorage.getItem('role') === "Admin") &&
          <button className="btn btn-primary" onClick={(e) => deleteRecipe(e)} style={{ background: "red", border: "1px solid red" }}><strong>Delete recipe</strong></button>
        }
      </div>
      <br />
      <br />
      <div className='panel-footer'>
        <CommentList comments={props.recipe.recipe.comments} ownerId={props.recipe.recipe.userId} postType="recipe" postId={props.recipe.recipe.id} />
      </div>
    </div>
  )
}



RecipeProfileComponent.propTypes = {};

RecipeProfileComponent.defaultProps = {};

export default RecipeProfileComponent;
