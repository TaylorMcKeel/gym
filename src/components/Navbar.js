import React, {Component} from 'react'
import { Link } from 'react-router-dom'


export class NavBar extends Component{
  constructor(){
    super()
  }
  render(){
    return(
      <div>
        <Link to='/'>Home</Link>
        <Link to='/workouts'>Workouts</Link>
        <Link to='/exercises'>Exercises</Link>
      </div>
    )
  }
}

export default (NavBar)