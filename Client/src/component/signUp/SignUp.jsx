
import React,{useState} from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import validationSchema from './validationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { PostSignup } from "../../Route/UserRoute";
import axios from '../../../Axios/axios';





function SignUp() {
  const navigator = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile:"istockphoto-1495088043-612x612.jpg"
  };
  // const handleSignup = (res) => {
  //   console.log('this is the err',res)
    
  //   if(res.data.error){
  //     setErrorMessage(!errorMessage)
  //   }else{
  //     navigator('/login')
  //   }
  // };
  const handleSubmit = (values) => {
    console.log("this is the values", values);
    // PostSignup(values,handleSignup)
    axios.post('/signup', values)
    .then((res) => {
        console.log('Response from server:', res);
        // handleSignup(response); 
        if(res.data.error){
          setErrorMessage(!errorMessage)
        }else{
          navigator('/login')
        }
    })
    .catch((err) => {
        console.log(err.message); 
    });
    
  };
 
  return (
    <div className="container sign-up-mode">
      <div className="forms-container">
        <div className="signin-signup">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <br />
              {errorMessage && <div className="error-message" style={{color:'red',fontSize: "14px" }}>User Already exist</div>} {/* Render error message */}
              <div className="input-field">
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  style={{ fontSize: "14px" }}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div className="input-field">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  style={{ fontSize: "14px" }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error"
                  style={{ fontSize: "12px" }}
                />
              </div>

              <div className="input-field">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={{ fontSize: "14px" }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div className="input-field">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  style={{ fontSize: "14px" }}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <button type="submit" className="btn">
                Sign up
              </button>
             
            </Form>
          </Formik>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              "Secure login page for accessing your account with enhanced
              features."
            </p>
            <button
              className="btn transparent"
              onClick={() => navigator("/login")}
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
