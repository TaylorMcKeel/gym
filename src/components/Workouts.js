import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"


const Workouts = ()=>{
  const initialWorkoutsData = {
    workouts: [],
    exercises: [],
  }
  const [workoutsData, setWorkoutsData] = useState(initialWorkoutsData)
  const navigate = useNavigate()

  useEffect(()=>{
    const getWorkouts = async()=>{
      try {
        const res = await axios.get('/api/workout')
        setWorkoutsData(workoutsData=>({
          ...workoutsData,
          workouts: res.data,
        }))
      } catch (err) {
        const errorMessage = `getWorkouts :: Workouts.js - Error when fetching workouts from backend API. Error: ${err}.`
        console.log(errorMessage)
      }
    }

    const getExercises = async()=>{
      try {
        const res = await axios.get('/api/exercise')
        setWorkoutsData(workoutsData=>({
          ...workoutsData,
          exercises: res.data,
        }))
      } catch (err) {
        const errorMessage = `getExercises :: Workouts.js - Error when fetching exercises from backend API. Error: ${err}.`
        console.log(errorMessage)
      }
    }

    getWorkouts()
    getExercises()
  },[])
  
  const navigateWorkout = (id) =>{
    navigate(`/workouts/`)
  }
  const navigateNewWorkout=()=>{
    navigate('/newWorkout')
  }
  return(
    <div>
      <h1>Your Workouts</h1>
      <button onClick={navigateNewWorkout}>Add New Workout</button>
      <ul>
        {workouts.map((workout)=>{
          return(
            <li key={workout._id}>
              <h3>Title: {workout.title}</h3>
              <p>Duration: {workout.duration}</p>
              <button onClick = {()=>navigateWorkout(workout._id)}>See More</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}



 
export default Workouts