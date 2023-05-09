import React from 'react';
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({ currentUser }) {
    const navClass = "rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
    return (
        <div className="sm:justify-center space-x-4">
            {currentUser ? (<div >Welcome, {currentUser.fname} {currentUser.lname}!</div>) : <NavLink className='NavLink' exact to='/login'>Login</NavLink>}
            <div>
                <NavLink className={navClass} exact to='/'>Home</NavLink>
                <NavLink className={navClass} exact to='/mybooks'>My Books</NavLink>
                <NavLink className={navClass} exact to='/account'>My Account</NavLink>
            </div>
        </div>
    )
}

export default NavBar;
