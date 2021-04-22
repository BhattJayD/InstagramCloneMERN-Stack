const express=require("express");
const route=express.Router();
const mongoose=require("mongoose");
const User=mongoose.model("User")
const bcrypt=require("bcryptjs");
//const { json } = require("express");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config/keys");
const requireLogin=require("../middleWare/requiredLogin")


//signup
route.post("/signup",(req,res)=>{
    const{name,email,password}=req.body;                                    //getting name email and passwords 
    if(!email || !password || !name){                                       //if one of this is not present then change status code to 422 which is server get requst but unable to understand
       return res.status(422).json({err:"please insert all elements"})
    }
    User.findOne({email:email})                                             //finding email
    .then((savedUser)=>{
        if(savedUser){                                                      //if user already exist
           return res.status(422).json({err:"User already exist!"})
        }
        bcrypt.hash(password,12)                                            //for storing hash of password
        .then(hashedPassword=>{
            const user=new User({
                email,
                name,
                password:hashedPassword
            })
            user.save()                                                     //saving it to db
            .then(user=>{
                res.json({message:"SignUp Successfull"})
            })
            .catch(err=>{
                console.log(err);
            })
        })
        
    })
    .catch(err=>{
        console.log(err);
    })
})

//signin
route.post("/signin",(req,res)=>{
    const{email,password}=req.body;                                 //getting name email and passwords 
    if(!email||!password){                                          //if email or password didnt entered
        return res.status(422).json({err:"please enter valide id and password"}) 
    }
    User.findOne({email:email})                                     //finding email form database
    .then(savedUser=>{
        if (!savedUser) {                       
            return res.status(422).json({err:"invalide username or password"})      //user doesnt exist
        }
        bcrypt.compare(password,savedUser.password)                 //comparing hash password with currentpassword's hash
        .then(passwordMatch=>{
            if (passwordMatch) {                                    //password match
                //res.json({message:"Successfully SignedIn!"})
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET);   //genrating token
                const {_id,name,email}=savedUser
                res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(401).json({err:"invalide username or password"})  //worng password
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
})
module.exports=route;