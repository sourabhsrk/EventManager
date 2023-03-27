import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import MyEvent from "./components/MyEvent";
import MyRegEvent from "./components/MyRegEvent";
import CreateEvent from "./components/CreateEvent";
import EventState from "./context/events/EventState";
import UserState from "./context/user/UserState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import AlertState from "./context/alert/AlertState";

function App() {
  return (
    <AlertState>
      <EventState>
        <UserState>
          <Router>
            <Navbar/>
            <Alert/>
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/myregevents" element={<MyRegEvent />} />
                <Route exact path="/myevents" element={<MyEvent />} />
                <Route exact path="/create" element={<CreateEvent />} />
              </Routes>
            </div>
          </Router>
        </UserState>
      </EventState>
    </AlertState>
  );
}

export default App;
