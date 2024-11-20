
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let emailInputRef = useRef();
  let passwordInputRef = useRef();

  useEffect(()=>{
    // emailInputRef.current.value = localStorage.getItem("email");
    // passwordInputRef.current.value = localStorage.getItem("password");

    if(localStorage.getItem("token")){
       validateLoginOnLoading();
    }
  },[]);

  let validateLoginOnLoading = async (req,res) =>{
    let dataToSend = new FormData();

    // dataToSend.append("email",localStorage.getItem("email"));
    // dataToSend.append("password",localStorage.getItem("password"));
    
    dataToSend.append("token",localStorage.getItem("token"));

    let reqOptions = {
      method : "post",
      body : dataToSend
    };

    let JSONData = await fetch("http://localhost:4567/validateToken",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);

    if(JSOData.status === "failure"){
      alert(JSOData.msg)
    }else{
      dispatch({type:"login",data:JSOData.data})
     navigate("/Home");
    }
  };
  
  let SendLoginDataToServerThruFD = async (req,res) =>{
    let dataToSend = new FormData();
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);

    let reqOptions = {
      method : "post",
      body : dataToSend
    };

    let JSONData = await fetch("http://localhost:4567/login",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);

    if(JSOData.status === "failure"){
      alert(JSOData.msg)
    }else{
      // localStorage.setItem("email",emailInputRef.current.value);
      // localStorage.setItem("password",passwordInputRef.current.value);
      localStorage.setItem("token",JSOData.data.token)
      dispatch({type:"login",data:JSOData.data})
     navigate("/Home");
    }
  };
  return (
    <div className='App'>
      <form>
        <div>
          <h2>LOGIN</h2>
          <label>Email</label>
          <input ref={emailInputRef} type="email"></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef} type="password"></input>
        </div>
        <div>
          <button type="button" onClick={()=>{
            SendLoginDataToServerThruFD();
          }}>LOGIN</button>
        </div>
      </form>
      <br></br>
      <br></br>
      <div>
        <Link to="/SignupForm">SignUp</Link>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>EMAIL - virat@gmail.com</p>
      <p>PASSWORD - virat</p>
      <br></br>
      <p>...</p>
    </div>
  )
}

export default Login