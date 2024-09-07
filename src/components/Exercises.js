import React, {useState, useEffect, useCallback} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Exercises = ()=>{
  const navigate = useNavigate()
  const initialExercisesData = {
    workouts: [],
    exercises: []
  }

  const [exercisesData, setExercisesData] = useState(initialExercisesData)

  useEffect(()=>{
    const getExercises = async ()=>{
      try {
        const res = await axios.get('/api/exercise/userExercises')
        setExercisesData((exercisesData)=>({
          ...exercisesData,
          exercises: res.data
        }))
      } catch (err) {
        const errorMessage = `getExercises :: Exercises.js - Error when fetching all exercises from backend API. Error: ${err}.`
        console.log(errorMessage)
      }
     
    }

    const getWorkouts = async()=>{
      try {
        const res = await axios.get('/api/workout/userWorkouts')
        setExercisesData((exercisesData)=>({
          ...exercisesData,
          workouts: res.data
        }))
      } catch (err) {
        const errorMessage = `getWorkouts :: Exercises.js - Error when fetching all workouts from backend API. Error: ${err}.`
        console.log(errorMessage)
      }
    }

    getExercises()
    getWorkouts()
  },[])
  //TO-DO: update navigate routes with id
  const navigateWorkout = (workoutId)=>{
    navigate(`/workouts/`)
  }

  const navigateStats = (exerciseId) =>{
    navigate(`/exercises/`)
  }

  const navigateExerciseForm = ()=>{
    navigate(`/newExercise`)
  }

  const handleWorkoutClick = useCallback((curr)=>{
    navigateWorkout(curr._id);
  }, [curr._id, navigateWorkout]);

  const handleButtonClick = useCallback((curr)=>{
    navigateStats(curr.id);
  },[curr.id, navigateStats])
  
  if(exercisesData.exercises.length === 0){
    return(
      <div>
        <h1>Your Exercises</h1>
        <button onClick={navigateExerciseForm}>Add New Exercise</button>
        <p>No Exercises Yet</p>
      </div>
    )
  }else{
    return(
      <div>
        <h1>Your Exercises</h1>
        <button onClick={navigateExerciseForm}>Add New Exercise</button>
        <ul>
          {exercisesData.exercises.map(curr=>{
  
            return(
              <li >
                <h3>Title: {curr.title}</h3>
                <p>Category: {curr.category}</p>
                <p>Workout: <button onClick={handleWorkoutClick}>{curr.title}</button></p>
                <button onClick={handleButtonClick}>See Stats</button>       
              </li> // TO-DO: add functionality to open to exercise page with stats.
            )
          })}
        </ul>
      </div>
    )
  }
 
}



export default Exercises