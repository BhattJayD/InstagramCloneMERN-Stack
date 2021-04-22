const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config/keys")
const mongoose=require("mongoose");
const User=mongoose.model("User")

module.exports=(req,res,next)=>{
    const{authorization}=req.headers;           //getting authendication token
     
    if(!authorization){                         //if token not present then user is not logged in
        return res.status(401).json({err:"You Mustbe Logged in!"})
    }
    
    const token=authorization.replace("bearer ","")     
    
    jwt.verify(token,JWT_SECRET,(err,payload)=>{    //verifying token
        
        if(err){
            
            return res.status(401).json({err:"You Mustbe Logged in!"})
        }
        const{_id}=payload                      //new login then modify token
        User.findById(_id).then(userData=>{
            req.user=userData
            next()
        })
        
    })

}