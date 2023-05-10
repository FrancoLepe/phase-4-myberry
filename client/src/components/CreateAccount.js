import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import API_URL from "../apiConfig.js";
import NavBar from "./NavBar.js";
import { useFormik } from "formik";
import * as yup from "yup";


function CreateAccount({ currentUser, onLogout, onCreateAccount }) {

    const formField = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"


    const [users,setUsers] = useState([{}])
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        console.log("FETCH! ");
        fetch("/users")
          .then((res) => res.json())
          .then((data) => {
            setUsers(data);
            console.log(data);
          });
      }, [refreshPage]);

    // const [newFirstName, setNewFirstName] = useState('')
    // const [newLastName, setNewLastName] = useState('')
    // const [newEmail, setNewEmail] = useState('')
    // const [newPhone, setNewPhone] = useState('')
    // const [newPassword, setNewPassword] = useState('')

    // const handleFirstName = e => setNewFirstName(e.target.value)
    // const handleLastName = e => setNewLastName(e.target.value)
    // const handleEmail = e => setNewEmail(e.target.value)
    // const handlePhone = e => setNewPhone(e.target.value)
    // const handlePassword = e => setNewPassword(e.target.value)
    // const history = useHistory();

    
    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        fname: yup.string().required("Must enter a first name").max(15),
        lname: yup.string().required("Must enter a  last name").max(15),
        phone: yup.number().integer().required("phone number required").typeError("Please enter an valid phone number").max(10),
        password:yup.string().required("please enter a password")
      });

      const formik = useFormik({
        initialValues: {
          fname: "",
          lname: "",
          email: "",
          phone: "",
          password:""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then((res) => {
            if (res.status == 200) {
              setRefreshPage(!refreshPage);
            }
          });
        },
      });


    // function handleCreateAccountSubmit(e) {
    //     e.preventDefault();

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             fname: newFirstName,
    //             lname: newLastName,
    //             email: newEmail,
    //             phone: newPhone,
    //             password: newPassword
    //         })
    //     };
    //     fetch('/users', requestOptions)
    //         history.push("/login")
    // }

    // function handleLogout() {
    //     fetch("/logout", {
    //         method: "DELETE",
    //     }).then(() => onLogout());
    // }

    return (
        <div className ='flex justify-center items-center'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h1>Create New Account</h1>
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">first name</label>
                <input type="name" name="fname" placeholder="First Name" className={formField} onChange={formik.handleChange} value={formik.values.fname}
/>

                <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">last name</label>
                <input type="name" name="lname" placeholder="Last Name" className={formField} onChange={formik.handleChange} value={formik.values.lname}/>

                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
                <input type="text" name="phone" placeholder="Phone Number" className={formField} onChange={formik.handleChange} value={formik.values.phone} />

                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                <input type="text" name="email" placeholder="Email Address" className={formField} onChange={formik.handleChange} value={formik.values.email} />

                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                <input type="text" name="password" placeholder="New Password" className={formField} onChange={formik.handleChange} value={formik.values.password} />

                {/* <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">confirm password</label>
                <input type="text" name="confirmpassword" className={formField} placeholder="Confirm Password" /> */}

                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>

            </form>
            </div>
        </div>
    )
}


export default CreateAccount;

