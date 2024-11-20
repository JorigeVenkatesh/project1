import React, { useRef, useState } from 'react' 
import { Link } from 'react-router-dom';
function SignupForm() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let passwordInputRef = useRef();
  let emailInputRef = useRef();
  let profilePicInputRef = useRef();

   let [profilePicPath,setProfilePicPath] = useState("./images/noImage.png");

 

  let sendDataToServerThruFormData = async ()=>{
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
        method : "post",
        body : dataToSend,
    };

    let JSONData = await fetch("http://localhost:4567/signup",reqOptions);

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
            <input ref={emailInputRef}></input>
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
                sendDataToServerThruFormData();
            }}>SIGN-UP with form data</button>
        </div>
    </form>
    <br></br>
    <br></br>
    <div>
        <Link to="/">Login</Link>
    </div>
    </div>
  )
}

export default SignupForm