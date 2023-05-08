import React from 'react';
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({currentUser}){
    
    return(
    <div>
        { currentUser ? (<div>Welcome, {currentUser.fname} {currentUser.lname}!</div>) : <div><a href='/login'>Login</a></div>}
        <div className="header-container">
            <ul className="header-menu">
                <li><a href="/">Home</a></li>
                <li><a href="/mybooks">My Books</a></li>
                <li><a href="/account">My Account</a></li>
            </ul>
        </div>
    </div>
    )
}

export default NavBar;
