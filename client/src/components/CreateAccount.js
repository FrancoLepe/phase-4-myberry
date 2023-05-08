import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import API_URL from "../apiConfig.js";
import NavBar from "./NavBar.js";

function CreateAccount({currentUser, onLogout, onCreateAccount}) {

    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const handleFirstName = e => setNewFirstName(e.target.value)
    const handleLastName = e => setNewLastName(e.target.value)
    const handleEmail = e => setNewEmail(e.target.value)
    const handlePhone = e => setNewPhone(e.target.value)
    const handlePassword = e => setNewPassword(e.target.value)
    const history = useHistory();

	function handleCreateAccountSubmit(e) {
        e.preventDefault();
        
        const newUser = {
            fname: newFirstName,
            lname: newLastName,
            email: newEmail,
            phone: newPhone,
            password: newPassword
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fname: newFirstName,
                lname: newLastName,
                email: newEmail,
                phone: newPhone,
                password: newPassword
            })
        };
        fetch(`${API_URL}/users`, requestOptions)
            .then(onCreateAccount)
    }

    // function handleLogout() {
    //     fetch("/logout", {
    //         method: "DELETE",
    //     }).then(() => onLogout());
    // }
    
    return (
        <div>
                <NavBar />
                <div>
                    <br />
                    <div><h1>Create My Account</h1></div>
                    <form onSubmit={handleCreateAccountSubmit}>
  

                                <input type="name" name="fname" placeholder="First Name" onChange={handleFirstName} />


                                <input type="name" name="lname" placeholder="Last Name" onChange={handleLastName} />


                      
                                <input type="text" name="phone" placeholder="Phone Number" onChange={handlePhone} />
               
                                <input type="text" name="email" placeholder="Email Address" onChange={handleEmail} />
    
                        
                                <input className="form-control" type="text" name="password" placeholder="New Password" onChange={handlePassword} />
                        
                                <input type="text" name="confirmpassword" placeholder="Confirm Password" />
                                <input type="submit" value="Create Account" />
                    </form>
                </div>
        </div>
	)
}

export default CreateAccount;
