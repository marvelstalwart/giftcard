import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
export default function SuccessfulPopup({isModalOpen, setIsModalOpen}) {
  return (

    <AnimatePresence>
        {
            isModalOpen &&
            <motion.div className='absolute z-50   bg-black h-screen w-full bg-opacity-70'
            initial={{
                opacity: 0,
                scale: 0.75,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                transition: {
                    ease: "easeOut",
                    duration: 0.15,
                },
            }}
            exit={{
                opacity: 0,
                scale: 0.75,
                transition: {
                    ease: "easeIn",
                    duration: 0.15,
                },
            }}
            
            >
                <div className="fixed rounded-lg  p-5 flex flex-col items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-56 bg-white  w-[70%] z-20">
                 <FontAwesomeIcon onClick={()=> setIsModalOpen(false)} icon={faCircleXmark} className='absolute right-0 px-4 text-gray-600 cursor-pointer'/>
                    <FontAwesomeIcon icon={faEnvelope} className='h-32 text-gray-400'/>
             <div className='text-sm text-center'>Check your email to finish processing your order</div>
                </div>
                    
                
                </motion.div>
        }
   

    </AnimatePresence>
  )
}
