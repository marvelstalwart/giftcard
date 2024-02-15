import React, {useState} from 'react'
import GiftCard from './GiftCard'
import Input from './Input'
import host from "../../../customHooks/useUrl"
import SuccessfulPopup from './SuccessfulPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import {motion, AnimatePresence} from "framer-motion"
import axios from 'axios'
export default function ConfirmationForm(props) {
    const { forms, selectedCard, formValues, handleChange, handleConfirmation, defaultDate} = props
    const [isLoading, setIsLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('User'))
    const handleSubmit = async (e)=> {
      setIsLoading(true)
    
            e.preventDefault()
            const data = {
              fullName: formValues.fullName,
              recepientEmail: formValues.email,
              senderEmail: user.email,
              senderName: user.fullName.split(" ")[1],
              date: formValues.date,
              message: formValues.message,
              amount: selectedCard.amount + "000"
            }
              const token = localStorage.getItem('token')
            const config = {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
              try {
                // Send a request to the backend
                const res = await axios.post(`${host}/api/gift-card/`,data, config)
               
                  if (res.status ===200) {
                    setIsLoading(false)
                    props.setIsSuccess(true)
                    props.setIsModalOpen(true)
                    handleConfirmation(e)
                  }
                  else {
                    handleConfirmation(e)
                    setIsLoading(false)
                    props.setIsError(true)
                  }
              }
              catch(err){
                console.error(err)
              }
   
    }
    return (
    
     
        
        <AnimatePresence><motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        className='bg-black bg-opacity-70 h-screen absolute left-0 top-0 w-full overflow-hidden z-30'>
         

            <motion.div 
                initial={{
                    y: 200
                }}

                animate={{
                    y:0
                }}

                exit={{y:200}}
            className='bg-white h-full  w-full rounded-2xl  mt-36 z-10 p-4 flex flex-col gap-4 '>
                <FontAwesomeIcon onClick={handleConfirmation} icon={faCircleXmark} className='absolute right-0 px-4 text-gray-600'/>
        <h1 className=' text-2xl font-bold'> Review your Gift Details </h1>
            <div className='w-full px-10'> <GiftCard selectedCard={selectedCard}/></div>
              <div className='font-bold'>Delivery Info</div>
            <form className='flex flex-col gap-4 h-full '  onSubmit={(e)=>handleSubmit(e)}>
        {forms.map((input,i)=> {
            return <Input name={input.name} type={input.type} placeholder={input.placeholder} handleChange={handleChange} value={formValues[input.name]} key={i} disabled={true} />
        })}
        <div className='w-full px-4 bg-gray-100 border-t-2  fixed bottom-0 left-0 h-24 flex items-center'>
          <button className={`w-full ${isLoading? 'bg-amber-400' : 'bg-amber-600'}  h-fit text-white p-4 rounded-lg flex justify-center font-bold text-lg cursor-pointer`}>Confirm Sending</button>
        </div>
      </form>
      </motion.div>
    </motion.div>
    </AnimatePresence> 
    


    
  )
}
