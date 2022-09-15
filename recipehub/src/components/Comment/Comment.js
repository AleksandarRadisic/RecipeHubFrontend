import React from 'react';
import PropTypes from 'prop-types';


const Comment = (props) => {

  const reportFunc = () =>{
    alert(props.comment.id)
    window.location.reload(false);
  }

  return(
    <tr>
      <td>{props.comment.user.userName}</td>
      <td>{props.comment.text}</td>
      <td>{props.comment.rating}</td>
      {!props.comment.report && props.ownerId === "e23396e1-1e2e-461c-aef0-1f4c4f90cba1" &&
        <td><button onClick={reportFunc} className="btn btn-primary"><strong>Report</strong></button></td>
      }
    </tr>
  )

}

Comment.propTypes = {};

Comment.defaultProps = {};

export default Comment;
