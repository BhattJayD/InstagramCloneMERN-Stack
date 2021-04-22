const express=require("express");
const app=express();
const mongoose=require("mongoose");

const cors = require('cors')

app.use(cors())
const PORT=process.env.PORT ||5000



const db=require("./config/keys").MONGOURI;                    //getting MONGOURI URL OF MONGODB form keys.js
//conneect to mongodb
mongoose
    .connect(db,{useNewUrlParser:true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: false})
    .then(()=> console.log("DB Connected"))
    .catch(err=>console.log(err))                       //connect to db

    require("./models/user")                            //using models user
    require("./models/post")                            //using model post
    app.use(express.json())                             //passing json request 
    app.use(require("./Routes/auth"))                   //authendicating
    app.use(require("./Routes/post"))
    
    //if we are on production
    if(process.env.NODE_ENV=="production"){
        app.use(express.static('client/build'))                         //js and css all file use 
        const path=require("path")
        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(__dirname,"client","build","index.html"))
        })
    }
    
    
    app.listen(PORT,()=>{                                   //starting server
    console.log("SERVER STARTED On http://localhost:"+PORT);
})
