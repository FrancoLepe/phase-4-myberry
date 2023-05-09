import React from 'react';
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({ currentUser }) {
    const navClass = "rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
    return (
        <div className="sm:justify-center space-x-4">

            <div>

                <a href="/" className={navClass}>Home</a>
                <a href="/mybooks" className={navClass}>My Books</a>
                <a href="/account" className={navClass}>My Account</a>
                {currentUser ? (<div >Welcome, {currentUser.fname} {currentUser.lname}!</div>) : <a href='/login' className={navClass}>Login</a>}
            </div>
        </div>
    )
}

export default NavBar;
