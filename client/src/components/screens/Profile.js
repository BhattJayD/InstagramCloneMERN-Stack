import React,{useEffect,useState,useContext} from "react"
import {UserContext} from "../../App"


const Profile=()=>{
    const[mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext) 
    //console.log("state",state);
    const getProfile=async()=>{
        const url="http://localhost:5000/myposts"
        const response =await fetch(url,{
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.myposts)
        })
    }
    
    useEffect(()=>{
        getProfile()        
    },[])
    return(
       <div>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px  solid grey"
           }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    />
               </div>
               <div>
                   <h4>{state?state.name:"Split unknown"}</h4>
                   <div style={{display:"inline-block"}} >
                   <h6>40 Post </h6>
                   <h6> 40 Followers </h6>
                   <h6> 40 Following </h6>
                   </div>
               </div>
           
           </div>
        
        <div className="gallery">
            {
                mypics.map(item=>{
                    return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title} />
                    )
                })
            } 
        </div>
        </div>
    )
}

export default Profile