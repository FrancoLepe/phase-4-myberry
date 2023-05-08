import React from 'react';
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar(){
    return(
    <div className="header-container">
        <ul className="header-menu">
            <li><a href="/">Home</a></li>
            <li><a href="/mybooks">My Books</a></li>
            <li><a href="/account">My Account</a></li>
        </ul>
      </div>
      
    )
}

export default NavBar;
