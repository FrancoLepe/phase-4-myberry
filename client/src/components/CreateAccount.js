import React from "react";
import { useNavigate } from 'react-router-dom';
import API_URL from "../apiConfig.js";
import { useFormik } from "formik";
import * as yup from "yup";


function CreateAccount() {
  const navigate = useNavigate();
  const formField = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "


  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values, null, 2)
      };
      fetch(`${API_URL}/users`, requestOptions)
        .then(navigate("/login"))
    },
  });



  return (
    <div className='flex justify-center items-center  bg-yellow-50'>
    <div  className="  max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
     <h1>Create New Account</h1>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">first name</label>
          <input id='fname' type="name" name="fname" placeholder="First Name" className={formField} onChange={formik.handleChange} value={formik.values.fname}
          />
          {formik.touched.fname && formik.errors.fname ? (
            <div>{formik.errors.fname}</div>
          ) : null}

          <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 ">last name</label>
          <input id='lname' type="name" name="lname" placeholder="Last Name" className={formField} onChange={formik.handleChange} value={formik.values.lname} />
          {formik.touched.lname && formik.errors.lname ? (
            <div>{formik.errors.lname}</div>
          ) : null}

          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">phone</label>
          <input id='phone' type="text" name="phone" placeholder="Phone Number" className={formField} onChange={formik.handleChange} value={formik.values.phone} />
          {formik.touched.phone && formik.errors.phone ? (
            <div>{formik.errors.phone}</div>
          ) : null}

          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">email</label>
          <input id='email' type="text" name="email" placeholder="Email Address" className={formField} onChange={formik.handleChange} value={formik.values.email} />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">password</label>
          <input id='password' type="password" name="password" placeholder="New Password" className={formField} onChange={formik.handleChange} value={formik.values.password} />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          {/* <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">confirm password</label>
                <input type="text" name="confirmpassword" className={formField} placeholder="Confirm Password" /> */}

          <button type="submit" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create Account</button>

        </form>
      </div>
    </div>
  )
}


export default CreateAccount;

