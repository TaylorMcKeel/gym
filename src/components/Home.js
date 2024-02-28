import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Home = ()=>{
  const navigate = useNavigate()
  const initialHomeData = {
    isLoggedIn: true,
    user: {},
    username: "",
    password: "",
  }
  const [homeData, setHomeData] = useState(initialHomeData)
 
  useEffect(()=>{
//To-Do: find out how to login and get user after logging in... where does userID live
    const getUser = async()=>{
      try {
        const res = await axios.get('/api/user/64ce31438df1e2b147f43193')
        setHomeData(homeData=>({
          ...homeData,
          user: res.data,
        }))
      } catch (err) {
        const errorMessage = `getUser :: Home.js - Error when fetching user from backend API. Error: ${err}.`
        console.log(errorMessage)
      }
    }

    getUser()
  },[])
// only have done the backend of jwt token never practiced tying it to the front so need to figure out what to do here
  const userLogin = async(email, password)=>{
    const token = await axios.post('/login', {email, password})
  }
//To-Do: fix the routes for where the workouts and exercises for a user live.
  const navigateWorkouts =()=>{
    navigate(`/workouts/`)
  }

  const navigateExercises =()=>{
    navigate(`/exercises/`)
  }
  const handleChange = (ev)=>{
    const {name, value} = ev.target
    setHomeData(homeData => ({
      ...homeData,
      [name]: value,
    }))
  }
  if(!homeData.isLoggedIn){
    return(
      <div>
        <h1>Welcome Please Login</h1>
        <form>
          <label for="username" >Username:</label>
          <input  type="text" id='username' name='username' onChange={handleChange}/>
          <label for="password" >Password:</label>
          <input  type="text" id='password' name='password' onChange={handleChange}/>
        </form> 
        <button onClick={userLogin}>Login</button>
      </div>
    )
  }else if(homeData.user){
    return(
      <div>
        <h1>Welcome Back {homeData.user.firstName}</h1>
        <p><button onClick ={navigateWorkouts}>My Workouts</button></p>
        <p><button onClick ={navigateExercises}>My Exercises</button></p>
      </div>
    )
  }
}

export default Home;