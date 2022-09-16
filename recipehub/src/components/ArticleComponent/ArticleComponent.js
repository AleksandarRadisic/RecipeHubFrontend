import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';


const ArticleComponent = (props) => {
  let navigate = useNavigate()

  const GoToArticle = () => {
    navigate("/article/" + props.article.id)
  }

  return(
    <tr onClick={(e) => GoToArticle()}>
        <td>{props.article.title}</td>
        {props.article.rating === 0 && <td>No ratings</td>}
        {props.article.rating !== 0 && <td>{props.article.rating}</td>}
    </tr>
  )

}

ArticleComponent.propTypes = {};

ArticleComponent.defaultProps = {};

export default ArticleComponent;
