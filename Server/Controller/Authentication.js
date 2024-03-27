const User=require('../Models/userModel')
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose')

module.exports={
  postSignup: async (req, res) => {
    try {
        console.log('this is the post', req.body);
        const { username, email, password,profile } = req.body;

        const exist = await User.findOne({ email: email });
        if (exist) {
            return res.json({ error: { message: 'User already exists'} });
        }

        console.log('password');
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('hashedPassword:', hashedPassword);

        const user = await User.create({ name: username, email, password: hashedPassword, role: 'user',profile });

        const JWT_CODE = process.env.jwt_secret;
        const token = jwt.sign({ user: user._id }, JWT_CODE);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        });

        return res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
  },


  // when the user login-----------------------------------------------
  PostLogin: async (req, res) => {
    console.log('login reached',req.body);
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      console.log('user her',user);
      if (!user) {
        console.log('usrnot funt');
        return res.json({err:'user not found'});
      }
      const Check = await bcrypt.compare(password, user.password); 
      console.log( 'this is check',Check);
  
      if (!Check) {
        return res.json({err: "wrong password" });
      } else {
        const JWT_CODE = process.env.jwt_secret;
        console.log('passcode',JWT_CODE);
        console.log('Before token creation');
        const token = jwt.sign(
            { user: user._id },
            JWT_CODE,
            { expiresIn: '30d' }
        );
        console.log('Before token creation',token);
        res.cookie('token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      }).json({ success: true });
      
      
      }
    } catch (err) {
      console.log(err);
    }
  },

  // get data --------------------------------------------------
  getData: async (req, res) => {
    try {
        console.log('reached to get');
        const {token} = req.cookies;
        // const token = localStorage.getItem('token');
        console.log('reached to get',token);

        if (!token) {
            return res.json({ error: { msg: 'Unauthorized1' } });
        }

        try {
            const verify = jwt.verify(token, process.env.jwt_secret); 
            if (!verify) {
                return res.json({ error: { msg: 'Unauthorized2' } });
            }

            const user = await User.findById(verify.user);
            if (!user) {
                return res.json({ error: { msg: 'User not found' } });
            }
            console.log('this is org',user)
            res.json(user); 
        } catch (err) {
            console.log(err);
            return res.status(401).json({ error: { msg: 'Invalid token' } });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: { msg: 'Internal server error' } });
    }
},
//  edit Data-------------------------------------------

PostEditname:async(req,res)=>{
  try{
    console.log('this is edit ',req.body);
   
    const {token} = req.cookies;

      console.log('token');
    console.log('ysss');
    const verify =await jwt.verify(token, process.env.jwt_secret); 
   console.log(verify);
   console.log(req.body);
    const ys=await User.updateOne({id:token.user},{$set:{ name:req.body.name}})
    console.log('edit name',ys);

    res.json({success:true,name:'thakiyu'})
  }catch(err){
    console.log(err);
  }
},
PostEditPassword:async(req,res)=>{
  try{
    const {oldPassword,newPassword,confirmPassword}=req.body
    const {token} = req.cookies;
    const verify = jwt.verify(token, process.env.jwt_secret); 
    console.log(verify);
    const user = await User.findOne({_id:verify.user})
    console.log('password',user);
    console.log('this is work');
    const Check = await bcrypt.compare(oldPassword,user.password); 
    console.log('this is work',Check);
    if(!Check){
      res.json({err:{msg:'old password incorrect'}})
    }else{
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          const hashedPassword = await bcrypt.hash(newPassword, salt);
          await User.updateOne({_id:verify.user},{$set:{password:hashedPassword}})
          res.json(true)
    }
  }catch(err){
    console.log(err);
  }
}
,
// post upload -------------------------
PostUpload:async(req,res)=>{
  try{
    console.log('this is file',req.file);
    if(req?.file){
      const {token} = req.cookies;
      const verify = jwt.verify(token, process.env.jwt_secret); 
      console.log(verify);
      console.log('file',req.file.filename);
      const userId = new mongoose.Types.ObjectId(verify.user);
      const y = await User.updateOne({ _id: userId }, { $set: { profile:req.file.filename } });

      
       console.log('yy',y);
       
       const user = await User.findById(verify.user);
      console.log('upload phttp',user);
      res.json({success:true,user})
    }
  }catch(err){
   
    console.log(err);
  }
},
// get user------------------------------
getuser:async(req,res)=>{
  try{
    const user=await User.find()
    res.json({user})
  }catch(err){
    console.log(err);
  }
},
// logout -------------------------------
Logout:(req,res)=>{
  try{
    //logout
  res.clearCookie("token").send({ something: "here" });
  

  }catch(err){
    console.log(err);
  }
}

  
  
}