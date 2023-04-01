import React, {useContext,useEffect} from 'react'
import EventContext from '../context/events/EventContext'
import EventItem from './EventItem'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import  {setProgress} from '../State/action-creators/index'

const AllEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(EventContext); 
  const {allevents,fetchAllEvents,getUser} = context;
 

  useEffect(()=>{
    if(localStorage.getItem('token')){
      fetchAllEvents();
      getUser();
      setTimeout(()=>{
        dispatch(setProgress(100));
      },500)
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
