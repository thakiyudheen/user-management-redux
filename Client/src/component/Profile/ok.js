// import React, { useRef, useState } from 'react';
// import { useDispatch,useSelector } from 'react-redux';
// import EditProfileModal from './EditProfile';
// import Editresetmodal from './ResetPassword';
// import { BiSolidEdit } from "react-icons/bi";
// import axios from '../../../Axios/axios';
// import { setUserData } from '../../redux/Features/userSlice';
// import { BaseURL } from '../../../Constand/Constant';


// function Profile() {
//     const userData = useSelector((state) => state.user.userData);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const refclick=useRef()
//     const dispatch=useDispatch()

//     const handleEditProfile = () => {
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     const openEditModal = () => {
//         setIsEditModalOpen(true);
//     };

//     const closeEditModal = () => {
//         setIsEditModalOpen(false);
//     };
//     const handleClick=()=>{
//         refclick.current.click()
//     }
//     const handleFileUpload=async(event)=>{
//         console.log('this is image');
//         const file = event.target.files[0]; 
//         // console.log('this is image',file);
//          try {
//             const formData = new FormData();
//             formData.append("profile", file);
//             const res = await axios.post('/upload-profile',formData, {
//                 headers: {
//                   "Content-Type": "multipart/form-data",
//                 },
//             })
//             if(res){
               
//                 dispatch(setUserData(res.data.user));
//             }
//         }catch(err){
//             console.log(err);
//         }
//     }
       
    
//     return (
//         <div className="bg-gray-200 relative shadow-lg rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto mt-28 p-8">
//             <div className="flex justify-center">
//                 <img src={`${BaseURL}/profile-image/${userData.profile}`}  className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
//                 <BiSolidEdit onClick={handleClick}
//                     style={{ fontSize: '18px', top: '25px', left: '370px' }}
//                     className="text-black inline absolute"
//                     />

//                     <input
//                     type="file"
//                     name="profile"
//                     ref={refclick}
//                     className="hidden"
//                     onChange={handleFileUpload}
//                     />

//             </div>

//             <div className="mt-16 flex justify-center">
//                 <h1 className="font-bold text-center text-3xl text-gray-900">{userData.name}</h1>
//             </div>
//             <div className="flex justify-center">
//                 <p className="text-center text-sm text-gray-400 font-medium">{userData.email}</p>
//             </div>
//             <div className="flex justify-center my-5 px-6">
//                 <a href="#" onClick={handleEditProfile} className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white mr-3">Edit Profile</a>
//                 <EditProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />
//                 <button onClick={openEditModal} className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Reset Password</button>
//                 <Editresetmodal isOpen={isEditModalOpen} onClose={closeEditModal} />
//             </div>
//         </div>
//     );
// }

// export default Profile;



// import React, { useRef, useState } from 'react';
// import { useDispatch,useSelector } from 'react-redux';
// import EditProfileModal from './EditProfile';
// import Editresetmodal from './ResetPassword';
// import { BiSolidEdit } from "react-icons/bi";
// import axios from '../../../Axios/axios';
// import { setUserData } from '../../redux/Features/userSlice';
// import { BaseURL } from '../../../Constand/Constant';


// function Profile() {
//     const userData = useSelector((state) => state.user.userData);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const refclick=useRef()
//     const dispatch=useDispatch()

//     const handleEditProfile = () => {
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     const openEditModal = () => {
//         setIsEditModalOpen(true);
//     };

//     const closeEditModal = () => {
//         setIsEditModalOpen(false);
//     };
//     const handleClick=()=>{
//         refclick.current.click()
//     }
//     const handleFileUpload=async(event)=>{
//         const file = event.target.files[0];
//       console.log("Selected file:", file);
//       try {
//           const formData = new FormData();
//           formData.append("profile", file);
//           const response = await axios.post('/upload-profile',formData, {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//           })
//             if(res){
               
//                 dispatch(setUserData(res.data.user));
//             }
//         }catch(err){
//             console.log(err);
//         }
//     }
       
    
//     return (
//         <div className="bg-gray-200 relative shadow-lg rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto mt-28 p-8">
//             <div className="flex justify-center">
//                 <img src={`${BaseURL}/profile-image/${userData.profile}`}  />
//                 <BiSolidEdit onClick={handleClick}
//                     style={{ fontSize: '18px', top: '25px', left: '370px' }}
//                     className="text-black inline absolute"
//                     />

//                     <input
//                     type="file"
//                     name="profile"
//                     ref={refclick}
//                     className="hidden"
//                     onChange={handleFileUpload}
//                     />

//             </div>

//             <div className="mt-16 flex justify-center">
//                 <h1 className="font-bold text-center text-3xl text-gray-900">{userData.name}</h1>
//             </div>
//             <div className="flex justify-center">
//                 <p className="text-center text-sm text-gray-400 font-medium">{userData.email}</p>
//             </div>
//             <div className="flex justify-center my-5 px-6">
//                 <a href="#" onClick={handleEditProfile} className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white mr-3">Edit Profile</a>
//                 <EditProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />
//                 <button onClick={openEditModal} className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Reset Password</button>
//                 <Editresetmodal isOpen={isEditModalOpen} onClose={closeEditModal} />
//             </div>
//         </div>
//     );
// }

// export default Profile;


<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            
        </tbody>
    </table>
</div>
