import AlertContext from './AlertContext';
import {useState} from 'react';

const AlertState = (props) => {
    const[alert,setAlert] = useState(null);
    const showAlert = (message,type) => {
        setAlert({
          msg : message,
          type : type
        })
        setTimeout(()=>{
          setAlert(null);
        },2000);
    }
    return (
        <AlertContext.Provider value={{alert,showAlert}}>
        {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;