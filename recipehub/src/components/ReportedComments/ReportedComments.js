import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Navbar from '../Navbar/Navbar';
import CommentList from '../CommentList/CommentList'


const ReportedComments = () => {

  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])

  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('role') !== "Admin") {
      navigate("/login")
    }
    axios.get(axios.defaults.baseURL + "Admin/reports/pending",
      { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
      .then(res => {
        let comments = Array.from(res.data)
        setComments(comments);
        setLoading(false);
      }).catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        });
      });

  }, [])

  return (
    <>
      <div>
        <Navbar />
      </div>
      {!loading &&
        <div className="container mb-3">
          <CommentList comments={comments} />
        </div>
      }
    </>
  )

}

ReportedComments.propTypes = {};

ReportedComments.defaultProps = {};

export default ReportedComments;
