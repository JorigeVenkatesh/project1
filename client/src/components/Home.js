import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Home() {
  let storeObj =useSelector((store)=>{return store;});
  console.log(storeObj)
  return (
    <div className='App'>
        <TopNavigation/>
        <h1>WellCome To Home Page</h1>
        <div>
          <img className='StoreObjprofilePic' src={`http://localhost:4567/${storeObj.loginDetails.profilePic}`}></img>
         <h3>{storeObj.loginDetails.firstName} {""} {storeObj.loginDetails.lastName}</h3>
        </div>
        
          

       
    </div>
  )
}

export default Home