import React, {  useEffect, useRef, useState } from 'react' 
import { Link } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';
function UpdateProfile() {


  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let passwordInputRef = useRef();
  let emailInputRef = useRef();
  let profilePicInputRef = useRef();

   let [profilePicPath,setProfilePicPath] = useState("./images/noImage.png");

   let storeObj = useSelector((store)=>{return store});

   useEffect(()=>{
    firstNameInputRef.current.value = storeObj.loginDetails.firstName;
    lastNameInputRef.current.value = storeObj.loginDetails.lastName;
    ageInputRef.current.value = storeObj.loginDetails.age;
    emailInputRef.current.value = storeObj.loginDetails.email;
    setProfilePicPath(`http://localhost:4567/${storeObj.loginDetails.profilePic}`)
   },[])

  
   

   let sendUpdateDataToServerThruFormData = async ()=>{
    let dataToSend = new FormData();
    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    for(let i = 0;i<profilePicInputRef.current.files.length;i++){
     dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
    }
    

    

    let reqOptions = {
        method : "PUT",
        body : dataToSend,
    };

    let JSONData = await fetch("http://localhost:4567/updateProfile",reqOptions);

    let JSOData = await JSONData.json();
    console.log(JSOData);

    if (JSOData.status === "success"){
        alert(JSOData.msg)
    }else{
        alert(JSOData.msg)
    }

  };

  return (
    <div className='App'>
        <TopNavigation/>
    <form>
        <h3>SIGNUP</h3>
        <div>
            <label>FIRST NAME</label>
            <input ref={firstNameInputRef}></input>
        </div>
        <div>
            <label>LAST NAME</label>
            <input ref={lastNameInputRef}></input>
        </div>
        <div>
            <label>AGE</label>
            <input ref={ageInputRef}></input>
        </div>
        <div>
            <label>EMAIL</label>
            <input ref={emailInputRef} readOnly></input>
        </div>
        <div>
            <label>PASSWORD</label>
            <input type="password" ref={passwordInputRef}></input>
        </div>
        <div>
            <label>PROFILE PIC</label>
            <input ref={profilePicInputRef} type="file"
             onChange={(eventObj)=>{
                let selectedImagePath =  URL.createObjectURL(eventObj.target.files[0]);
                setProfilePicPath(selectedImagePath);
             }}></input>
        </div>
        <div>
            <img className='profilePic' src={profilePicPath}></img>

        </div>
        <div>
        <button type="button" onClick={()=>{
                sendUpdateDataToServerThruFormData();
            }}>UpdateProfile</button>
        </div>
    </form>
    <br></br>
    <br></br>
    </div>
  )
}

export default UpdateProfile