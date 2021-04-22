//import logo from './logo.svg';
import './App.css';
import React,{useEffect,createContext,useReducer, useContext} from "react"
import NavBar from "./components/NavBar"
import {BrowserRouter,Route,Switch,useHistory} from "react-router-dom"
import Home from "./components/screens/Home"
import Signin from "./components/screens/Signin"
import Profile from "./components/screens/Profile"
import Signup from "./components/screens/Signup"
import CreatePost from "./components/screens/CreatePost"
import {recucer,initialState} from "./reducers/userReducer"

export const UserContext = createContext()

const Routing=()=>{
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const u=localStorage.getItem("user")
    const user = JSON.parse(u)
    //console.log(user);
    if (user) {
      dispatch({type:"USER",payload:user})
      //history.push("/")
    }else{
      history.push("/signin")
    }
  },[])
  return(
      <Switch>
          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="/signup">
            <Signup/>
          </Route>

          <Route path="/signin">
            <Signin/>
          </Route>

          <Route path="/profile">
            <Profile/>
          </Route>

          <Route path="/create">
            <CreatePost/>
          </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(recucer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
