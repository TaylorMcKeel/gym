import React, {Component} from 'react'
import {Route, Routes} from 'react-router-dom'
import { Exercises, Workouts, Home, WorkoutForm, ExerciseForm} from './components'

export class Router extends Component{
  render(){
    return(
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/workouts' element={<Workouts />} />
        <Route path='/exercises' element={<Exercises/>} />
        <Route path='/newExercise' element={<ExerciseForm/>} />
        <Route path='/newWorkout' element={<WorkoutForm/>} />
      </Routes>
    )
  }
}

export default Router