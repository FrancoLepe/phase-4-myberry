import React from "react";
import { useNavigate } from 'react-router-dom';
import API_URL from "../apiConfig.js";
import { useFormik } from "formik";
import * as yup from "yup";


function EditUser({ currentUser, setCurrentUser, onDeleteAccount}) {

    const navigate = useNavigate();
    const formField = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

    const formik = useFormik({
        initialValues: {
            fname: currentUser.fname,
            lname: currentUser.lname,
            email: currentUser.email,
            phone: currentUser.phone,
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email").required("Must enter email"),
            fname: yup.string().required("Must enter a first name").max(15, 'must be 15 chars max'),
            lname: yup.string().required("Must enter a  last name").max(15, 'must be 15 chars max'),
            phone: yup.number().integer().required("phone number required").typeError("Phone number should only contain digits"),
            password: yup.string().required("please enter a password"),
        }),
        onSubmit: values => {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values, null, 2)
            };
            fetch(`${API_URL}/users/${currentUser.id}`, requestOptions)
                .then(r => r.json())
                .then(updatedUser => setCurrentUser(updatedUser))
                .then(navigate("/account"))
        },
    });




    return (
        <div className="grid place-items-center  bg-yellow-50 ">

            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
                <h1>Edit User Account</h1>
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">first name</label>
                    <input id='fname' type="name" name="fname" placeholder="First Name" className={formField} onChange={formik.handleChange} value={formik.values.fname}
                    />
                    {formik.touched.fname && formik.errors.fname ? (
                        <div>{formik.errors.fname}</div>
                    ) : null}

                    <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">last name</label>
                    <input id='lname' type="name" name="lname" placeholder="Last Name" className={formField} onChange={formik.handleChange} value={formik.values.lname} />
                    {formik.touched.lname && formik.errors.lname ? (
                        <div>{formik.errors.lname}</div>
                    ) : null}

                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
                    <input id='phone' type="text" name="phone" placeholder="Phone Number" className={formField} onChange={formik.handleChange} value={formik.values.phone} />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div>{formik.errors.phone}</div>
                    ) : null}

                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                    <input id='email' type="text" name="email" placeholder="Email Address" className={formField} onChange={formik.handleChange} value={formik.values.email} />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}

                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                    <input id='password' type="text" name="password" placeholder="New Password" className={formField} onChange={formik.handleChange} value={formik.values.password} />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Account</button>
                </form>
            </div>
            <br/>
            <div className='pb-6'>
                <button type="submit" className="flex items-center justify-center  text-white bg-red-500 " onClick={onDeleteAccount}>Delete Account</button>
            </div>
        </div>
    )
}

export default EditUser;
