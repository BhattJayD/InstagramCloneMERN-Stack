import React ,{useState,useEffect} from "react"
import {useHistory} from "react-router-dom"
import M from "materialize-css"
const CreatePost=()=>{
    const history=useHistory()
    const [title,SetTitle]=useState("")
    const [body,SetBody]=useState("")
    const [image,SetImage]=useState("")
    const [url,SetUrl]=useState("")
    useEffect(()=>{
      if (url) {
        fetch("/createpost",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        title,
        body,
        photo:url
      })
    }).then(res=>res.json())
    .then(data=>{
      if (data.err) {
        M.toast({html: data.err,classes:"#b71c1c red darken-4"})
      }
      else{
        M.toast({html:"Post Uoload Successfull!",classes:"#1b5e20 green darken-4"})
        history.push("/")
      }
    }).catch(err=>{
      console.log(err);
    })
    }
    },[url])

    const postDetails=()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","Insta-clone")
        data.append("cloud_name","splitsplit")
        fetch("https://api.cloudinary.com/v1_1/splitsplit/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
          console.log(data.secure_url);
            SetUrl(data.secure_url)
            
        }).catch(error=>{console.log(error)})
        console.log(url);
        
    }

    return(
        <div className="card input-filed"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
          }}>
            <input 
            type="text"
             placeholder="TITLE"
             value={title}
             onChange={(e)=>SetTitle(e.target.value)} />
            <input 
            type="text"
            placeholder="BODY"
            value={body}
            onChange={(e=>SetBody(e.target.value))} 
             />

                <div className="file-field input-field">
            <div className="btn  #1976d2 blue darken-2">
            <span>Upload Image</span>
            <input type="file"
            onChange={(e)=>SetImage(e.target.files[0])}
            />
            </div>
            <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
            </div>
        </div>
        <button className="btn waves-effect waves-light #1976d2 blue darken-2" onClick={()=>postDetails()} >Submit
        </button>
        </div>
        
    )
}
export default CreatePost;