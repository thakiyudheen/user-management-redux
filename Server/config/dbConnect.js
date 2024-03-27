
// const dbConnect = ()=>{
//     try{
//         mongoose.connect(process.env.MONGOURL)
//         console.log("Database connected successfully");
//     }catch(err){
//         console.log("Can't connect to database");
//     }
// }
const mongoose = require('mongoose');

const dbConnect=()=>{
    console.log('this is okey',process.env.MONGOURL);
    mongoose.connect(process.env.MONGOURL,{useNewUrlParser:true,useUnifiedTopology:true })
    .then(()=>{
       console.log("Mongo connected succesfully");
    })
    .catch((err)=>{
       console.log("not connected",err);
    })
}
module.exports = dbConnect