import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

function Account({ currentUser, setCurrentUser }) {
    const navigate = useNavigate();

    function handleLogout() {
        setCurrentUser('')
        navigate("/")
    }

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
                <div><button onClick={handleLogout}>Logout</button></div>
            </div>
        </div>
    )
}

export default Account;