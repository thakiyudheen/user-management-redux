import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { PostLogin, fetchData} from '../../Route/UserRoute';
import { setUserData } from '../../redux/Features/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import axios from '../../../Axios/axios';


function Login() {
  const navigator = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const dispatch=useDispatch()
 

  
  const handleErr=(res)=>{
    if(res.data.error){
      setError(!error)
      setErrorMessage(res.data.error.message)
    }else{
      fetchData(setData)
      
    }
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    const user={
      email,
      password
    }
  
   
    const data=await axios.post('/login', user)
    console.log('this is okk',data.data);
    if(data.data.success){
    const users= await axios.get('/getData')
    console.log('okkkk',users)
    dispatch(setUserData(users.data));
     navigator('/')
    }else{
      setError(!error)
      setErrorMessage(data.data.err)
    }
              
       
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign in</h2>
            {error && <div className="error-message" style={{color:'red',fontSize: "14px" }}>{errorMessage}</div>} {/* Render error message */}
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
        </div>
      </div>

      <div className="panels-container1">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>"Create your account and access exclusive features instantly."</p>
            <button
              className="btn transparent"
              onClick={() => navigator('/signup')}
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
