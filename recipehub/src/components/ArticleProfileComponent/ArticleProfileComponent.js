import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import ImageCarousel from '../ImageCarousel/ImageCarousel';
import CommentList from '../CommentList/CommentList';



const ArticleProfileComponent = (props) => {
  let navigate = useNavigate()

  const goToUpdateArticle = (e) => {
    e.preventDefault()
    navigate('/update-article/' + props.article.article.id, { state: props.article })
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
      {
        props.article.article.userId === localStorage.getItem('id') && <button className="btn btn-primary" onClick={(e) => goToUpdateArticle(e)}><strong>Update article</strong></button>
      }
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
