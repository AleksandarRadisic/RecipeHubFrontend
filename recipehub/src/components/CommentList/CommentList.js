import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';


const CommentList = (props) => {
  return (
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
            return(
              <Comment comment={comment} ownerId={props.ownerId}/>
            )
          })
        }
      </tbody>
    </table>
  )
}

CommentList.propTypes = {};

CommentList.defaultProps = {};

export default CommentList;
