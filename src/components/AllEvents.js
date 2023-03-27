import React, {useContext,useEffect} from 'react'
import EventContext from '../context/events/EventContext'
import EventItem from './EventItem'
import { useNavigate } from 'react-router-dom'

const AllEvents = () => {
  const navigate = useNavigate();
  const context = useContext(EventContext); 
  const {allevents,fetchAllEvents,getUser} = context;
 
  useEffect(()=>{
    if(localStorage.getItem('token')){
    fetchAllEvents();
    getUser();
    }
    else{
        navigate('/login');
    }
    // eslint-disable-next-line
  },[])

  return (
    <div className='row my-2'>
       <div className='container'>
        {allevents.length===0 && "No Events to display"}
        </div>
        {allevents.map((event)=>{
            return <EventItem key={event._id} event={event} />;
        })}
    </div>
  )
}

export default AllEvents
