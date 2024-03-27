var express = require('express');
const Authentication = require('../Controller/Authentication');
var router = express.Router();
const upload =require('../middleware/multer');
const adminController = require('../Controller/adminController');


// /post signup ----------------------------------
router.post('/signup',Authentication.postSignup)
// post login ------------------------------------
router.post('/login',Authentication.PostLogin)
// get Data --------------------------------------
router.get('/getData',Authentication.getData)
// edit the name ---------------------------------
router.post('/EditName',Authentication.PostEditname)
// edit  password---------------------------------
router.post('/EditPassword',Authentication.PostEditPassword)
// logout ----------------------------------------
router.get('/logout',Authentication.Logout)
// upload image ---------------------------------
// const uploadprofile =[ { name: "profile", maxCount: 1 }]
router.post('/upload-profile',upload.single('profile'),Authentication.PostUpload)

// get user --------------------------------------
router.get('/getUser',Authentication.getuser)



module.exports = router;
