import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import API_URL from "../apiConfig.js";

function Login({  handleLogin }) {

    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const handleEmail = e => setNewEmail(e.target.value)
    const handlePassword = e => setNewPassword(e.target.value)
    const [formErrors, setFormErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const formField = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "

    function handleLoginResult(user) {
        if (user.hasOwnProperty('access_token')) {
          handleLogin(user.user);
          localStorage.setItem('access_token', user.access_token);
          navigate("/");
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
              password: newPassword,
            }),
          };
          fetch(`${API_URL}/login`, requestOptions)
            .then((response) => {
              setIsLoading(false);
              if (response.ok) {
                response.json().then((data) => {
                  handleLoginResult(data);
                  localStorage.setItem('access_token', data.access_token);
                });
              } else {
                response.json().then((err) => {
                  setFormErrors(err.error);
                });
              }
            });
        } catch (err) {
          setFormErrors(err.error);
        }
      }
      

    return (
        <div className='flex justify-center items-center  bg-yellow-50'>
            <div  className="  max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <h1 >Log in</h1>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    className={formField}
                    value={newEmail}
                    onChange={handleEmail} />
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    className={formField}
                    value={newPassword}
                    onChange={handlePassword}
                />
                <button type="submit" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login</button>
                <div>{formErrors.length > 0
                    ? 
                        <><p key={formErrors} style={{ color: "red" }}>
                            {formErrors}
                        </p></>
                    : null}
                    </div>
                <div className="text-sm font-medium text-gray-500 ">
                    Not registered? <a href="/createaccount" className="text-emerald-400 hover:underline ">Create account</a>
                </div>
            </form>
        </div></div>
    )
}

export default Login;