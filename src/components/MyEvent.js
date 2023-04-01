import React, {useContext,useEffect,useState,useRef} from 'react'
import EventContext from '../context/events/EventContext'
import AlertContext from '../context/alert/AlertContext'
import MyEventItem from './MyEventItem'
import { Link,useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import  {setProgress} from '../State/action-creators/index'

const MyEvent = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(EventContext); 
  const {events,fetchMyEvents,getUser,updateEvent} = context;
  const alertcontext = useContext(AlertContext); 
  const {showAlert} = alertcontext;
  const [editedEvent,setEditedEvent] = useState({eid:"",title:"",description:"",venue:"",dateTime:"",tag:""});

  const handlechange = (e) => {
        setEditedEvent({...editedEvent,[e.target.name]: e.target.value});
    }
    const editEvent = (currEvent) => {
        setEditedEvent({...currEvent,dateTime: moment(currEvent.dateTime).format("YYYY-MM-DDTkk:mm")} );
    }
    const handleupdateEvent = (e) =>{
        e.preventDefault();
        console.log(editedEvent);
        updateEvent(editedEvent.eid,editedEvent.title,editedEvent.description,editedEvent.venue,editedEvent.dateTime,editedEvent.tag);
        ref.current.click();
        showAlert(`Your Note : ${editedEvent.title} has been updated` , "success");
    }

  useEffect(()=>{
    if(localStorage.getItem('token')){
        fetchMyEvents();
        getUser();
        dispatch(setProgress(20));
    }
    else{
        navigate('/login');
    }
    // eslint-disable-next-line
  },[])

  return (
    <>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Event Here</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form onSubmit={handleupdateEvent}>
        <div className="modal-body">
        
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={editedEvent.title} onChange={handlechange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="textarea" className="form-control" id="description" name="description" value={editedEvent.description} onChange={handlechange} minLength={6} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="venue" className="form-label">Venue</label>
                    <input type="textarea" className="form-control" id="venue" name="venue" value={editedEvent.venue} onChange={handlechange} minLength={6} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="dateTime" className="form-label">Date and Time</label>
                    <input type="datetime-local" className="form-control" id="dateTime" name="dateTime" value={editedEvent.dateTime} onChange={handlechange} minLength={6} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="textarea" className="form-control" id="tag" name="tag" value={editedEvent.tag} onChange={handlechange} minLength={3} required/>
                </div>
            
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref}>Close</button>
            <button type="submit" id="update" className="btn btn-primary">Update Event</button>
        </div>
        </form>
        </div>
    </div>
    </div>

    <div className='row my-2'>
        <div className='heading'>
            <h2>Your Events</h2>
            <Link className="btn btn-primary mx-1" to="/create" role="button">+ Create Event</Link>
        </div>
       <div className='container'>
        {events.length===0 && "No Events to display"}
        </div>
        {events.map((event)=>{
            return <MyEventItem key={event._id} editEvent={editEvent} event={event} />;
        })}
    </div>
    </>
  )
}

export default MyEvent
