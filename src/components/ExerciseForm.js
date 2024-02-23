import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const ExerciseForm = ()=>{
  const navigate = useNavigate()
  const initialExerciseData = {
    title: '',
    category: '',
    workout: '',
    allWorkouts: []
  }
  const [exerciseData, setExerciseData]= useState(initialExerciseData)


  useEffect(()=>{
    const getWorkouts = async()=>{
      try {
        const res = await axios.get('/api/workout')
        setExerciseData(exerciseData=>({
          ...exerciseData,
          allWorkouts: res.data,
        }))
      } catch (err) {
        const errorMessage = `getWorkouts :: ExerciseForm.js - Error when fetching all workouts from backend API. Error: ${err}.`

        //To-Do: on err throw an aerror and reroute to home page
        console.log(errorMessage)
      }
    }
    getWorkouts()
  },[])
  
  const addExercise = async()=>{
    try {
      await axios.post('/api/exercise',{
        "title": exerciseTitle,
        "category": category,
        "workout": workout,
      })
    } catch (err) {
      const errorMessage = `addExercise :: ExerciseForm.js - Error when posting new exercise to backend. Error: ${err}.`
      console.log(errorMessage)
    }
    navigate('/exercises')
  }
  
  const handleChange = (ev)=>{
    const {name, value} = ev.target
    setExerciseData(exerciseData =>({
      ...exerciseData,
      [name]: value,
    }))
  }
  return(
    <div>
      <h1>Add a New Exercise</h1>
      <form>
        <label for="exerciseTitle" >Exercise Title:</label>
        <input  type="text" id='exerciseTitle' name='title' onChange={handleChange}/>
        <label for="category">Category:</label>
        <select id='category' name='category' onChange={handleChange}>
          <option value=''>Select One</option>
          <option value='ARMS'>Arms</option>
          <option value='LEGS'>Legs</option>
          <option value='CHEST'>Chest</option>
          <option value='BACK'>Back</option>
          <option value='ABS'>Abs</option>
        </select>
        <label for='workout'>Workout:</label>
        <select id='workout' name='workout' onChange={handleChange}>
          <option value=''>Select One</option>
          {exerciseData.allWorkouts.map(workout=>{
            return(
              <option value={workout._id}>{workout.title}</option>
            )
          })}
        </select>
      </form> 
      <button onClick={addExercise}>Submit</button>
    </div>
  )
}


  

export default ExerciseForm