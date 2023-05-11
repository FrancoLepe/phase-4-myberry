import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import API_URL from "../apiConfig.js";
import NavBar from "./NavBar.js";

function EditUser({ currentUser, setCurrentUser }) {
function EditUser({ currentUser, setCurrentUser }) {

    const [updateFirstName, setUpdateFirstName] = useState('')
    const [updateLastName, setUpdateLastName] = useState('')
    const [updateEmail, setUpdateEmail] = useState('')
    const [updatePhone, setUpdatePhone] = useState('')
    const [updatePassword, setUpdatePassword] = useState('')

    const handleFirstName = e => setUpdateFirstName(e.target.value)
    const handleLastName = e => setUpdateLastName(e.target.value)
    const handleEmail = e => setUpdateEmail(e.target.value)
    const handlePhone = e => setUpdatePhone(e.target.value)
    const handlePassword = e => setUpdatePassword(e.target.value)
    const navigate = useNavigate();

    const formField = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"


    function handleUpdateUser(e) {
        e.preventDefault();
        
        const updatedUser = {
            fname: updateFirstName,
            lname: updateLastName,
            email: updateEmail,
            phone: updatePhone,
            password: updatePassword
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fname: updateFirstName,
                lname: updateLastName,
                email: updateEmail,
                phone: updatePhone,
                password: updatePassword
            })
        };
        fetch(`/users/${currentUser.id}`, requestOptions)
        .then(setCurrentUser(updatedUser))
            .then(navigate("/account")
            )
    }

    // function handleLogout() {
    //     fetch("/logout", {
    //         method: "DELETE",
    //     }).then(() => onLogout());
    // }

    return (
        <div className='flex justify-center items-center'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h1>Create New Account</h1>
                <form className="space-y-6" onSubmit={handleUpdateUser}>
                    <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">first name</label>
                    <input type="name" name="fname" placeholder="First Name" className={formField} onChange={handleFirstName} />

                    <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">last name</label>
                    <input type="name" name="lname" placeholder="Last Name" className={formField} onChange={handleLastName} />

                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
                    <input type="text" name="phone" placeholder="Phone Number" className={formField} onChange={handlePhone} />

                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                    <input type="text" name="email" placeholder="Email Address" className={formField} onChange={handleEmail} />

                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                    <input type="text" name="password" placeholder="New Password" className={formField} onChange={handlePassword} />

                    <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">confirm password</label>
                    <input type="text" name="confirmpassword" className={formField} placeholder="Confirm Password" />

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>

                </form>
            </div>
        </div>
    )
}

export default EditUser;
