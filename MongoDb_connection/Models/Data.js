 const mongoose = require('mongoose');

 const Schema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
       type:String,
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    gender:{
      type:String
    },
    jobTitle:{
        type: String
    } 
 },
 {timestamps :true})

 const User = mongoose.model('User',Schema)
  module.exports = User;