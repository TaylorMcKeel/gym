import React from 'react'
import { createRoot} from 'react-dom/client'

//to build... store... router
// import {HashRouter} from 'react-router-dom'
// import { Provider, connect} from 'react-redux'
// import store from './store/index'
// import {Routes} from './Routes'
// import {NavBar} from './components/Navbar'

class _App extends React.Component{
  constructor(){
    super()
  }
  render(){
    return (
      <div>Successfully connected React App</div>
    )
  }
}

const element = document.getElementById('root')
const root = createRoot(element)
// const App = connect()(_App)

root.render(
  <_App/>
)