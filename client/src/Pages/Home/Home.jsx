
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInterface from './components/UserInterface';
import AdminInterface from './components/AdminInterface';

export default function Home() {
  const [user,setUser] = useState(null)
   useEffect(()=> {
    const user = JSON.parse(localStorage.getItem('User'))
    setUser(user)
   },[])
  return (
    <div>
      {user?.role === "admin" ?
      
    
      <AdminInterface/>
        :
        <UserInterface/>

      }
</div>
  
  )
}
