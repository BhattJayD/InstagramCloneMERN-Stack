//import { json } from "express"
import React,{useState} from "react"
import {Link,useHistory} from "react-router-dom"
import M from "materialize-css"

const Signup=()=>{
  const history=useHistory()
  const [name,setName] =useState("")
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const PostData=()=>{
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return M.toast({html: "invalid email",classes:"#b71c1c red darken-4"})
    }
    fetch("http://localhost:5000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    }).then(res=>res.json())
    .then(data=>{
      if (data.err) {
        M.toast({html: data.err,classes:"#b71c1c red darken-4"})
      }
      else{
        M.toast({html:data.message,classes:"#1b5e20 green darken-4"})
        history.push("/signin")
      }
    }).catch(err=>{
      console.log(err);
    })
  }
  return(
    <div className="mycard">
      <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input 
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
             <input 
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />

                    
            <button className="btn waves-effect waves-light #1976d2 blue darken-2"
            onClick={()=>{PostData()}} >Signup
            </button>
            <h5>
                <Link to="./Signin">Already have account?</Link>
            </h5>        
    </div>
  </div>
          
    )
}

export default Signup