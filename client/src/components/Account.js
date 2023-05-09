import React from 'react'
import { NavLink } from "react-router-dom";

function Account({ currentUser, setCurrentUser }){
   
   console.log(currentUser)
   
   
   
   
    return(
        <div>
        <div>Account</div>
        <br />
        <NavLink exact to='/edituser' >Edit User</NavLink>
        <br />
        <NavLink exact to='/login'>Login</NavLink>
        <br />
        <NavLink exact to='/createaccount'>Create Account</NavLink>
  </div>
    )
}

export default Account;