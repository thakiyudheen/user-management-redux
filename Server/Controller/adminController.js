const User=require('../Models/userModel')
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose')

module.exports={
    EditName:async(req,res)=>{
        console.log('edit uer');
        try{
            await User.updateOne({_id:req.body.id},{$set:{name:req.body.name}})
            res.json({success:true})
        }catch(err){
            console.log(err);
        }
    },
    // delete user -----------------------
    deleteUser:async(req,res)=>{
        try{
            await User.deleteOne({_id:req.body.id})
            const user=await User.find()

            res.json({success:true,user})
        }catch(err){
            console.log(err);
        }
    },
    // get search --------------------------
    
    getSearch:async(req,res)=>{
        try{
            const { search } = req.query;
            console.log('searching',search);
            let query = { role: { $ne: "admin" } };
            if (search) {
            query.name = { $regex: new RegExp(search, 'i') };
            }
            const data = await User.find(query);

            res.json({ data: data });
        }catch(err){
            console.log(err);
        }
    }
    

}