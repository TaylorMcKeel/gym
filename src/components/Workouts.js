import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"


const Workouts = ()=>{
  const [workouts, setWorkouts] = useState([])
  const [exercises, setExercises] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    const getWorkouts = async()=>{
      try {
        axios.get('/api/workout')
          .then(res => setWorkouts(res.data))
      } catch (err) {
        console.log(err)
      }
    }

    const getExercises = async()=>{
      try {
        axios.get('/api/exercise')
          .then(res => setExercises(res.data))
      } catch (err) {
        console.log(err)
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