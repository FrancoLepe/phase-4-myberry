import React from 'react';
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from '../images/myBerry-transparent-background-3.png'


function NavBar({ currentUser }) {
    const navClass = "rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
    return (
        <div className="sm:justify-center space-x-4">
            <img src={logo} alt="logo" width={200} height={100} />

            {currentUser &&
                <p>Welcome, {currentUser.fname} {currentUser.lname}!</p>
            }
            <NavLink className={navClass} to='/'>Home</NavLink>
            {currentUser ? (
                <>
                    <NavLink className={navClass} to='/mybooks'>My Books</NavLink>
                    <NavLink className={navClass} to='/account'>My Account</NavLink>
                </>
            ) : <NavLink className={navClass} to='/login'>Login</NavLink>}


        </div>
    )
}

export default NavBar;
