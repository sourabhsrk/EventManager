import React, {useContext}  from 'react';
import {Link,useLocation} from "react-router-dom";
import EventContext from '../context/events/EventContext';
import AlertContext from '../context/alert/AlertContext';
import user from '../user-logo.png';

const Navbar = () => {
   let Location = useLocation();
   const alertcontext = useContext(AlertContext); 
   const {showAlert} = alertcontext;
    const context = useContext(EventContext);
    const {username,fetchTagEvents,fetchAllEvents} = context;
    const handleLogout = () => {
        localStorage.removeItem('token');
        showAlert("You have Logged out","success");
    }
  
  
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={()=>{fetchAllEvents()}}>GEU Events</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
            <Link className={`nav-link dropdown-toggle ${Location.pathname==="/"? "active" : ""}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
            </Link>
            <ul className="dropdown-menu">
                <li><Link className="dropdown-item" onClick={()=>{fetchTagEvents("cultural")}}>Cultural</Link></li>
                <li><Link className="dropdown-item" onClick={()=>{fetchTagEvents("sports")}}>Sports</Link></li>
                <li><Link className="dropdown-item" onClick={()=>{fetchTagEvents("grafest")}}>Grafest</Link></li>
                <li><Link className="dropdown-item" onClick={()=>{fetchTagEvents("cs")}}>Computer Science</Link></li>
                <li><Link className="dropdown-item" onClick={()=>{fetchTagEvents("ec")}}>Electronics</Link></li>
            </ul>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${Location.pathname==="/about"? "active" : ""}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${Location.pathname==="/myregevents"? "active" : ""}`} to="/myregevents">MyRegEvents</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${Location.pathname==="/myevents"? "active" : ""}`} to="/myevents">MyEvents</Link>
            </li>
            </ul>
            {!localStorage.getItem('token')?  
            <form className="d-flex" role="search">  
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link> 
            </form>
            : <div>
                <img src={user} alt="user" width="40px" height="40px"/>
                <strong className="mx-2" style={{'color':'white'}}>{username}</strong>
                <Link className="btn btn-primary mx-1" to="/login" role="button" onClick={handleLogout}>Logout</Link>
            </div>}
        </div>
        </div>
    </nav>
  )
}

export default Navbar
