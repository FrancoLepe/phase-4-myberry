import React from 'react'
import { NavLink } from "react-router-dom";

function Account({ currentUser, setCurrentUser }){
    return(
        <div>
        <div>Account</div>
        <br />
        <NavLink exact to='/login'>Login</NavLink>
        <br />
        <NavLink exact to='/createaccount'>Create Account</NavLink>
  </div>
    )
}

export default Account;