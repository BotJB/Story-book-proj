const mongoose=require('mongoose')
 
const storySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    body:{
        type:String,
        required:true
    },
    status:{
        type:String,
        deault:'public',
        enum:['public','private']
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('Story',storySchema)