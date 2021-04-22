const { Router } = require("express");
const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const requireLogin=require("../middleWare/requiredLogin");
const route = require("./auth");
const Post=mongoose.model("Post")



route.get("/allpost",requireLogin,(req,res)=>{
    Post.find().populate("postedBy","name")         ///populated(expanding) postedby with name
    .populate("comments.postedBy","_id name")
    .sort("-createdAt")
    .then(posts=>{
        res.json({posts})                           //showing all posts
    }).catch(err=>{
        console.log(err);
    })
})

router.post("/createpost",requireLogin,(req,res)=>{
    const {title,body,photo}=req.body
    console.log(req.body);
    if (!title||!body||!photo) {
         res.status(422).json({error:"Please add all the fields"})
    }
    //req.user.password=undefined
    const post=new Post({
        title,
        body,
        photo,
        postedBy:req.user
    })
    
    post.save().then(result=>{
        res.json({post:result})
    }).catch(err=>{
        console.log(err);
    })
})  

route.get("/myposts",requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})                 //finding all post of user with current id
    .populate("postedBy","name")
    .sort("-createdAt")
    .then(myposts=>{
        res.json({myposts})
    }).catch(err=>{
        console.log(err);
    })  

})

router.put("/like",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if (err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put("/unlike",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if (err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put("/comment",requireLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","name")
    .populate("postedBy","_id name")
    
    .populate("comments.id","text")
    .exec((err,result)=>{
        if (err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.put("/likeComment",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likeby:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","name")
    .populate("postedBy","_id name")
    .populate("comments.id","text")
    .exec((err,result)=>{
        if (err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put("/unlikecomment",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likeby:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if (err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete("/deletepost/:postId",requireLogin,(req,res)=>{
   // console.log(req);
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if (err || !post) {
            return res.status(422).json({error:err})            
        }
        if (post.postedBy._id.toString() === req.user._id.toString()) {
            post.remove()
            .then(result=>{
                res.json(result,"result")
            }).catch(err=>console.log(err))
        }
    })
})

module.exports=router