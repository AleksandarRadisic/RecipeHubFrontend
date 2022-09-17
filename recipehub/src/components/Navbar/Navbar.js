import React from 'react';
import PropTypes from 'prop-types';
import { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";


const Navbar = () => {

    let navigate = useNavigate()

    const logOut = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate("/")
    }

    return (
        <div className="m-4 p-1">
            <ul className="nav nav-pills nav-fill ">
                <li className="nav-item" key={245}>
                    <p style={{ textDecoration: "none" }} href="/"><h1>RecipeHub</h1></p>
                </li>
                <li className="nav-item" key={1}>
                    <a style={{ textDecoration: "none" }} href="/">Recipes</a>
                </li>
                {
                    localStorage.getItem("id") && localStorage.getItem("role") === "Regular" &&
                    <li className="nav-item" key={10}>
                        <a style={{ textDecoration: "none" }} href="/my-recipes">My recipes</a>
                    </li>
                }
                {
                    localStorage.getItem("id") && localStorage.getItem("role") === "Regular" &&
                    <li className="nav-item" key={11}>
                        <a style={{ textDecoration: "none" }} href="/new-recipe">New recipe</a>
                    </li>
                }
                {
                    <li className="nav-item" key={29}>
                        <a style={{ textDecoration: "none" }} href="/articles">Articles</a>
                    </li>
                }
                {
                    localStorage.getItem("id") && localStorage.getItem("role") === "Regular" &&
                    <li className="nav-item" key={42}>
                        <a style={{ textDecoration: "none" }} href="/my-articles">My articles</a>
                    </li>
                }
                {
                    localStorage.getItem("id") && localStorage.getItem("role") === "Regular" &&
                    <li className="nav-item" key={55}>
                        <a style={{ textDecoration: "none" }} href="/new-article">New article</a>
                    </li>
                }
                <li className="nav-item" key={35}>
                    <a style={{ textDecoration: "none" }} href="/ingredients">Ingredients</a>
                </li>
                {
                    localStorage.getItem("id") && localStorage.getItem("role") === "Admin" &&
                    <li className="nav-item" key={62}>
                        <a style={{ textDecoration: "none" }} href="/reported-comments">Reported comments</a>
                    </li>
                }
                {
                    localStorage.getItem("id") && localStorage.getItem("role") === "Admin" &&
                    <li className="nav-item" key={67}>
                        <a style={{ textDecoration: "none" }} href="/suspicious-users">Suspicious users</a>
                    </li>
                }
                {
                    !localStorage.getItem("id") &&
                    <li className="nav-item" key={12}>
                        <a style={{ textDecoration: "none" }} href="/login">Login</a>
                    </li>
                }
                {
                    !localStorage.getItem("id") &&
                    <li className="nav-item" key={13}>
                        <a style={{ textDecoration: "none" }} href="/registration">Registration</a>
                    </li>
                }
                {
                    localStorage.getItem("id") &&
                    <li className="nav-item" key={43}>
                        <a style={{ textDecoration: "none" }} href="/profile">Profile</a>
                    </li>
                }
                {
                    localStorage.getItem("id") &&
                    <li className="nav-item" key={14}>
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
