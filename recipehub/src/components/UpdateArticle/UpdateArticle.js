import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Navbar from '../Navbar/Navbar';
import ImageEditTable from '../ImageEditTable/ImageEditTable';


const UpdateArticle = (props) => {

  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
    if (location.state.article.userId !== localStorage.getItem('id')) {
      navigate("/login")
    }
    console.log(location.state)
    setText(location.state.article.text)
    setTitle(location.state.article.title)
    setLoading(false)
  }, [])

  const updateArticle = (e) => {
    let body = {
      title: title,
      text: text
    }
    axios.put(axios.defaults.baseURL + "Article/" + location.state.article.id, body, { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
      .then(res => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: res.data
        })
        navigate("/article/" + location.state.article.id)
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
              <input type="text" className="form-control" placeholder="Enter name" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <br />
            <div>
              <h2>Article text</h2>
              <textarea rows="20" style={{ resize: "none", width: "100%" }} value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <br />
            <button className="btn btn-primary" onClick={(e) => updateArticle(e)} disabled={text === '' || title === ''}><strong>Update article</strong></button>
            <br />
            <ImageEditTable pictures={location.state.pictures} postType="article" postId={location.state.article.id} />
          </div>
        }
      </div>
    </>
  )

}

UpdateArticle.propTypes = {};

UpdateArticle.defaultProps = {};

export default UpdateArticle;
