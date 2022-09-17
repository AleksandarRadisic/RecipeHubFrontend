import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';

import Comment from '../Comment/Comment';


const CommentList = (props) => {
  const [newCommentAvailable, setNewCommentAvailable] = useState(false)
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)

  useEffect(() => {
    let commented = false
    for (let i = 0; i < props.comments.length; i++) {
      if (props.comments[i].userId == localStorage.getItem('id'))
        commented = true;
    }
    if (props.ownerId !== localStorage.getItem('id') && !commented && localStorage.getItem('token') && props.postId && localStorage.getItem('role') === "Regular")
      setNewCommentAvailable(true)
  }, [])

  const postComment = () => {
    var body = {
      text: text,
      rating: rating,
    }
    if(props.postType === "recipe"){
      axios.post(axios.defaults.baseURL + "Recipe/" + props.postId + "/comments", body, { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
      .then(res => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data
        }).then(() =>{
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
      axios.post(axios.defaults.baseURL + "Article/" + props.postId + "/comments", body, { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
      .then(res => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: res.data
        }).then(() =>{
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
  }

  return (
    <>
      {props.comments.length > 0 &&
        <>
          {props.postId && <h2>Comments</h2>}
          {!props.postId && <h2>Reported comments</h2>}
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Text</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {
                (props.comments).map((comment, index) => {
                  return (
                    <Comment comment={comment} ownerId={props.ownerId} postType={props.postType} postId={props.postId}/>
                  )
                })
              }
            </tbody>
          </table>
        </>
      }
      {
        props.comments.length === 0 &&
        <h2>No comments</h2>
      }
      {
        newCommentAvailable &&
        <>
          <br />
          <h2>Add new comment</h2>
          <br />
          <div className='panel-footer'>
            <table style={{ width: "70%", margin: "auto" }}>
              <tbody>
                <tr>
                  <td style={{ width: "80%" }}>
                    <h3 className="labels">Text</h3>
                    <textarea rows="6" style={{ resize: "none", width: "60%" }} onChange={(e) => setText(e.target.value)} />
                  </td>
                  <td style={{ width: "15%" }}>
                    <h3 className="labels">Rating</h3>
                    <input style={{ width: "100%" }} type="number" min="1" max="10" className="form-control mb-1" value={rating} onChange={(e) => setRating(e.target.value)}/>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={(e) => postComment()} disabled={!text || text === '' || rating < 1 || rating > 10}><strong>Post comment</strong></button>
          </div>
        </>
      }
    </>
  )
}

CommentList.propTypes = {};

CommentList.defaultProps = {};

export default CommentList;
