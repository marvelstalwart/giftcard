
import React, {useEffect} from 'react'
import GoogleIcon from "../assets/icons/google.svg"
import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
export default function Navbar() {
const{token} = useParams()
useEffect(()=> {
    if(token) {

        let profile = jwtDecode(token)
        profile = {
            lastName: profile.name.familyName,
            firstName: profile.name.givenName,
            email: profile.emails[0].value
            
            
        }
        
        localStorage.setItem('User', JSON.stringify(profile))

    }

    return (()=> {
        localStorage.clear()
    })
},[])
const user = JSON.parse(localStorage.getItem('User'))

  return (
    <div className='bg-amber-600 flex items-center justify-between w-full fixed top-0 z-10'>

    <h1 className='px-4 py-2 text-2xl font-bold text-white'>Giftify</h1>


            {/* Sign In */}
            {
                user ?
                <div className='p-4 rounded-xl'>
            
                                <button  className='bg-white flex items-center justify-center gap-4 w-32 h-12 font-bold text-lg text-gray-700 rounded-xl'>
                              
                           
                             {user.firstName}
    
                                </button>
    
                       
                  </div>
                  :
            <div className='p-4 rounded-xl'>
            <a href="https://giftcard-roan.vercel.app/api/auth/google">
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
