import React from 'react';
import PropTypes from 'prop-types';
import { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

import { Link } from "react-router-dom";
import Navbar from '../Navbar/Navbar';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  let navigate = useNavigate()

  const Validate = () => {
    if (username === "" || password === "") {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'All inputs must be filled!',
      });
      return false;
    }
    return true;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!Validate())
      return;
    const login = {
      "username": username,
      "password": password
    };
    setIsPending(true);
    axios.post(axios.defaults.baseURL + 'users/login', login)
      .then(res => {
        setIsPending(false);
        localStorage.setItem('token', res.data.token);
        let data = jwt_decode(res.data.token)
        localStorage.setItem('id', data.id)
        localStorage.setItem('role', data.role)
        localStorage.setItem('given_name', data.given_name)
        console.log(localStorage.getItem('id'))
        console.log(localStorage.getItem('role'))
        console.log(localStorage.getItem('given_name'))
        navigate('/');
      }).catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        });
        setIsPending(false);
      })
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container align-content: center display: flex align-items: center mt-5">
        <form style={{ maxWidth: "50%", margin: "auto" }}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} required type="text" className="form-control" id="InputUsername" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" className="form-control" id="InputPassword" />
          </div>
          <div className="mb-3">
            {!isPending && <span className="right">
              <Link to="#" onClick={(e) => onSubmit(e)} type="submit" className="btn btn-primary">Login</Link>
            </span>}
            {isPending && <label>Logging...</label>}
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
