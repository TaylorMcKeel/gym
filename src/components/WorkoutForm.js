import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"


const WorkoutForm = ()=>{
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [duration, setDuration] = useState(0)
  //To-Do: find out how to login and get user after logging in... where does userID live
  useEffect(()=>{

  },[])
  //To-Do: create a function to make a new workout
  const createWorkout = async ()=>{
    try {
      axios.post('/api/workout',{
        "title": title,
        "duration": duration,
        "creator": "64ce31438df1e2b147f43193"
      })
    } catch (err) {
      console.log(err)
    }
    navigate('/workouts')
  }
  
  return(
    <div>
      <h1>Add a New Workout</h1>
      <form>
        <label for="workoutTitle" >Workout Title:</label>
        <input  type="text" id='workoutTitle' name='workoutTitle' onChange={(ev)=>{setTitle(ev.target.value)}}/>
        <label for="duration">Duration:</label>
        <input type='text' id ='duration' name='duration' onChange={(ev)=>{setDuration(ev.target.value)}}/>
      </form> 
      <button onClick={createWorkout}>Submit</button>
    </div>
  )
}



export default WorkoutForm