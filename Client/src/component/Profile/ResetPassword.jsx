import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../../Axios/axios';
import { useDispatch,useSelector } from 'react-redux';
import { setUserData } from '../../redux/Features/userSlice';


function Editresetmodel({ isOpen, onClose }) {
    const [err,setErr]=useState('')
    const userData=useSelector(state=>state.user.userData)
    const dispatch=useDispatch()
    const validationSchema = Yup.object({
        oldPassword: Yup.string().required('Old Password is required'),
        newPassword: Yup.string()
            .required('New Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit =(values) => {
        // Handle form submission
        console.log('Form values:', values);
        axios.post('/EditPassword',values).then(async (data)=>{
            if(data.data.err){
                
                 setErr(data.data.err.msg)
            }else{
                const user=await axios.get('/getData')
                console.log('Response from server np', user);
                dispatch(setUserData(user.data));
                onClose()
            }
           
        })
        
    };

    return (
        <div className={isOpen ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg shadow-lg p-6 z-50" : "hidden"}>
            <div className="relative p-4 w-full max-w-lg max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit Profile
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 md:w-8 md:h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                            <svg className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <Formik
                            initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form className="space-y-4">
                                <div>
                                    <p className="text-red-600">{err}</p>
                                    <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                                    <Field
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        className="w-280 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                    <ErrorMessage name="oldPassword" component="small" className="text-red-600" />
                                </div>
                                <div className="w-300">
                                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <Field
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        className="w-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                    <ErrorMessage name="newPassword" component="small" className="text-red-600" />
                                </div>
                                <div className="w-300">
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="w-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                    <ErrorMessage name="confirmPassword" component="small" className="text-red-600" />
                                </div>
                                <button type="submit" className="w-187 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editresetmodel;
