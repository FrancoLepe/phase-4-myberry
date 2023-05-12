import React from 'react';
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from '../images/myBerry-transparent-background-3.png'
import { Route, useNavigate } from "react-router-dom";


function NavBar({ currentUser }) {

    const navigate = useNavigate();

    const navClass = "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
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
                   
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 font-extrabold ">
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


