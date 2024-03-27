import axios from '../../../Axios/axios';
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddModal({ isOpen, onClose,fetchuser }) {
    // Define validation schema using Yup
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });
    const [err,setErrorMessage]=useState(false)

    // Initial values
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        profile:'istockphoto-1495088043-612x612.jpg',
    };

    const handleSubmit = (values) => {
        console.log(values);
        axios.post('/signup', values)
        .then((res) => {
            console.log('Response from server:', res);
           
            if(res.data.error){
              setErrorMessage(!err)
            }else{
                onClose();
                fetchuser()
              
            }
        })
        .catch((err) => {
            console.log(err.message); 
        });
    };

    return (
        <div
            id="another-modal"
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
                isOpen ? '' : 'hidden'
            }`}
            onClick={(e) => {
                if (e.target.id === 'another-modal') {
                    onClose();
                }
            }}
        >
            <div className="relative p-8 w-full max-w-xl max-h-full overflow-y-auto bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between pb-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-900">Add User</h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                <div className="p-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="space-y-5">
                            {err&&<small className='text-red-500'>user already exist</small>}
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                                    Username
                                </label>
                                <Field
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-input border border-gray-300 px-4 py-2 rounded-lg w-[300px]"
                                    placeholder="Enter username"
                                />
                                <ErrorMessage name="username" component="small" className="text-red-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                    Your email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input border border-gray-300 px-4 py-2 rounded-lg w-[300px]"
                                    placeholder="name@company.com"
                                />
                                <ErrorMessage name="email" component="small" className="text-red-500" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Your password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input border border-gray-300 px-4 py-2 rounded-lg w-[300px]"
                                    placeholder="Enter password"
                                />
                                <ErrorMessage name="password" component="small" className="text-red-500" />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Confirm password
                                </label>
                                <Field
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-input border border-gray-300 px-4 py-2 rounded-lg w-[300px]"
                                    placeholder="Confirm password"
                                />
                                <ErrorMessage name="confirmPassword" component="small" className="text-red-500" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[blue] hover:bg-blue-800 text-white font-medium rounded-lg px-4 py-2.5 visible" // Add 'visible' class here
                            >
                                Submit
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default AddModal;
