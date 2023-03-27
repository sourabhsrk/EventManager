import React, {useContext} from 'react'
import EventContext from '../context/events/EventContext'
import defaultimage from '../event.jpg'


const MyEventItem = (props) => {
    const context = useContext(EventContext); 
    const {deleteEvent} = context;
    const {event,editEvent} = props;
    let image="";
    if(event.image){
        const blob = new Blob([Int8Array.from(event.image.data.data)], {type: event.image.contentType });
        image = window.URL.createObjectURL(blob);
    }
    else{
        image = defaultimage;
    }
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <img src={image} className="card-img-top" alt="Banner"/>
        <div className="card-body">
            <h5 className="card-title">{event.title} - {event.eid}</h5>
            <p className="card-text">{event.description}</p>
            <p className="card-text">{event.tag}</p>
            <p className="card-text"><small className="text-danger">When : {new Date(event.dateTime).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</small></p>
            <p className="card-text"><small className="text-danger">Where : {event.venue}</small></p>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{editEvent(event)}} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteEvent(event.eid)}}></i>
        </div>
        </div>
    </div>
  )
}

export default MyEventItem
