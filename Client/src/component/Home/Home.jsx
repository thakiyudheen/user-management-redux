import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';

function Home() {
    const navigator = useNavigate();
    const userData=useSelector((state)=>state.user.userData)

    return (
        <div className="flex flex-col items-center justify-center h-screen">
           <h1 className="text-4xl font-bold text-center">Welcome to {userData.name}</h1>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => navigator('/login')}>
                Click
            </button>
        </div>
    );
}

export default Home;