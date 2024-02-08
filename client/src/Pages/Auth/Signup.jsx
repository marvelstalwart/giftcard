import React, {useState} from 'react'
import axios from 'axios'
import GoogleIcon from "../../assets/icons/google.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function  Signup() {
  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    password: ""
  })

  const handleChange = (e)=> {
        const {name, value} = e.target
        setFormValues({...formValues, [name]: value})
        console.log(formValues)
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
    console.log(formValues)
  }

  const handleGoogleSignUp = async (e)=> {
    try {

      const res = await axios.get("http://localhost:5000/api/auth/google")
      alert(res.data)
    }
    catch (err){
        console.error(err)
    }
  }
    return (
    <div className='flex min-h-screen items-center w-full justify-center'> 
         <div>
            <a href="http://localhost:5000/api/auth/google">
                <button  className='bg-white flex items-center justify-center gap-4 w-48 h-12 font-bold text-lg text-gray-700'>
              
              <img alt='google' className='w-4 h-4 ' src={GoogleIcon}/>
              Sign In

                </button>

            </a>
         </div>
         {/* <div>
            <form onSubmit={handleSubmit}>
              
              <label>
                Full Name
                </label>
                <input type='text' name='fullname' placeholder='EG John Doe' value={formValues.fullname} onChange={(e)=>handleChange(e)} required/>
                <label>
               Email
                </label>
              <input type='email' name="email" placeholder='Email' value={formValues.email}  onChange={(e)=>handleChange(e)} required/>
              <label>
               Password
                </label>
              <input type='password' name="password" placeholder='Password'  value={formValues.password} onChange={(e)=>handleChange(e)}required/>
              
            <button onSubmit={handleSubmit}>Submit</button>
            </form>

         </div> */}

    </div>
  )
}
