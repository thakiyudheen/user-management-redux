import './App.css'
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import AdminPage from './Pages/AdminPage';
import HomePage from './Pages/HomePage';
import { useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchData } from './Route/UserRoute';
import {setUserData} from './redux/Features/userSlice'
import axios from '../Axios/axios';
import ProfilePage from './Pages/ProfilePage';


axios.defaults.withCredentials = true;

function App() {


  const dispatch=useDispatch()
  const userData = useSelector((state)=>state.user.userData)
  // console.log('user data',userData)
  
 
  useEffect(()=>{
   
   
      axios.get('/getData').then((res) => {
        console.log('Response from server home', res);
        
        if(!res.data.error){
                dispatch(setUserData(res.data));
                console.log('now the user data',userData);
              }
        
    }).catch((err)=>{
        console.log(err.messa);
    });
  },[dispatch])
 
  return (
    <>
    
          <Routes>
            <Route  path="/" element={userData?.role=='user'?<Navigate to="/home" /> : <Navigate to="/login" />} />
            <Route path="/home" element={userData && userData?.role === "user" ? <HomePage/> : <Navigate to="/login" />} />
            <Route path="/login" element={!userData?<LoginPage/>:userData?.role=='admin'?<Navigate to="/admin" />:<Navigate to="/home" />} />
            <Route  path="/admin" element={userData?.role=='admin'?<AdminPage/>:<Navigate to="/login" />} />
            <Route  path="/signup" element={!userData?<SignUpPage/>:<Navigate to="/home" /> } />
            <Route  path="/profile" element={userData?.role=='user'?<ProfilePage/>:<Navigate to="/login" /> } />
          </Routes>
    </>
       
  )
}

export default App
