import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"


const WorkoutForm = ()=>{
  const navigate = useNavigate()
  const   WORKOUT_STARTING_DURATION = 0
  const initialWorkoutData = {
    title: "",
    duration: WORKOUT_STARTING_DURATION,
  }
  const [workoutData, setWorkoutData] = useState(initialWorkoutData)
  //To-Do: find out how to login and get user after logging in... where does userID live
  useEffect(()=>{

  },[])
  //To-Do: create a function to make a new workout
  const createWorkout = async ()=>{
    try {
      await axios.post('/api/workout',{
        "title": title,
        "duration": duration,
        "creator": "64ce31438df1e2b147f43193"
      })
    } catch (err) {
      const errorMessage = `createWorkout :: WorkoutForm.js - Error when posting new workout to backend. Error: ${err}.`
      console.log(errorMessage)
    }
    navigate('/workouts')
  }
  const handleChange = (ev)=>{
    const {name, value} = ev.target
    setWorkoutData(workoutData=>({
      ...workoutData,
      [name]: value,
    }))
  }
  return(
    <div>
      <h1>Add a New Workout</h1>
      <form>
        <label for="workoutTitle" >Workout Title:</label>
        <input  type="text" id='workoutTitle' name='title' onChange={handleChange}/>
        <label for="duration">Duration:</label>
        <input type='text' id ='duration' name='duration' onChange={handleChange}/>
      </form> 
      <button onClick={createWorkout}>Submit</button>
    </div>
  )
}



export default WorkoutForm