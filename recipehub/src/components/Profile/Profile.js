import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import Navbar from '../Navbar/Navbar';


const Profile = () => {

  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  let navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }
    axios.get(axios.defaults.baseURL + "Users/logged",
      { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
      .then(res => {
        setUserName(res.data.userName)
        setEmail(res.data.email)
        setLastName(res.data.lastName)
        setFirstName(res.data.firstName)
        setLoading(false)
      }).catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        });
      });
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    let body = {
      userName: userName,
      firstName: firstName,
      lastName: lastName
    }
    axios.put(axios.defaults.baseURL + "Users/UserInfo", body,
      { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
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

  const changePassword = (e) => {
    e.preventDefault()
    let body = {
      password: password
    }
    axios.put(axios.defaults.baseURL + "Users/password", body,
      { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
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
      {!loading &&
        <div className="m-5">
          <form style={{ maxWidth: "50%", alignContent: "center", alignItems: "center", margin: "auto" }}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" className="form-control" id="InputUsername" />
            </div>
            <div className="mb-3">
              <label className="form-label">First name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" id="InputFirstName" />
            </div>
            <div className="mb-3">
              <label className="form-label">Last name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" id="InputLastName" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address (cannot be changed)</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="InputEmail" readOnly />
            </div>
            <div>
              <button onClick={(e) => onSubmit(e)} type="submit" className="btn btn-primary" disabled={userName === "" || firstName === "" || lastName === ""}>Update profile</button>
            </div>
            <br />
            <h2>Change password</h2>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="InputPassword" />
            </div>
            <div className="mb-3">
              <label className="form-label">Repeat password</label>
              <input value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" className="form-control" id="InputRepeatPassword" />
            </div>
            <div>
              <button onClick={(e) => changePassword(e)} type="submit" className="btn btn-primary" disabled={password.length < 5 || password !== repeatPassword}>Change password</button>
            </div>
          </form>
        </div>
      }
    </>
  )

}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
