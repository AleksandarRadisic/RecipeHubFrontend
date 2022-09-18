import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

import ImageCarousel from '../ImageCarousel/ImageCarousel';
import CommentList from '../CommentList/CommentList';



const ArticleProfileComponent = (props) => {
  let navigate = useNavigate()

  const goToUpdateArticle = (e) => {
    e.preventDefault()
    navigate('/update-article/' + props.article.article.id, { state: props.article })
  }

  const deleteArticle = (e) => {
    e.preventDefault()
    confirmAlert({
      title: "Are you sure?",
      message: "Are you sure you want to delete this article?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.delete(axios.defaults.baseURL + "Article/" + props.article.article.id,
              { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
              .then(res => {
                console.log(res)
                Swal.fire({
                  icon: 'success',
                  title: 'success',
                  text: res.data
                })
                navigate("/articles")
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
      {console.log(props.article)}
      <h1>{props.article.article.title}</h1>
      <br />
      <br />
      <div className="panel-body">
        <textarea rows="20" readOnly={true} style={{ resize: "none", width: "60%" }} value={props.article.article.text} />
      </div>
      <br />
      <div>
        <ImageCarousel images={props.article.pictures} />
      </div>
      <div style={{ margin: "auto" }}>
        {
          props.article.article.userId === localStorage.getItem('id') && <button className="btn btn-primary" onClick={(e) => goToUpdateArticle(e)}><strong>Update article</strong></button>
        }
        {
          props.article.article.userId === localStorage.getItem('id') &&
          <div style={{ display: "inline-block", marginLeft: "5%" }}></div>
        }
        {
          (props.article.article.userId === localStorage.getItem('id') || localStorage.getItem('role') === "Admin") &&
          <button className="btn btn-primary" onClick={(e) => deleteArticle(e)} style={{ background: "red", border: "1px solid red" }}><strong>Delete article</strong></button>
        }
      </div>

      <br />
      <br />
      <div className='panel-footer'>
        <CommentList comments={props.article.article.comments} ownerId={props.article.article.userId} postType="article" postId={props.article.article.id} />
      </div>
    </div>
  )

}

ArticleProfileComponent.propTypes = {};

ArticleProfileComponent.defaultProps = {};

export default ArticleProfileComponent;
