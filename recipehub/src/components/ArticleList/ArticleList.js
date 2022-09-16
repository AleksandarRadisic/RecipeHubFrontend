import React from 'react';
import PropTypes from 'prop-types';

import ArticleComponent from '../ArticleComponent/ArticleComponent';

const ArticleList = (props) => {
  return(
    <>
      {props.articles.length === 0 &&
        <h2>No articles</h2>
      }
      {
        props.articles.length > 0 &&
        <div className="container mb-3">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {

                (props.articles).map((article, index) => {
                  return (
                    <ArticleComponent article={article} key={article.id} />
                  )
                })
              }
            </tbody>
          </table>
        </div>
      }
    </>
  )
}

ArticleList.propTypes = {};

ArticleList.defaultProps = {};

export default ArticleList;
