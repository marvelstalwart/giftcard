import React from 'react'
import GiftCard from './GiftCard'
import Input from './Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import {motion, AnimatePresence} from "framer-motion"
export default function ConfirmationForm(props) {
    const { forms, selectedCard, formValues, handleChange, handleConfirmation, defaultDate} = props
 
    const handleSubmit = (e)=> {
            e.preventDefault()
            console.log(formValues)
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
            <form className='flex flex-col gap-4 h-full '>
        {forms.map((input,i)=> {
            return <Input name={input.name} type={input.type} placeholder={input.placeholder} handleChange={handleChange} value={formValues[input.name]} key={i} disabled={true} />
        })}
        <div className='w-full px-4 bg-gray-100 border-t-2  fixed bottom-0 left-0 h-24 flex items-center'>
          <button className='w-full  h-fit bg-amber-600 text-white p-4 rounded-lg flex justify-center font-bold text-lg cursor-pointer' onClick={handleSubmit}>Confirm Sending</button>
        </div>
      </form>
      </motion.div>
    </motion.div>
    </AnimatePresence> 
    


    
  )
}
