import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const ImageEditTable = (props) => {
  const [selectedPicture, setSelectedPicture] = useState("")
  const [selectedFile, setSelectedFile] = useState("")

  let navigate = useNavigate()

  const onFileSelectChange = (e) => {
    setSelectedPicture(URL.createObjectURL(e))
    setSelectedFile(e)
  }

  const addPicture = (e) =>{
    var formData = new FormData();
    formData.append("file", selectedFile)
    if(props.postType === "recipe"){
      axios.post(axios.defaults.baseURL + "recipe/" + props.postId + "/Picture", formData, 
      { 
        headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } 
      })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: res.data
        })
        navigate("/recipe/" + props.postId)
      }).catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        })
      })
    }
    else{
      axios.post(axios.defaults.baseURL + "article/" + props.postId + "/Picture", formData, 
      { 
        headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } 
      })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: res.data
        })
        navigate("/article/" + props.postId)
      }).catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        })
      })
    }
  }

  const removePicture = (id) => {
    if (props.postType === "recipe") {
      axios.delete(axios.defaults.baseURL + "recipe/" + props.postId + "/Pictures/" + id, { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: res.data
          })
          navigate("/recipe/" + props.postId)
        }).catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data,
          })
        })
    }
    else {
      axios.delete(axios.defaults.baseURL + "article/" + props.postId + "/Pictures/" + id, { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: res.data
          })
          navigate("/article/" + props.postId)
        }).catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data,
          })
        })
    }
  }

  return (
    <>
      {props.pictures.length > 0 &&
        <div className="container mb-3">
          <div>
            <div className="panel-heading m-3">
              <h2>Pictures</h2>
            </div>
            <table className="table table-bordered table-striped table-hover">
              <tbody>
                {
                  (props.pictures).map((picture, index) => {
                    return (
                      <tr>
                        <td><img src={"data:image/jpeg;base64," + picture.data} style={{ maxWidth: "700px", maxHeight: "700px" }} /></td>
                        <td><button onClick={() => removePicture(picture.id)} class="btn btn-primary"><strong>Remove</strong></button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      }
      {props.pictures.length === 0 &&
        <div className="container mb-3">
          <h2>No pictures</h2>
        </div>
      }
      <br/>
      <div className="text-center">
        <img className="text-center mb-3" src={selectedPicture} style={{ height: "200px", width: "200px" }} alt=" " />
      </div>
      <div className="media-body ml-4">
        <h2>Add picture</h2>
        <input type="file" onChange={(e) => onFileSelectChange(e.target.files[0])} className="form-control" />
      </div>
      <div className="container mb-3">
        <button className="btn btn-primary" onClick={(e) => addPicture()} disabled={!selectedFile}>
          <strong>Add picture</strong>
        </button>
      </div >
    </>

  )
}

ImageEditTable.propTypes = {};

ImageEditTable.defaultProps = {};

export default ImageEditTable;
