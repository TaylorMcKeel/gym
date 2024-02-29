import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
// const jwt = require('jsonwebtoken')



const Home = ()=>{
  const navigate = useNavigate()
  const initialHomeData = {
    isLoggedIn: false,
    user: {},
    email: "",
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
//I got the token back and got the login route to work. Im not sure how I would use verify here. But what im reading is to use jwt decode to get the userid out of the token since I dont see it in the token object
  const userLogin = async()=>{
    const {email, password} = homeData
    const token = await axios.post('/api/user/login', {email, password})
    // const verified = await jwt.verify(token, process.env.JWT_SECRET)
    
    console.log(token)
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
          <label for="email" >Email:</label>
          <input  type="text" id='email' name='email' onChange={handleChange}/>
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