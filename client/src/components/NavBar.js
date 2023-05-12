import React from 'react';
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from '../images/myBerry-transparent-background-3.png'
import { Route, useNavigate } from "react-router-dom";


function NavBar({ currentUser }) {

    const navigate = useNavigate();

    const navClass = "block py-2 pl-3 pr-4 text-white bg-blue-400  text-2xl font-bold rounded md:bg-transparent md:text-blue-400 md:p-0 "
    // const navClass = "rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
    return (
     
            <div className="max-w-[98%] font-medium flex flex-wrap items-center justify-between  p-1 w-screen">
                <a href='/' className="flex items-center">
                    <img src={logo} width={200} height={100} alt='MyBerry logo' />
                </a>
                <div className="flex md:order-2">
                    {!currentUser ? 
                    <button type="button" className="text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 " onClick={() => navigate("/login")}>Login</button>
                    :
                                        <p className={navClass} >Welcome, {currentUser.fname} {currentUser.lname}!</p>
                                    }
                   <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  ">
                        <li>
                            <NavLink className={navClass} to='/' >Home</NavLink>
                        </li>
                        {currentUser &&
                            <>
                                <li>
                                    <NavLink className={navClass} to='/mybooks'>My Books</NavLink>
                                </li>
                                <li>
                                    <NavLink className={navClass} to='/account'>My Account</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
     
    )
}

export default NavBar;


