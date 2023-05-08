import React from 'react'
import NavBar from './NavBar'
import Login from './Login'
import CreateAccount from './CreateAccount'

function Account(){
    return(
    <div>
        <NavBar />
        <div>Account.js</div>
        <br />
        {/* <Login /> */}
        <br />
        <CreateAccount />
    </div>
    )
}

export default Account;