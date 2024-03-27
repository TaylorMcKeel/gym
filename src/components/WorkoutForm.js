import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"


const WorkoutForm = ()=>{
  const navigate = useNavigate()
  const   WORKOUT_STARTING_DURATION = 0
  const initialWorkoutData = {
    title: "",
    duration: WORKOUT_STARTING_DURATION,
    user: {}
  }
  const [workoutData, setWorkoutData] = useState(initialWorkoutData)
  
  useEffect(()=>{
    const getUser = async()=>{
      try {
        const res = await axios.get('/api/user/loggedInUser')
        setWorkoutData(workoutData=>({
          ...workoutData,
          user: res.data,
        }))
      } catch (err) {
        const errorMessage = `getUser :: WorkoutForm.js - Error when fetching user from backend API. Error: ${err}.`
        console.log(errorMessage)
      }
    }

    getUser()
  },[])

  const createWorkout = async ()=>{
    try {
      await axios.post('/api/workout',{
        "title": workoutData.title,
        "duration": workoutData.duration,
        "creator": workoutData.user._id,
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