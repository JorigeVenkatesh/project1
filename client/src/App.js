import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import Home from "./components/Home";
import Messages from "./components/Messages";
import Tasks from "./components/Tasks";
import PageNotFound from "./components/PageNotFound";
import Logout from "./components/Logout";
import UpdateProfile from "./components/UpdateProfile";
import DeleteProfile from "./components/DeleteProfile";



function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/SignupForm" element={<SignupForm/>}></Route>
      <Route path="/Home" element={<Home/>}></Route>
      <Route path="/Messages" element={<Messages/>}></Route>
      <Route path="/Tasks" element={<Tasks/>}></Route>
      <Route path="/UpdateProfile" element={<UpdateProfile/>}></Route>
      <Route path="/DeleteProfile" element={<DeleteProfile/>}></Route>
      <Route path="/Login" element={<Logout/>}></Route>
      <Route path="*" element={<PageNotFound/>}></Route>
      



    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
