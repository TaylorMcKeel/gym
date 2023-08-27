import React, {Component} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Exercises, Workouts, Home} from './components'

export class Router extends Component{
  render(){
    return(
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/workouts' element={<Workouts />} />
        <Route path='/exercises' element={<Exercises/>} />
      </Routes>
    )
  }
}

export default (Router)