import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class Exercises extends Component{
  constructor(){
    super()
    this.state = {
      workouts:[],
      exercises: []
    }
  }

  async componentDidMount(){
    await axios.get('/api/exercise')
      .then(res => this.setState({exercises: res.data}))
  }
  render(){
    const {workouts, exercises} = this.state
    console.log(this.state.exercises[0])
    return(
      <div>
        <h1>Your Exercises</h1>
        <Link to='/newExercise'>Add New Exercise</Link>
        <ul>
          {exercises.map(curr=>{
            return(
              <li>
                <h3>Title: {curr.title}</h3>
                <p>Category: {curr.category}</p>
                <Link to='/exercises/'>See Stats</Link>       
              </li> //add functionality to open to exercise page with stats.
            )
          })}
        </ul>
      </div>
    )
  }
}

export default (Exercises)