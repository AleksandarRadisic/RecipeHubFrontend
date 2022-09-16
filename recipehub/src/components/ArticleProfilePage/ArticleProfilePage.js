import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import ArticleProfileComponent from '../ArticleProfileComponent/ArticleProfileComponent'
import Navbar from '../Navbar/Navbar';



const ArticleProfilePage = () => {
  const [article, setArticle] = useState();

  const [loading, setLoading] = useState(true);

  let { id } = useParams()

  const fetchArticle = async () => {
    setLoading(true);
    axios.get(axios.defaults.baseURL + 'Article/' + id)
      .then(res => {
        let article = res.data
        setArticle(article);
        setLoading(false);
      }).catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        });
      });
  };

  useEffect(() => {
    fetchArticle();
  }, [])

  useEffect(() => {
    if (article) setLoading(false)
    else setLoading(true)
  }, [article])

  const getArticle = () => {
    return article;
  }

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div>
        {loading && <h3>Loading...</h3>}
        {!loading && article &&
          <ArticleProfileComponent article={article} />
        }
      </div>
    </div>
  )

}

ArticleProfilePage.propTypes = {};

ArticleProfilePage.defaultProps = {};

export default ArticleProfilePage;
