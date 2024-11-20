import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'

function TopNavigation() {

   let navigate = useNavigate();

  let storeObj = useSelector((store)=>{return store;});

   useEffect(()=>{
    if(storeObj && storeObj.loginDetails && storeObj.loginDetails.email){  
    }else{
       navigate("/")
    }
   },[]);

   let deleteProfile = async ()=>{
    let reqOptions = {method: "DELETE"};
    let url = `http://localhost:4567/deleteProfile?email=${storeObj.loginDetails.email}`;

    let JSONData = await fetch(url,reqOptions);
    let JSOData = await JSONData.json();

    if(JSOData.status === "success"){
      alert(JSOData.msg);
    }

   }

    let activeObj = (obj) => {
        if(obj.isActive === true){
            return {backgroundColor: "violet",color:"white"};
        }
    };

  return (
    <div>
        <nav>
            <NavLink to="/Home" style={(obj)=>{
              return  activeObj(obj)
            }}>Home</NavLink>
            <NavLink to="/Tasks"  style={(obj)=>{
              return  activeObj(obj)
            }}>Tasks</NavLink>
            <NavLink to="/Messages"  style={(obj)=>{
              return  activeObj(obj)
            }}>Messages</NavLink>
            <NavLink to="/UpdateProfile"  style={(obj)=>{
              return  activeObj(obj)
            }}>UpdateProfile</NavLink>
            <NavLink to="/DeleteProfile"  style={(obj)=>{
              return  activeObj(obj)
            }} onClick={()=>{deleteProfile();}}>DeleteProfile</NavLink>
            <NavLink to="/"  style={(obj)=>{
              return  activeObj(obj)
            }} onClick={()=>{localStorage.clear();}}>Logout</NavLink>
        </nav>
    </div>
  )
}

export default TopNavigation