import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import API_URL from "../apiConfig.js";
import NavBar from "./NavBar.js";

function Login(){

    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const handleEmail = e => setNewEmail(e.target.value)
    const handlePassword = e => setNewPassword(e.target.value)
    const history = useHistory();

    function handleLoginResult(user) {
        if (user.hasOwnProperty('id')) {
            console.log(user);
            console.log("successful login")
        } 
    }

  function handleLoginSubmit(e) {
    e.preventDefault();
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: newEmail,
                password: newPassword
            })
        };
        fetch(`${API_URL}/login`, requestOptions)
            .then((r) => r.json())
            .then((user) => {
                handleLoginResult(user);
            })
    } catch (err) {
        console.log(err);
    }

    
    }

    return(
        <div>
            <NavBar />
            <form onSubmit={handleLoginSubmit}>
            <input 
              type="email" 
              id= "email" 
              value = {newEmail}
              onChange={handleEmail}/>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={handlePassword}
            />
             <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;