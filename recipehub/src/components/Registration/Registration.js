import React from 'react';
import PropTypes from 'prop-types';
import { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

import Navbar from '../Navbar/Navbar';


const Registration = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [isPending, setIsPending] = useState(false);

  let navigate = useNavigate()

  const Validate = () => {
    if (email === "" || username === "" || password === "" || firstName === "" || lastName === "") {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'All inputs must be filled!',
      });
      return false;
    }
    if (password !== repeatPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Password and repeated password must match',
      })
      return false;
    }
    if (password.length < 5) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Password must have at least 5 characters',
      })
      return false;
    }
    return true;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!Validate())
      return;
    setIsPending(true);
    const registration = {
      "userName": username,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
    };
    //console.log(registration)
    axios.post(axios.defaults.baseURL + 'users/register', registration)
      .then(res => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data
        })
        navigate("/")
      }).catch(err =>{
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        });
        setIsPending(false);
      });
  }
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="m-5">
        <form style={{ maxWidth: "50%", alignContent: "center", alignItems: "center", margin: "auto" }}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="InputEmail" />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="InputUsername" />
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
            <label className="form-label">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="InputPassword" />
          </div>
          <div className="mb-3">
            <label className="form-label">Repeat password</label>
            <input value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" className="form-control" id="InputRepeatPassword" />
          </div>
          <div>
            {!isPending && <button onClick={(e) => onSubmit(e)} type="submit" className="btn btn-primary">Submit</button>}
            {isPending && <label>Registration...</label>}
          </div>
        </form>
      </div>
    </div>

  )

}

Registration.propTypes = {};

Registration.defaultProps = {};

export default Registration;
