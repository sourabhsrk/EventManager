import React, {useContext,useState,useEffect} from 'react'
import UserContext from '../context/user/UserContext'
import defaultimage from '../event.jpg'

const EventItem = (props) => {
    const context = useContext(UserContext); 
    const {register,unregister,checkRegister} = context;
    const {event} = props;
    const [isRegistered,setIsRegistered] = useState(false);

    let image="";
    if(event.image){
        const blob = new Blob([Int8Array.from(event.image.data.data)], {type: event.image.contentType });
        image = window.URL.createObjectURL(blob);
    }
    else{
        image = defaultimage;
    }

    const handleRegister = (eid) =>{
      register(eid);
      setIsRegistered(true);
    }
    const handleUnRegister = (eid) =>{
      unregister(eid);
      setIsRegistered(false);
    }

    const handleClick = (eid) => {
      if(isRegistered){
        handleUnRegister(eid);
      }
      else{
        handleRegister(eid);
      }
    }

    useEffect(()=>{
      checkRegister(event.eid)
      .then(response=>setIsRegistered(response))
      .catch(err=>console.log(err));
     
      // eslint-disable-next-line
    },[])

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div style={{display:'flex',justifyContent: 'flex-end',position:'absolute',right: '0'}}>
          <span className=" badge rounded-pill bg-danger">Participants:{event.participants}</span>
        </div>
        <img src={image} className="card-img-top" alt="Banner"/>
        <div className="card-body">
            <h5 className="card-title">{event.title}</h5>
            <p className="card-text">{event.description}</p>
            <p className="card-text">{event.tag}</p>
            <p className="card-text"><small className="text-danger">When : {new Date(event.dateTime).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</small></p>
            <p className="card-text"><small className="text-danger">Where : {event.venue}</small></p>
            <button type="button" className="btn btn-primary" onClick={()=>{handleClick(event.eid)}}>{isRegistered?"Unregister":"Register"}</button>
        </div>
        </div>
    </div>
  )
}

export default EventItem
