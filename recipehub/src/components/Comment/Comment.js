import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';


const Comment = (props) => {

  const reportFunc = () =>{
    if(props.postType === "recipe"){
      axios.post(axios.defaults.baseURL + "Recipe/" + props.postId + "/comments/" + props.comment.id + "/report", {},
       { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
       .then(res => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: res.data
        })
        .then(() =>{
          window.location.reload(false);
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
    else{
      axios.post(axios.defaults.baseURL + "Article/" + props.postId + "/comments/" + props.comment.id + "/report", {},
       { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
       .then(res => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: res.data
        })
        window.location.reload(false);
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

  return(
    <tr>
      <td>{props.comment.user.userName}</td>
      <td>{props.comment.text}</td>
      <td>{props.comment.rating}</td>
      {!props.comment.report && props.ownerId === localStorage.getItem('id') &&
        <td><button onClick={reportFunc} className="btn btn-primary"><strong>Report</strong></button></td>
      }
    </tr>
  )

}

Comment.propTypes = {};

Comment.defaultProps = {};

export default Comment;
