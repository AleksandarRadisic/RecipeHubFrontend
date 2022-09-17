import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Navbar from '../Navbar/Navbar';

const NewRecipePage = () => {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [instructions, setInstructions] = useState('')
  const [recipeIngredients, setRecipeIngredients] = useState([])
  const [allIngredients, setAllIngredients] = useState([])
  const [selectedIngredient, setSelectedIngredient] = useState('')
  const [ingredientsLoading, setIngredientsLoading] = useState(true)
  const [newIngrQuantity, setNewIngrQuantity] = useState(0)

  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('id') || localStorage.getItem('role') !== "Regular") {
      navigate("/login")
    }
    axios.get(axios.defaults.baseURL + 'Ingredients')
      .then(res => {
        let recipeArray = Array.from(res.data)
        setAllIngredients(recipeArray);
        setIngredientsLoading(false);
      }).catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        });
      });
      setLoading(false)
  }, [])

  const addIngredient = (e) => {
    e.preventDefault()
    console.log(selectedIngredient)
    console.log(newIngrQuantity)
    let found = false;
    let ingName;
    for (let i = 0; i < allIngredients.length; i++) {
      if (allIngredients[i].id === selectedIngredient) {
        console.log(allIngredients[i].name)
        ingName = allIngredients[i].name
        found = true
      }
    }
    if (found === false) return
    let recipeIngr = {
      ingredientId: selectedIngredient,
      ingredient: {
        id: selectedIngredient,
        name: ingName
      },
      quantity: newIngrQuantity
    }
    for (let i = 0; i < recipeIngredients.length; i++) {
      if (recipeIngredients[i].ingredientId === recipeIngr.ingredientId)
        return;
    }
    setRecipeIngredients(recipeIngredients.concat(recipeIngr))
  }

  const removeIngredient = (id) => {
    const newList = recipeIngredients.filter((item) => item.ingredientId !== id);
    setRecipeIngredients(newList)
  }

  const addRecipe = (e) => {
    let body = {
      name: name,
      description: description,
      instructions: instructions,
      recipeIngredients: recipeIngredients
    }
    axios.post(axios.defaults.baseURL + "Recipe", body, { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
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

  return (
    <div>
      <div>
        <Navbar />
      </div>
      {!loading &&
        <div className="container mb-3" style={{ width: "50%" }}>
          <div>
            <h2>Recipe name</h2>
            <input type="text" className="form-control" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <br />
          <div>
            <h2>Description</h2>
            <input type="text" className="form-control" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <br />
          <div>
            <h2 className="labels">Instructions</h2>
            <textarea rows="14" style={{ resize: "none", width: "100%" }} onChange={(e) => setInstructions(e.target.value)}>{instructions}</textarea>
          </div>
          <br />
          <div className="panel-heading m-3">
            <h2>Recipe ingredients</h2>
          </div>
          <table className="table table-bordered table-striped table-hover" id="additionalServicesTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {
                (recipeIngredients).map((recipeIngredient) => {
                  return (
                    <tr>
                      <td>{recipeIngredient.ingredient.name}</td>
                      <td>{recipeIngredient.quantity}</td>
                      {
                        recipeIngredients.length > 1 &&
                        <td><button className="btn btn-primary" onClick={(e) => removeIngredient(recipeIngredient.ingredientId)}><strong>Remove</strong></button></td>
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          {!ingredientsLoading &&
            <div>
              <p>Add new ingredient</p>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "50%" }}><select className="form-select" aria-label="Default select example" autoComplete='true' value={selectedIngredient} onChange={(e) => setSelectedIngredient(e.target.value)}>
                      {!selectedIngredient && <option value=''>Please select new ingredient</option>}
                      {(allIngredients).map((ingredient) => {
                        return (
                          <option key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                          </option>
                        )
                      })}
                    </select>
                    </td>
                    <td><input style={{ width: "100%" }} type="number" min="0" value={newIngrQuantity} className="form-control mb-1" onChange={(e) => setNewIngrQuantity(e.target.value)} placeholder='quantity' /></td>
                  </tr>
                </tbody>
              </table>
              <button className="btn btn-primary" onClick={(e) => addIngredient(e)} disabled={!selectedIngredient || selectedIngredient === '' || newIngrQuantity == '0'}><strong>Add</strong></button>
            </div>
          }
          <br />
          <br />
          <button className="btn btn-primary" onClick={(e) => addRecipe(e)} disabled={name === '' || description === '' || instructions === '' || recipeIngredients.length === 0}><strong>Add recipe</strong></button>
        </div>
      }
    </div>
  )

}

NewRecipePage.propTypes = {};

NewRecipePage.defaultProps = {};

export default NewRecipePage;
