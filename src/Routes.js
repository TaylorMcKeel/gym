import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import { Exercises, Workouts, Home} from './components'

export class Routes extends Component{
  render(){
    return(
      <div>
        {/* <Route path='/workouts' component ={Exercises}/>
        <Route path='/exercises' component ={Workouts}/> */}
        <Route path='/' component ={Home}/> 
      </div>
    )
  }
}

export default (Routes)