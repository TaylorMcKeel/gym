import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { jwtDecode } from 'jwt-decode'


//To-Do: separate login into its own component and use protectedroute for home page to get user.

const Login = ()=>{
  const navigate = useNavigate()
  const initialLoginData = {
    email: "",
    password: "",
  }
  const [loginData, setLoginData] = useState(initialLoginData)
 

  const userLogin = async()=>{
    try {
      const token = await axios.post('/api/user/login', {email: loginData.email, password: loginData.password})
      const decodedToken = jwtDecode(token.data)
      const user = await axios.get(`/api/user/loggedInUser`)

      navigate(`/home/`)
    }
    catch (err) {
      const errorMessage = `userLogin :: Login.js - Error when fetching user from backend API during login. Error: ${err}.`
      console.log(errorMessage)
    }
  }
//
  const handleChange = (ev)=>{
    const {name, value} = ev.target
    setLoginData(loginData => ({
      ...loginData,
      [name]: value,
    }))
  }
  
  return(
    <div>
      <h1>Welcome Please Login</h1>
      <form>
        <label for="email" >Email:</label>
        <input  type="text" id='email' name='email' onChange={handleChange}/>
        <label for="password" >Password:</label>
        <input  type="password" id='password' name='password' onChange={handleChange}/>
      </form> 
      <button onClick={userLogin}>Login</button>
    </div>
  )
  
}

export default Login;