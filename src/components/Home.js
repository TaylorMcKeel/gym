import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

//To-Do: separate login into its own component and use protectedroute for home page to get user.

const Home = ()=>{
  const navigate = useNavigate()
  const initialHomeData = {
    user: {},
    email: "",
    password: "",
  }
  const [homeData, setHomeData] = useState(initialHomeData)
 
  useEffect(()=>{
    const getUser = async()=>{
      try {
        const res = await axios.get('/api/user/loggedInUser')
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

  
//To-Do: fix the routes for where the workouts and exercises for a user live.
  const navigateWorkouts =()=>{
    navigate(`/workouts/`)
  }

  const navigateExercises =()=>{
    navigate(`/exercises/`)
  }
  
  
  return(
    <div>
      <h1>Welcome Back {homeData.user.firstName}</h1>
      <p><button onClick ={navigateWorkouts}>My Workouts</button></p>
      <p><button onClick ={navigateExercises}>My Exercises</button></p>
    </div>
  )
  
}

export default Home;