import EventContext from './EventContext';
import AlertContext from '../alert/AlertContext';
import {useState,useContext} from 'react';


const EventState = (props) => {
    const context = useContext(AlertContext); 
    const {showAlert} = context;
    const host = "http://localhost:5000";
    const [events,setEvents] = useState([]);
    const [allevents,setAllevents] = useState([]);
    const [username,setUsername] = useState("");

    // get user data
    const getUser = async() => {
        //API CALL
        const response = await fetch(`${host}/api/auth/getuser`,{
            method : 'POST',
            mode : 'cors',
            headers : {
                "Content-Type" : "application/json",
                "auth-token"   :  localStorage.getItem('token') 
            }
        });
        const json = await response.json();
        setUsername(json.name);
    }
     // fetch all events function
    const fetchAllEvents = async() => {
    //API CALL
    const response = await fetch(`${host}/api/events/fetchallevents`,{
        method : 'GET',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json",
            "auth-token"   :  localStorage.getItem('token') 
        }
    });
    const json = await response.json();
    setAllevents(json);
    }

    // fetch all tag events function
    const fetchTagEvents = async(tag) => {
    //API CALL
    const response = await fetch(`${host}/api/events/fetchevents/${tag}`,{
        method : 'GET',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json",
            "auth-token"   :  localStorage.getItem('token') 
        }
    });
    const json = await response.json();
    setAllevents(json);
    }

     // fetch all my events function
    const fetchMyEvents = async() => {
    //API CALL
    const response = await fetch(`${host}/api/events/fetchUserEvents`,{
        method : 'GET',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json",
            "auth-token"   :  localStorage.getItem('token') 
        }
    });
    const json = await response.json();
    setEvents(json);
    }
        

    // add event function
    const addevent = async(formData) => {
    //API CALL
    const response = await fetch(`${host}/api/events/addevent`,{
        method : 'POST',
        mode : 'cors',
        headers : {
            // "Content-Type" : "multipart/form-data" , boundary=""
            "auth-token"   :  localStorage.getItem('token') 
        },
        body : formData
    });
    const json = await response.json();
    setEvents(events.concat(json));
    }

    // edit event function
    const updateEvent = async(id,title,description,venue,dateTime,tag) => {   
    
    //API CALL
    const response = await fetch(`${host}/api/events/updateEvent/${id}`,{
        method : 'PUT',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json",
            "auth-token"   :  localStorage.getItem('token')
        },
        body : JSON.stringify({title,tag,venue,dateTime,description})
    });
    const json = await response.json();
    console.log(json);
    ///////////////////////
    let newEvents = JSON.parse(JSON.stringify(events));
    for(let i=0;i<newEvents.length;i++){
        if(newEvents[i].eid===id){
            newEvents[i].title=title;
            newEvents[i].description=description;
            newEvents[i].tag=tag;
            newEvents[i].venue=venue;
            newEvents[i].dateTime=dateTime;
            break;
        }
    }

    setEvents(newEvents);
    }

    // delete event function
    const deleteEvent = async(id) =>{
    //API CALL
    const response = await fetch(`${host}/api/events/deleteEvent/${id}`,{
        method : 'DELETE',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json",
            "auth-token"   :  localStorage.getItem('token') 
        }
    });
    const json = await response.json();
    if(json.success){
        showAlert("Your Event has been Deleted","success");
    }
    ///////////////////
    const newEvents = events.filter((event)=>{
        return event.eid!==id});
    setEvents(newEvents);
    }

    return(
        <EventContext.Provider value={{events,allevents,username,getUser,fetchAllEvents,fetchTagEvents,fetchMyEvents,addevent,updateEvent,deleteEvent}}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventState;