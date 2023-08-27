import React from 'react'
import { createRoot} from 'react-dom/client'
import {Router} from './Routes'
import {NavBar} from './components'
import {BrowserRouter} from 'react-router-dom'

class App extends React.Component{
  constructor(){
    super()
  }
  render(){
    return (
      <BrowserRouter>
        <div>
          <NavBar/>
          <Router />
        </div>
      </BrowserRouter>
    )
  }
}

const element = document.getElementById('root')
const root = createRoot(element)

root.render(
  <App/>
)