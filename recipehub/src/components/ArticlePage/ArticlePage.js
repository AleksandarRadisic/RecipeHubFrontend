import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import ArticleList from '../ArticleList/ArticleList'
import Navbar from '../Navbar/Navbar';

const ArticlePage = () => {

  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    axios.get(axios.defaults.baseURL + 'Article')
      .then(res => {
        let articleArray = Array.from(res.data)
        setArticles(articleArray);
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
    fetchArticles();
  }, [])

  useEffect(() => {
    console.log(articles)
    if (articles) setLoading(false)
    else setLoading(true)
  }, [articles])

  const getArticles = () => {
    return articles;
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      {loading && <h3>Loading...</h3>}
      {!loading && articles &&
        <div>

          <h1>Most popular articles</h1>
          <ArticleList articles={getArticles()} />
        </div>
      }
    </div>
  );

}

ArticlePage.propTypes = {};

ArticlePage.defaultProps = {};

export default ArticlePage;
