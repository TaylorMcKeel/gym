import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"


const NavBar = ()=>{
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  //To-Do: find out how to login and get user after logging in... where does userID live
  useEffect(()=>{

  },[])
  //To-Do: fix the routes for where the workouts and exercises for a user live.
  const navigateHome=()=>{
    navigate('/')
  }
  const navigateWorkouts=()=>{
    navigate('/workouts')
  }
  const navigateExercises=()=>{
    navigate('/exercises')
  }
  return(
    <div>
      <button onClick={navigateHome}>Home</button>
      <button onClick={navigateWorkouts}>Workouts</button>
      <button onClick={navigateExercises}>Exercises</button>
    </div>
  )
}



export default NavBar