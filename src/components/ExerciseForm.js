import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const ExerciseForm = ()=>{
  const navigate = useNavigate()
  const [exerciseTitle, setExerciseTitle]= useState("")
  const [category, setCategory] = useState("")
  const [workout, setWorkout]= useState("")
  const [allWorkouts, setAllWorkouts] = useState([])

  useEffect(()=>{
    const getWorkouts = async()=>{
      try {
        await axios.get('/api/workout')
          .then(res => setAllWorkouts(res.data))
      } catch (err) {
        console.log(err)
      }
    }
    getWorkouts()
  },[])
  
  const addExercise = async()=>{
    try {
      axios.post('/api/exercise',{
        "title": exerciseTitle,
        "category": category,
        "workout": workout,
      })
    } catch (err) {
      console.log(err)
    }
    navigate('/exercises')
  }
  console.log(allWorkouts)
  return(
    <div>
      <h1>Add a New Exercise</h1>
      <form>
        <label for="exerciseTitle" >Exercise Title:</label>
        <input  type="text" id='exerciseTitle' name='exerciseTitle' onChange={(ev)=>setExerciseTitle(ev.target.value)}/>
        <label for="category">Category:</label>
        <select id='category' name='category' onChange={(ev)=>{setCategory(ev.target.value)}}>
          <option value=''>Select One</option>
          <option value='ARMS'>Arms</option>
          <option value='LEGS'>Legs</option>
          <option value='CHEST'>Chest</option>
          <option value='BACK'>Back</option>
          <option value='ABS'>Abs</option>
        </select>
        <label for='workout'>Workout:</label>
        <select id='workout' name='workout' onChange={(ev)=>{setWorkout(ev.target.value)}}>
          <option value=''>Select One</option>
          {allWorkouts.map(workout=>{
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