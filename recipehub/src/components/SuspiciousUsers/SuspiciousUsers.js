import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Navbar from '../Navbar/Navbar';
import CommentList from '../CommentList/CommentList'


const SuspiciousUsers = () => {

  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  let navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    if (!localStorage.getItem('token') || localStorage.getItem('role') !== "Admin") {
      navigate("/login")
    }
    axios.get(axios.defaults.baseURL + "Admin/users/suspicious",
      { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
      .then(res => {
        let users = Array.from(res.data)
        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < users[i].comments.length; j++) {
            users[i].comments[j].user = users[i]
          }
        }
        setUsers(users);
        console.log(users)
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

  const ban = (id) => {
    axios.put(axios.defaults.baseURL + "Admin/users/" + id + "/ban", {},
      { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: res.data
        }).then(() => {
          window.location.reload(false);
        })
      }).catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        });
      });
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      {users.length > 0 &&
        <div>
          {
            (users).map((user) => {
              return (
                <>
                  <div className="container mb-3">
                    <div style={{ border: "solid", width: "80%", margin: "auto" }}>
                      <h2>UserName: {user.userName}</h2>
                      <br />
                      <h2>Number of blocked comments: {user.comments.length}</h2>
                      <br />
                      <CommentList comments={user.comments} />
                      <button onClick={(e) => ban(user.id)} className="btn btn-primary"><strong>Ban user</strong></button>
                      <br />
                      <br />
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      }
      {users.length === 0 &&
        <h2>There are no suspicious users</h2>
      }
    </>
  )

}

SuspiciousUsers.propTypes = {};

SuspiciousUsers.defaultProps = {};

export default SuspiciousUsers;
