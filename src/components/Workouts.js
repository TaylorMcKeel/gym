import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

export class Workouts extends Component{
  constructor(){
    super()
    this.state={
      workouts: [],
      exercises:[]
    }
  }

  async componentDidMount(){
    await axios.get('/api/workout')
      .then(res => this.setState({workouts: res.data}))
  }

  render(){
    const {workouts, exercises} = this.state
    console.log(this.state.workouts[0])
    return(
      <div>
        <h1>Your Workouts</h1>
        <Link to='/newWorkout'>Add New Workout</Link>
        <ul>
          {workouts.map((workout)=>{
            return(
              <li key={workout._id}>
                <h3>Title: {workout.title}</h3>
                <p>Duration: {workout.duration}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default (Workouts)