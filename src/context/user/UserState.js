import UserContext from './UserContext';
import AlertContext from '../alert/AlertContext';
import {useState,useContext} from 'react';


const UserState = (props) => {
    const context = useContext(AlertContext); 
    const {showAlert} = context;
    const [userEvents,setUserEvents] = useState([]);
    const host = "http://localhost:5000";


    //register for a event
    const register = async(eid) => {
        const response = await fetch(`${host}/api/users/register/${eid}`,{
            method : 'POST',
            mode : 'cors',
            headers : {
                "Content-Type" : "application/json",
                "auth-token"   :  localStorage.getItem('token') 
            }
        });
        const json = await response.json();
        if(json.success){
            showAlert("You have been registered for event","success");
        }
        else{
            showAlert("Due to internal server error, you are not registered for event.Please try after sometime","danger")
        }
        const response2 = await fetch(`${host}/api/events/updateEventCount/${eid}/${1}`,{
            method : 'PUT',
            mode : 'cors',
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const json2 = await response2.json();
        console.log(json2);
    }


    // unregister for a event
    const unregister = async(eid) => {
        const response = await fetch(`${host}/api/users/unregister/${eid}`,{
            method : 'PUT',
            mode : 'cors',
            headers : {
                "Content-Type" : "application/json",
                "auth-token"   :  localStorage.getItem('token') 
            }
        });
        const json = await response.json();
        if(json.success){
            showAlert("You have been unregistered for event","success");
        }
        else{
            showAlert("Due to internal server error, you have not unregistered for event.Please try after sometime","danger")
        }
        const response2 = await fetch(`${host}/api/events/updateEventCount/${eid}/${-1}`,{
            method : 'PUT',
            mode : 'cors',
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const json2 = await response2.json();
        console.log(json2);
    }

    //fetch all register event for user
    const fetchUserEvents = async() => {
        const response = await fetch(`${host}/api/users/getevents`,{
            method : 'GET',
            mode : 'cors',
            headers : {
                "Content-Type" : "application/json",
                "auth-token"   :  localStorage.getItem('token') 
            }
        });
        const json = await response.json();
        setUserEvents(json);
    }

    //Check if user is registered or not
    const checkRegister = async(eid) => {
        const response = await fetch(`${host}/api/users/chkregister/${eid}`,{
            method : 'GET',
            mode : 'cors',
            headers : {
                "Content-Type" : "application/json",
                "auth-token"   :  localStorage.getItem('token') 
            }
        });
        const json = await response.json();
        //setIsUserRegistered(json);
        return json;
    }

    return(
        <UserContext.Provider value={{userEvents,register,unregister,fetchUserEvents,checkRegister}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;