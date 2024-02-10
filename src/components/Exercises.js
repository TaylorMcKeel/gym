import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Exercises = ()=>{
  const navigate = useNavigate()
  const [workouts, setWorkouts] = useState([])
  const [exercises, setExercises] = useState([])

  useEffect(()=>{
    const getExercises = async ()=>{
      try {
        await axios.get('/api/exercise')
          .then(res => setExercises(res.data))
      } catch (err) {
        console.log(err)
      }
     
    }

    const getWorkouts = async()=>{
      try {
        axios.get('/api/workout')
          .then(res => setWorkouts(res.data))
      } catch (err) {
        console.log(err)
      }
    }

    getExercises()
    getWorkouts()
  },[])
  
  const navigateWorkout = (workoutId)=>{
    navigate(`/workouts/`)
  }

  const navigateStats = (exerciseId) =>{
    navigate(`/exercises/`)
  }

  const navigateExerciseForm = ()=>{
    navigate(`/newExercise`)
  }

  return(
    <div>
      <h1>Your Exercises</h1>
      <button onClick={navigateExerciseForm}>Add New Exercise</button>
      <ul>
        {exercises.map(curr=>{
          let currWorkout 
          workouts.map((item)=>{
            if(item._id === curr.workout){
              currWorkout = item
            }
          })
          console.log(curr)
          return(
            <li >
              <h3>Title: {curr.title}</h3>
              <p>Category: {curr.category}</p>
              <p>Workout: <button onClick={()=>navigateWorkout(currWorkout._id)}>{currWorkout.title}</button></p>
              <button onClick={()=>navigateStats(curr.id)}>See Stats</button>       
            </li> //add functionality to open to exercise page with stats.
          )
        })}
      </ul>
    </div>
  )
}



export default Exercises