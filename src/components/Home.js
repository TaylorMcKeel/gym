import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Home = ()=>{
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState({})
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  useEffect(()=>{
//To-Do: find out how to login and get user after logging in... where does userID live
    const getUser = async()=>{
      axios.get('/api/user')
        .then(res=> setUser(res.data[0]))
    }

    getUser()
  },[])

  const userLogin = ()=>{

  }
//To-Do: fix the routes for where the workouts and exercises for a user live.
  const navigateWorkouts =()=>{
    navigate(`/workouts/`)
  }

  const navigateExercises =()=>{
    navigate(`/exercises/`)
  }

  if(!isLoggedIn){
    return(
      <div>
        <h1>Welcome Please Login</h1>
        <form>
          <label for="username" >Username:</label>
          <input  type="text" id='username' name='username' onChange={(ev)=>{setUsername(ev.target.value)}}/>
          <label for="password" >Password:</label>
          <input  type="text" id='password' name='password' onChange={(ev)=>{setPassword(ev.target.value)}}/>
        </form> 
        <button onClick={userLogin}>Login</button>
      </div>
    )
  }else{
    return(
      <div>
        <h1>Welcome Back {user.firstName}</h1>
        <p><button onClick ={navigateWorkouts}>My Workouts</button></p>
        <p><button onClick ={navigateExercises}>My Exercises</button></p>
      </div>
    )
  }
}

export default Home;