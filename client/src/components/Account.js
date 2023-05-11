import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import API_URL from "../apiConfig.js";

function Account({ currentUser, setCurrentUser, onLogout}) {
   



    return (
        <div>

            <div>
                <br />
                <div><h2><b>Logged in as:</b></h2></div>
                <div>Name: {currentUser.fname} {currentUser.lname}</div>
                <div>Email: {currentUser.email}</div>
                <div>Phone: {currentUser.phone}</div>
                <br />
                <div><NavLink className='NavLink' to='/edituser'>Update My Account</NavLink></div>
                <div><button onClick={onLogout}>Logout</button></div>
            </div>
        </div>
    )
}

export default Account;