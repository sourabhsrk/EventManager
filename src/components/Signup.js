import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/alert/AlertContext';


const Signup = () => {
    const context = useContext(AlertContext); 
    const {showAlert} = context;
    let navigate = useNavigate();
    const [credentials,setCredentials] = useState({name:"",department:"",email:"",password:"",cpassword:""})
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const {name,department,email,password,cpassword} = credentials;
        if(password===cpassword){
            const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
                method : 'POST',
                mode : 'cors',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({name,department,email,password})
            });
            const json =  await response.json();
            if(json.success){
                //redirect to login page
                showAlert("You have successfully created your account,please login now","success");
                localStorage.setItem('token',json.authtoken);
                navigate("/login");
            }
            else{
                showAlert("Due to Internal error we are unable to create your account", "warning");
            }
        }
        else{
            showAlert("password and confirm password should be same", "warning");
        }
    }
    const handleChange = (e) => {
        setCredentials({...credentials,[e.target.name]: e.target.value});
    }
  return (
    <div className='container my-2'>
    <h2>Signup your account to create Events</h2>   
    <form onSubmit={handleSubmit} >
        <div className="mb-3">
            <label htmlFor="username" className="form-label">User Name</label>
            <input type="text" className="form-control" id="username" name="name" onChange={handleChange} value={credentials.username} minLength={3} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input type="text" className="form-control" id="department" name="department" onChange={handleChange} value={credentials.department} minLength={2} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={credentials.email} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={credentials.password} minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} value={credentials.cpassword} required/>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
    </div>
  )
}

export default Signup
