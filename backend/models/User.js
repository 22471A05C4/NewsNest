// const mongoose=require('mongoose');
// const userSchema=new mongoose.Schema({
//     name:String,
//     email:String,
//     dob:String,
//     residentialAddress:String,
//     permanentAddress:String,
//     filePath:String
// })

// module.exports=mongoose.model('User',userSchema)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    confirmPassword: String,
    filePath: String
});

module.exports = mongoose.model('User', userSchema);