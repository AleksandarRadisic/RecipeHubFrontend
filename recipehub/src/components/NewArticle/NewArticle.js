import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Navbar from '../Navbar/Navbar';


const NewArticle = () => {

  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('id') || localStorage.getItem('role') !== "Regular") {
      navigate("/login")
    }
    setLoading(false)
  }, [])

  const addArticle = (e) => {
    let body = {
      title: title,
      text: text
    }
    axios.post(axios.defaults.baseURL + "Article", body, { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
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

  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        {!loading &&
          <div className="container mb-3" style={{ width: "50%" }}>
            <div>
              <h2>Article title</h2>
              <input type="text" className="form-control" placeholder="Article title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <br />
            <div>
              <h2>Article text</h2>
              <textarea rows="20" style={{ resize: "none", width: "100%" }} value={text} onChange={(e) => setText(e.target.value)} placeholder="Article text"/>
            </div>
            <br />
            <button className="btn btn-primary" onClick={(e) => addArticle(e)} disabled={text === '' || title === ''}><strong>Post article</strong></button>
          </div>
        }
      </div>
    </>
  )

}

NewArticle.propTypes = {};

NewArticle.defaultProps = {};

export default NewArticle;
