import React from 'react';
import PropTypes from 'prop-types';
import { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";


const Navbar = () => {

    let navigate = useNavigate()

    const logOut = (e) =>{
        e.preventDefault();
        localStorage.clear();
        navigate("/")
    }

    return (
        <div className="m-4 p-1">
            <ul className="nav nav-pills nav-fill ">
                <li className="nav-item" key={1}>
                    <a style={{ textDecoration: "none" }} href="/"><h1>RecipeHub</h1></a>
                </li>
                <li className="nav-item" key={2}>
                    <a style={{ textDecoration: "none" }} href="/">Home</a>
                </li>
                {
                    !localStorage.getItem("id") &&
                    <li className="nav-item" key={3}>
                        <a style={{ textDecoration: "none" }} href="/login">Login</a>
                    </li>
                }
                {
                    !localStorage.getItem("id") &&
                    <li className="nav-item" key={4}>
                        <a style={{ textDecoration: "none" }} href="/registration">Registration</a>
                    </li>
                }
                {
                    localStorage.getItem("id") && 
                    <li className="nav-item" key={4}>
                        <a style={{ textDecoration: "none" }} href="#" onClick={(e) => logOut(e)}>Log out</a>
                    </li>
                }
            </ul>
            <hr></hr>
        </div>
    )

}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
