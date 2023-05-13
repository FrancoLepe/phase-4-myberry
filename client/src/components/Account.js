import React from 'react'
import { useNavigate } from "react-router-dom";

function Account({ currentUser, setCurrentUser, onLogout }) {

    const navigate = useNavigate();



    return (

        <div className="  grid place-items-center  bg-yellow-50 text-2xl">
            <div>
                <h2><b>Logged in as:</b></h2>
            </div>
            <br/>
            <div>Name: {currentUser.fname} {currentUser.lname}</div>
            <div>Email: {currentUser.email}</div>
            <div>Phone: {currentUser.phone}</div>
            <br/>
            <div className="  grid place-items-center">
                <button className=" text-white-100 bg-emerald-400 hover:bg-emerald-600" onClick={() => navigate("/edituser")}>Update My Account</button>
                <button className=" text-white-100 bg-emerald-400 hover:bg-emerald-600" onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Account;