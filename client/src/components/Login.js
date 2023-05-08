import React, {useState} from "react";
import { useHistory } from "react-router-dom";


function Login(){

    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const handleEmail = e => setNewEmail(e.target.value)
    const handlePassword = e => setNewPassword(e.target.value)
    const history = useHistory();

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
        fetch('/', requestOptions)
            .then((r) => r.json())
            .then((user) => {
                handleLoginResult(user);
            })
    } catch (err) {
        console.log(err);
    }

    function handleLoginResult(user) {
        if (user.hasOwnProperty('id')) {
            history.push('/');
        } 
        }
    }

    return(
        <div>
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
             
            </form>
        </div>
    )
}

export default Login;