import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


const Ingredients = () => {
  const [loading, setLoading] = useState(true)
  const [ingredients, setIngredients] = useState([])
  const [selectedMeasureUnit, setSelectedMeasureUnit] = useState('')
  const [ingredientName, setIngredientName] = useState('')
  const [caloriesPerUnit, setCaloriesPerUnit] = useState()

  useEffect(() => {
    axios.get(axios.defaults.baseURL + "Ingredients")
      .then(res => {
        let ingredients = Array.from(res.data)
        setIngredients(ingredients);
        setLoading(false);
      }).catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        });
      });
  }, [])

  const addIngredient = () => {
    var body = {
      name: ingredientName,
      caloriesPerUnit: caloriesPerUnit,
      measureUnit: selectedMeasureUnit
    }
    console.log(body)
    axios.post(axios.defaults.baseURL + "Ingredients", body, 
    { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
    .then(res => {
      console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'success',
        text: res.data
      }).then(() => {
        window.location.reload(false)
      })
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
    <>
      <div>
        <Navbar />
      </div>
      {!loading &&
        <div className="container mb-3">
          <h2>Ingredients</h2>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Measure unit</th>
                <th>Calories per unit</th>
              </tr>
            </thead>
            <tbody>
              {
                (ingredients).map((ingredient, index) => {
                  return (
                    <tr>
                      <td>{ingredient.name}</td>
                      {ingredient.measureUnit === 0 &&
                        <td>gram</td>
                      }
                      {ingredient.measureUnit === 1 &&
                        <td>milliliter</td>
                      }
                      {ingredient.measureUnit === 2 &&
                        <td>piece</td>
                      }
                      <td>{ingredient.caloriesPerUnit}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          {localStorage.getItem('role') === 'Admin' &&
            <div>
              <br />
              <h2>Add new ingredient</h2>
              <table style={{ width: "70%", margin: "auto" }}>
                <tbody>
                  <tr>
                    <td>
                      <input type="text" value={ingredientName} className="form-control mb-1" onChange={(e) => setIngredientName(e.target.value)} placeholder='ingredient name' />
                    </td>
                    <td>
                      <select className="form-select" aria-label="Default select example" autoComplete='true' value={selectedMeasureUnit} onChange={(e) => setSelectedMeasureUnit(e.target.value)}>
                        {!selectedMeasureUnit && <option value=''>Please select measure unit</option>}
                        <option key={0} value='g'>
                          gram
                        </option>
                        <option key={1} value='ml'>
                          milliliter
                        </option>
                        <option key={2} value='piece'>
                          piece
                        </option>
                      </select>
                    </td>
                    <td>
                      <input style={{ width: "100%" }} type="number" min="1" value={caloriesPerUnit} className="form-control mb-1" onChange={(e) => setCaloriesPerUnit(e.target.value)} placeholder='Calories per unit' />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="btn btn-primary" onClick={(e) => addIngredient(e)} disabled={!selectedMeasureUnit || selectedMeasureUnit === '' || !ingredientName || ingredientName === '' || !caloriesPerUnit || caloriesPerUnit < 1}><strong>Add</strong></button>
            </div>
          }
        </div>
      }
    </>
  )

}

Ingredients.propTypes = {};

Ingredients.defaultProps = {};

export default Ingredients;
