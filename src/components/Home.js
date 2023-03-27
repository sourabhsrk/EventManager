import React, {useEffect} from 'react'
import AllEvents from './AllEvents'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
    // eslint-disable-next-line
  },[])

  return (
    <div className="container my-2">
       <h1>Ongoing Events</h1>
       <AllEvents/>
    </div>
  )
}

export default Home
