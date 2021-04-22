import React,{useState,useContext} from "react"
import {Link,useHistory} from "react-router-dom"
import M from "materialize-css"
import {UserContext} from "../../App"
//import {PORT} from "../../../../app"
const Signin=()=>{
  const {state,dispatch}= useContext(UserContext)
  const history=useHistory()
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const PostData=()=>{
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return M.toast({html: "invalid email",classes:"#b71c1c red darken-4"})
    }
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      if (data.err) {
        M.toast({html: data.err,classes:"#b71c1c red darken-4"})
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html:"Signin Successfull!",classes:"#1b5e20 green darken-4"})
        history.push("/")
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
            onClick={()=>PostData()} >Login
            </button>
                    
            <h5>
                <Link to="./Signup">Don't have an account?</Link>
            </h5> 
    </div>
  </div>
          
    )
}

export default Signin