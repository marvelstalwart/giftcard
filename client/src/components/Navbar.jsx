
import React, {useEffect, useState} from 'react'
import GoogleIcon from "../assets/icons/google.svg"
import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'
import getHost from '../customHooks/useUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
export default function Navbar() {
const{token} = useParams()
const [user, setUser] = useState(null)
useEffect(()=> {
    if(token) { 

        let profile = jwtDecode(token)
  
        // profile = {
        //     lastName: profile.name.familyName,
        //     firstName: profile.name.givenName,
        //     email: profile.emails[0].value
            
            
        // }
        console.log(profile)
        localStorage.setItem('token', profile.token)
        localStorage.setItem('User', JSON.stringify(profile))
         
      }

      // localStorage.clear()
      
      
  
},[token])

useEffect(()=> {
  const user = JSON.parse(localStorage.getItem('User'))
    setUser(user)
    console.log(token)
},[token])

  return (
    <div className='bg-amber-600 flex items-center justify-between w-full fixed top-0 z-10'>

    <Link to="/">
    <h1 className='px-4 py-2 text-2xl font-bold text-white'>Giftify</h1>
    </Link>


            {/* Sign In */}
            {
                user ?
                <div className='flex items-center gap-4 px-4'>
            
                                <button  className='bg-white flex items-center justify-center gap-4 w-full px-2 h-full py-1 font-bold text-lg text-gray-700 rounded-xl'>
                              
                           
                             {user.fullName.split(" ")[1]}
    
                                </button>
    
                        <Link to="orders">
                        <FontAwesomeIcon icon={faCartShopping} size="xl" color='white'/>
                        </Link>
                  </div>
                  :
            <div className='p-4 rounded-xl'>
            <a href={`${getHost()}/api/auth/google?app=giftcard`}>
                            <button  className='bg-white flex items-center justify-center gap-4 w-32 h-12 font-bold text-lg text-gray-700 rounded-xl'>
                          
                          <img alt='google' className='w-4 h-4 ' src={GoogleIcon}/>
                          Sign In

                            </button>

                        </a>
              </div>
            }
          


         </div>
  )
}
