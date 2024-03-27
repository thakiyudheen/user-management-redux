import React, { useState } from 'react';
import { EditName, fetchData } from '../../Route/UserRoute';
import { useDispatch,useSelector } from 'react-redux';
import { setUserData } from '../../redux/Features/userSlice';
import axios from '../../../Axios/axios';


function   EditUserName({ isOpen, onClose ,user,fetchUser}) {
    // console.log('nmme aupdate',user);
    // const name=user.user
    // console.log(name);
    const [username, setUsername] = useState(user.name);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
   
    const handleSubmit = (e) => {
        e.preventDefault();  
       
        
        axios.post('admin/EditName',{name:username,id:user.id}).then(async(response) => {
           
            fetchUser()
            onClose();
           
        }).catch((err)=>{
       
        console.log(err.messa);
    });
       
       
       
    };

    return (
      
        <div className={isOpen ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg  p-6 z-50" : "hidden"}>
            <div className="relative p-4 w-full  max-w-lg max-h-full">
                <div className="relative  rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit User
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 md:w-8 md:h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                            <svg className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your username" required />
                            </div>
                            <button type="submit"  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUserName;
