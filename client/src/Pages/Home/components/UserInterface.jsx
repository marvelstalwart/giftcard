import React,{useState, useEffect} from 'react'
import GiftCard from './GiftCard';
import GoogleIcon from "../../../assets/icons/google.svg"
import GiftCard10 from "../../../assets/img/giftcard50.jpg"
import GiftCard50 from "../../../assets/img/giftcard100.jpg"
import GiftCard100 from "../../../assets/img/giftcard150.jpg"
import GiftCard150 from "../../../assets/img/customgiftcard.jpg"
import MinatureCard from './MinatureCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinesLeaning, faPen } from '@fortawesome/free-solid-svg-icons';
import Btn from './Btn';
import SuccessfulPopup from './SuccessfulPopup';
import Input from './Input';
import { useDate } from '../../../customHooks/useDate';
import ConfirmationForm from './ConfirmationForm';
import axios from 'axios';
import getHost from '../../../customHooks/useUrl';
import {useParams} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
export default function UserInterface() {
    const [giftCards, setGiftCards] = useState([]);
    const [newGiftCard, setNewGiftCard] = useState({ code: '', balance: 0, message: '' });
    const [disabled, setDisabled] = useState(true)
    const {defaultDate} = useDate()
    const [showConfirmation, setShowConfirmation] = useState(false)
    const token = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [giftCardsValue, setGiftCardsValue] = useState([
      {
        amount: 10,
        img: GiftCard10
      },
      {
        amount: 50,
        img: GiftCard100
      },
      {
        amount: 100,
        img: GiftCard150
      },
      {
        amount: 150,
        img: GiftCard50

      }
    ])
    
    const [formValues, setFormValues] = useState(
      {
        fullName:'',
        email:'',
        message:'',
        date:null

      }
    )
// Update the form Values when the default date(TODAY) changes
    // useEffect(()=>{
    //     setFormValues(prevValues=> ({
    //       ...prevValues, date: defaultDate
    //     }))

    // },[defaultDate])

    // useEffect(()=> {
        
     
    //     // const profile = jwtDecode(`${token}`)
    //     console.log(token)
    // },[])

    // Success or Error Message 
 
//  Show confirmation form
    const handleConfirmation = (e)=> {
      e.preventDefault()
     
      setShowConfirmation(!showConfirmation)
    }
    // Update Selected card
    const [selectedCard, setSelectedCard] = useState({
      amount: 10,
      img: GiftCard10
    })

    const handleSetCard = (card)=> {
          setSelectedCard(card)
    }

    //  Update the form values as per User input
      const handleChange = (e)=> {
    
          const {name, value} = e.target
          setFormValues({...formValues, [name]: value})
      }

      // Forms
      const forms = [
        {
          name:"fullName",
          placeholder:"Full Name",
          type:"text",
          value:formValues.fullName,
        
        },
        {
          name:"email",
          placeholder:"Email",
          type:"email",
          value:formValues.email,
         
        },
        {
          name:"message",
          placeholder:"Message",
          type:"text",
          value:formValues.message,
     
        },
        {
          name:"date",
          placeholder:"date",
          type:"date",
          value: `${defaultDate}`
     
        },
      ]
   
      const handleValue = (e)=> {
          let newValue = {...selectedCard}
          if (e.target.value < 1) {
            e.target.value = 200
          }
          newValue.amount = e.target.value
          
          setSelectedCard(newValue)
         
      }

 
  
    const handleDownloadCard = (giftCard) => {
      // Implement card download logic here
      console.log(`Downloading card with code ${giftCard.code}`);
    };
  
    const handleSendEmail = (giftCard) => {
      // Implement email sending logic here
      console.log(`Sending card with code ${giftCard.code} to email`);
    };
   
// useEffect(()=> {
 
//     console.log('default date', defaultDate)
// },[defaultDate])
  return (
    <div>
         
   
 <SuccessfulPopup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
<div className='pt-2 bg-white px-4 flex flex-col gap-4  overflow-y-auto mt-20'>

{/* Same as */}


      
      <GiftCard selectedCard={selectedCard}/>
      {/* GiftCard List */}
      <div className='flex gap-2 px-4'>
        {

          giftCardsValue.map((giftcard, i)=> {
          return   <MinatureCard giftcard={giftcard} key={i} selected={giftcard === selectedCard} handleSetCard={handleSetCard}/>
          })
        }
      
      </div>
      <div className='font-bold'>
        Delivery Info
        </div>

        <h4>Value</h4>
        <div className='flex justify-between'>
          {giftCardsValue.map((card,i)=> {
            return  <Btn card={card} key={i} handleSetCard={handleSetCard} selectedCard={selectedCard} />
          })} 
         <div className='w-16 h-14rounded-lg relative border-2 rounded-lg'>  
         {disabled && <FontAwesomeIcon color='text-gray-100' icon={faPen} className='text-gray-600 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' onClick={()=> setDisabled(false)}/>  } 
            <input type='number' className='w-full h-full rounded-lg p-2' disabled={disabled} onChange={(e)=>handleValue(e)} />
            </div>
         </div>
         <div>
          <form className='flex flex-col gap-4 h-full '>
            {forms.map((input,i)=> {
                return <Input name={input.name} type={input.type} placeholder={input.placeholder} handleChange={handleChange} value={input.value} key={i} />
            })}
            <div className='w-full px-4 bg-gray-100 border-t-2  fixed bottom-0 left-0 h-24 flex items-center'>
              <button className='w-full  h-fit bg-amber-600 text-white p-4 rounded-lg flex justify-center font-bold text-lg cursor-pointer' onClick={handleConfirmation}>Send Gift</button>
            </div>
          </form>
              {/* Confirmation Popup card */}
           {showConfirmation ? <ConfirmationForm setIsModalOpen={setIsModalOpen} handleConfirmation={handleConfirmation}  handleChange={handleChange} forms={forms} selectedCard={selectedCard} formValues={formValues} defaultDate={defaultDate} setIsSuccess={setIsSuccess} setIsLoading={setIsLoading}/>: null} 
          </div>
 
  
</div>
    </div>
    
  )
}
