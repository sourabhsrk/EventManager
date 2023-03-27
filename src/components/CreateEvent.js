import React, {useContext,useState} from 'react'
import EventContext from '../context/events/EventContext'
import AlertContext from '../context/alert/AlertContext'
import { useNavigate } from 'react-router-dom'

const CreateEvent = () => {
    const navigate = useNavigate();
    const context = useContext(EventContext); 
    const {addevent} = context;
    const alertcontext = useContext(AlertContext); 
    const {showAlert} = alertcontext;
    const [adevent,setAdevent] = useState ({eid:"",title:"",description:"",venue:"",dateTime:"",tag:""})
    const [selectedFile, setSelectedFile] = useState(null);
    const handleAddEvent = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('eid', adevent.eid);
        formData.append('title', adevent.title);
        formData.append('description', adevent.description);
        formData.append('venue', adevent.venue);
        formData.append('dateTime', adevent.dateTime);
        formData.append('tag', adevent.tag);
        formData.append('image', selectedFile);

        addevent(formData);
        showAlert(`Your new note with title : ${adevent.title} has been added`,"success");
        navigate('/myevents');
    }
    const handleFileInputChange = (e) =>{
        setSelectedFile(e.target.files[0]);
    }
    const handlechange = (e) => {
        setAdevent({...adevent,[e.target.name]: e.target.value});
    }
  return (
    <div>
      <h2>Add a Event</h2>
      <form onSubmit={handleAddEvent}>
            <div className="mb-3">
                <label htmlFor="eid" className="form-label">Event ID</label>
                <input type="text" className="form-control" id="eid" name="eid" onChange={handlechange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={handlechange} minLength={3} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="textarea" className="form-control" id="description" name="description" onChange={handlechange} minLength={6} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="venue" className="form-label">Venue</label>
                <input type="textarea" className="form-control" id="venue" name="venue" onChange={handlechange} minLength={3} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="dateTime" className="form-label">Date and Time</label>
                <input type="datetime-local" className="form-control" id="dateTime" name="dateTime" onChange={handlechange}  required/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="textarea" className="form-control" id="tag" name="tag" onChange={handlechange} minLength={2} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Event Banner</label>
                <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={handleFileInputChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Add Event</button>
        </form>
    </div>
  )
}

export default CreateEvent
