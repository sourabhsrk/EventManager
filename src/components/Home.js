import React, {useEffect} from 'react'
import AllEvents from './AllEvents'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import  {setProgress} from '../State/action-creators/index'

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
    dispatch(setProgress(20));
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
