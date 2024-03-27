import axios from "axios";

// User signup
export const PostSignup = (values, handleSignup) => {
    console.log('now it works');
    axios.post('http://localhost:3000/signup', values)
        .then((response) => {
            console.log('Response from server:', response);
            handleSignup(response); 
        })
        .catch((err) => {
            console.log(err.message); 
        });
};


// user login --------------------------------------------------------
export const PostLogin = (values,hadleerr) => {
    console.log('now it work');
    axios.post('http://localhost:3000/login',values).then((response) => {
        console.log('Response from server login:', response);
        hadleerr(response)
        
    }).catch((err)=>{
        console.log(err.messa);
    });
};

// fetch user data ----------------------------------------------------
export const fetchData = (handleData) => {
    console.log('now it work');
    axios.get('http://localhost:3000/getData').then((response) => {
        console.log('Response from server home', response);
        handleData(response)
        
    }).catch((err)=>{
        console.log(err.messa);
    });
};
// Edit name ----------------------------------------------------
export const EditName= (values,handleData) => {
    console.log('now it work');
    axios.post('http://localhost:3000/EditName',values).then((response) => {
        console.log('Response from server np', response);
        handleData()
        
    }).catch((err)=>{
        console.log(err.messa);
    });
};
// logout ----------------------------------------------------
export const logout= (handleData) => {
    console.log('now it work');
    axios.get('http://localhost:3000/logout').then((response) => {
        console.log('Response from server no', response);
        handleData(response)
        
    }).catch((err)=>{
        console.log(err.messa);
    });
};

