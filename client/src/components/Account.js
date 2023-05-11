import React from 'react'
import { NavLink } from "react-router-dom";

function Account({ currentUser, setCurrentUser, onLogout }){
   
   
    return(
        <div>
            { currentUser ? (
                <div>
                    <br />
                    <div><h2><b>Logged in as:</b></h2></div>
                    <div>Name: {currentUser.fname} {currentUser.lname}</div>
                    <div>Email: {currentUser.email}</div>
                    <div>Phone: {currentUser.phone}</div>
                    <br />
                    <div><NavLink className='NavLink'  to = '/edituser'>Update My Account</NavLink></div>
                    <div><button>Logout</button></div>
                </div>) : (
                <div>
                    <br />
                    <div><NavLink className='NavLink'  to = '/login'>Login</NavLink></div>
                    <div><NavLink className='NavLink'  to = '/createaccount'>Create an Account</NavLink></div>
                </div>)}
        </div>
    )
}

export default Account;