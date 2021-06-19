const mongoose=require('mongoose')
 
const userSchema=new mongoose.Schema({
    googleId:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    familyName:{
        type:String,
        required:true
    },
    givenName:{
        type:String,
        required:true
    },
    email:{
    type:String,
    required:true
    },
    picture:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('User',userSchema)