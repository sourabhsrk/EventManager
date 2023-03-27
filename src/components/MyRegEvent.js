import React, {useContext,useEffect} from 'react'
import UserContext from '../context/user/UserContext'
import MyRegEventItem from './MyRegEventItem'
import { useNavigate } from 'react-router-dom'

const MyRegEvent = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext); 
  const {userEvents,fetchUserEvents} = context;
  

  useEffect(()=>{
    if(localStorage.getItem('token')){
    fetchUserEvents();
    }
    else{
        navigate('/login');
    }
    // eslint-disable-next-line
  },[])


  return (
   <div className='row my-2'>
        <h1>Your Registered Events</h1>
       <div className='container'>
        {userEvents.length===0 && "You have not registered for any event"}
        </div>
        {userEvents.map((event)=>{
            return <MyRegEventItem key={event._id} event={event} />;
        })}
    </div>
  )
}

export default MyRegEvent
