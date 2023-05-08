import React from 'react'
import NavBar from './NavBar'
import Login from './Login'
import CreateAccount from './CreateAccount'

function Account({ currentUser, setCurrentUser }){
    return(
        <div>
        <div>Account</div>
        <br />
        <a href="/login">Login</a>
        <br />
        <a href="/createaccount">Create Account</a>
  </div>
    )
}

export default Account;