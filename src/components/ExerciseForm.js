import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const ExerciseForm = ()=>{
  const navigate = useNavigate()
  const [exerciseTitle, setExerciseTitle]= useState("")
  const [category, setCategory] = useState("")
  const [workout, setWorkout]= useState("")
  const [allWorkouts, setAllWorkouts] = useSate({})

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
  
  return(
    <div>
      <h1>Add a New Exercise</h1>
      <form>
        <label for="exerciseTitle" >Exercise Title:</label>
        <input  type="text" id='exerciseTitle' name='exerciseTitle' onChange={(ev)=>{this.setState({title: ev.target.value})}}/>
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
          {workouts.map(workout=>{
            return(
              <option value={workout.id}>{workout.title}</option>
            )
          })}
        </select>
      </form> 
      <button>Submit</button>
    </div>
  )
}


  

export default ExerciseForm