import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

//To-Do: separate login into its own component and use protectedroute for home page to get user.

const Home = ()=>{
  const navigate = useNavigate()
  const initialHomeData = {
    isLoggedIn: false,
    user: {},
    email: "",
    password: "",
  }
  const [homeData, setHomeData] = useState(initialHomeData)
 
  useEffect(()=>{
//No longer think I need this function because it occurs at login, but what if I renavigate to the home page?
    const token = Cookies.get()
    console.log(window.location.origin)
    const getUser = async()=>{
      try {
        const res = await axios.get('/api/user/64ce31438df1e2b147f43193')
        setHomeData(homeData=>({
          ...homeData,
          user: res.data,
        }))
      } catch (err) {
        const errorMessage = `getUser :: Home.js - Error when fetching user from backend API. Error: ${err}.`
        console.log(errorMessage)
      }
    }

    getUser()
  },[])

  const userLogin = async()=>{
    try {
      const token = await axios.post('/api/user/login', {email: homeData.email, password: homeData.password})
      const decodedToken = jwtDecode(token.data)
      const user = await axios.get(`/api/user/${decodedToken.id}`)

      //add the token to a header to be accessed by the backend for protectedroute

      axios.defaults.headers.common['Authorization'] = `Bearer ${token.data}`;
  
      setHomeData(homeData=>({
        ...homeData,
        isLoggedIn: true,
        user: user.data
      }))
    }
    catch (err) {
      const errorMessage = `userLogin :: Home.js - Error when fetching user from backend API during login. Error: ${err}.`
      console.log(errorMessage)
    }
  }
//To-Do: fix the routes for where the workouts and exercises for a user live.
  const navigateWorkouts =()=>{
    navigate(`/workouts/`)
  }

  const navigateExercises =()=>{
    navigate(`/exercises/`)
  }
  const handleChange = (ev)=>{
    const {name, value} = ev.target
    setHomeData(homeData => ({
      ...homeData,
      [name]: value,
    }))
  }
  if(!homeData.isLoggedIn){
    return(
      <div>
        <h1>Welcome Please Login</h1>
        <form>
          <label for="email" >Email:</label>
          <input  type="text" id='email' name='email' onChange={handleChange}/>
          <label for="password" >Password:</label>
          <input  type="text" id='password' name='password' onChange={handleChange}/>
        </form> 
        <button onClick={userLogin}>Login</button>
      </div>
    )
  }else if(homeData.user){
    return(
      <div>
        <h1>Welcome Back {homeData.user.firstName}</h1>
        <p><button onClick ={navigateWorkouts}>My Workouts</button></p>
        <p><button onClick ={navigateExercises}>My Exercises</button></p>
      </div>
    )
  }
}

export default Home;