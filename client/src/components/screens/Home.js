import React,{useState,useEffect,useContext} from "react"
import {UserContext} from "../../App"
import {Link} from 'react-router-dom'

const Home=()=>{
    const[data,setData] = useState([])
    const{state,dispach}=useContext(UserContext)
    const  dataFea=async()=>      {
        //const url="https://api.github.com/users/deekshasharma";
        const url="http://localhost:5000/allpost";
        const response=await fetch(url,{
                    headers:{
                        "Authorization":"bearer "+localStorage.getItem("jwt")
                    }
                
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
            // console.log(result,"result");
        })
        
        
    }

    useEffect(()=>{
        dataFea()
     },[])

    const likePost=(id)=>{
        fetch("http://localhost:5000/like",{
            method:"put",
            headers:{
            "Authorization":"bearer "+localStorage.getItem("jwt"),
            "Content-Type":"Application/json"
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
             //   console.log(result)
             const newData=data.map(item=>{
                if (item._id==result._id) {
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err);
        })
    }
    const unlikePost=(id)=>{
        fetch("http://localhost:5000/unlike",{
            method:"put",
            headers:{
            "Authorization":"bearer "+localStorage.getItem("jwt"),
            "Content-Type":"Application/json"
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
         //   console.log(result)
            const newData=data.map(item=>{
                if (item._id==result._id) {
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err);
        })
    }
    const makeComment=(text,postId)=>{
        fetch("http://localhost:5000/comment",{
            method:"put",
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt"),
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData=data.map(item=>{
                if (item._id==result._id) {
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>console.log(err))
    }
    const deletePost=(postid)=>{
        fetch(`http://localhost:5000/deletepost/${postid}`,{
            method:"delete",
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt")
            }
            ,
            body:JSON.stringify({
                postId:postid
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result,"result");
            const newData=data.filter(item=>{
                return item._id !== result._id
            })
            console.log(newData,"newdata");
            setData(newData)
        })
    }

    return (
        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                             <h5 style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id == state._id 
                             && <i className="material-icons" style={{
                                 float:"right"
                             }} 
                             onClick={()=>deletePost(item._id)}
                             >delete</i>
 
                             }</h5>
                             <div className="card-image">
                                 <img src={item.photo}/>
                             </div>
                             <div className="card-content">
                             {item.likes.includes(state._id)
                             ? 
                              <i className="material-icons"style={{color:"red"}}
                                     onClick={()=>{unlikePost(item._id)}}
                               >favorite</i>
                             : 
                             <i className="material-icons"
                             onClick={()=>{likePost(item._id)}}
                             >favorite</i>
                             }
                             
                            
                                 <h6>{item.likes.length} likes</h6>
                                 <h6>{item.title}</h6>
                                 <p>{item.body}</p>
                                 {
                                     item.comments.map(record=>{
                                         return(
                                         <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                         
                                         )
                                     })
                                 }
                                 <form onSubmit={(e)=>{
                                     console.log(e.target[0].value);
                                     e.preventDefault()
                                     makeComment(e.target[0].value,item._id)
                                 }}>
                                   <input type="text" placeholder="add a comment" />  
                                 </form>
                                 
                             </div>
                         </div> 
                    )
                })
            }
           
           
        </div>
    )
 }
 
 
 export default Home
