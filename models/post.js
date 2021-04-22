const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,ref:"User"}],
    comments:[{
        postedBy:{type:ObjectId,ref:"User"},
        text:String,
    }],
    commentLike:[{type:ObjectId,ref:"User"}],
    postedBy:{
        type:ObjectId,              //id of reffered user
        ref:"User"
    }
},{timestamps:true})

mongoose.model("Post",postSchema);