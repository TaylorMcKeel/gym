import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class ExerciseForm extends Component{
  constructor(){
    super()
    this.state = {
      title: '',
      category: '',
      workout: '',
      workouts: []
    }
  }

  async componentDidMount(){
    await axios.get('/api/workout')
      .then(res => this.setState({workouts: res.data}))
  }

  render(){
    const {workouts} = this.state
    console.log(this.state.workout)
    return(
      <div>
        <h1>Add a New Exercise</h1>
        <form>
          <label for="exerciseTitle" >Exercise Title:</label>
          <input  type="text" id='exerciseTitle' name='exerciseTitle' onChange={(ev)=>{this.setState({title: ev.target.value})}}/>
          <label for="category">Category:</label>
          <select id='category' name='category' onChange={(ev)=>{this.setState({category: ev.target.value})}}>
            <option value=''>Select One</option>
            <option value='ARMS'>Arms</option>
            <option value='LEGS'>Legs</option>
            <option value='CHEST'>Chest</option>
            <option value='BACK'>Back</option>
            <option value='ABS'>Abs</option>
          </select>
          <label for='workout'>Workout:</label>
          <select id='workout' name='workout' onChange={(ev)=>{this.setState({workout: ev.target.value})}}>
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
}

export default (ExerciseForm)