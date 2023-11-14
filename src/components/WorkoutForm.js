import React, {Component} from 'react'
import axios from 'axios'

export class WorkoutForm extends Component{
  constructor(){
    super()
    this.state = {
      title: '',
      duration:''
    }
  }
  render(){
    return(
      <div>
        <h1>Add a New Workout</h1>
        <form>
          <label for="workoutTitle" >Workout Title:</label>
          <input  type="text" id='workoutTitle' name='workoutTitle' onChange={(ev)=>{this.setState({title: ev.target.value})}}/>
          <label for="duration">Duration:</label>
          <input type='text' id ='duration' name='duration' onChange={(ev)=>{this.setState({duration: ev.target.value})}}/>
        </form> 
        <button>Submit</button>
      </div>
    )
  }
}

export default (WorkoutForm)