import React, { useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import API_URL from "../apiConfig.js";
import NavBar from "./NavBar.js";

function Login({ currentUser, setCurrentUser, handleLogin }) {

    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const handleEmail = e => setNewEmail(e.target.value)
    const handlePassword = e => setNewPassword(e.target.value)
    const [formErrors, setFormErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const formField = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

    function handleLoginResult(user) {
        if (user.hasOwnProperty('id')) {
            console.log("successful login")
            console.log(user);
            handleLogin(user);
            navigate("/")
        }
    }

    function handleLoginSubmit(e) {
        e.preventDefault();
        setIsLoading(true);


        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: newEmail,
                    password: newPassword
                })
            };
            fetch('/login', requestOptions)
                .then((r) => {
                    setIsLoading(false);

                    if (r.ok) {
                        r.json().then((user) => {
                            handleLoginResult(user);
                            
                        })
                    } else {
                        r.json().then((err) => {
                            setFormErrors(err.error)
                        });
                    }
                })
            
            
        } catch (err) {
            setFormErrors(err.error);
        }


    }

    return (
        <div className='flex justify-center items-center'><div  className="  max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Log in</h5>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    className={formField}
                    value={newEmail}
                    onChange={handleEmail} />
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    className={formField}
                    value={newPassword}
                    onChange={handlePassword}
                />
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                <div>{formErrors.length > 0
                    ? 
                        <><p key={formErrors} style={{ color: "red" }}>
                            {formErrors}
                        </p></>
                    : null}
                    </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <a href="/createaccount" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                </div>
            </form>
        </div></div>
    )
}

export default Login;