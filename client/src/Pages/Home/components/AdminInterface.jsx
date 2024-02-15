import React, {useState, useEffect} from 'react'
import axios from 'axios'
import getHost from '../../../customHooks/useUrl'
import AdminIcon from "../../../assets/img/admin.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
export default function AdminInterface() {
const [isValidatingOrder, setIsValidatingOrder] = useState(false)
const [isValidatingGiftCard, setIsValidatingGiftCard] = useState(false)
const [orderDisabled, setOrderDisabled] = useState(true)
const [giftCardDisabled, setGiftCardDisabled] = useState(true)
const [isOrderError, setIsOrderError] = useState(false)
// Order Id
const [orderId, setOrderId] = useState(null)
//  Gift Card code
const [giftCardCode, setGiftCardCode] = useState(null)
const [giftCardSuccess, setGiftCardSuccess]  = useState(false)
const [giftCardError, setGiftCardError] = useState(false)
const [isOrderSuccess, setIsOrderSuccess] = useState(false)
const [message, setMessage] = useState("")
const [giftCardMessage, setGiftCardMessage] = useState("")
const handleOrderChange = (e)=> {
    // reset the states
    setIsOrderError(false)
    setIsOrderSuccess(false)
    setOrderId(e.target.value)
        if (e.target.value >= 1 &&  e.target.value.toString().length === 6){
            
            setOrderDisabled(false)
        }
        else {
            setOrderDisabled(true)
        }
}

const handleGiftCardChange = (e)=> {
    // Reset GiftCard states
    setGiftCardError(false)
    setGiftCardSuccess(false)
    
    setGiftCardCode(e.target.value)
    if ( e.target.value.toString().length ===11){

    setGiftCardDisabled(false)
    }
    else {
       setGiftCardDisabled(true)
    }
}
    const handleValidateOrder = async (e)=> {
            e.preventDefault()
            setOrderDisabled(true)
            setIsValidatingOrder(true)
            
         
            const payload ={
                orderId: orderId
            }
           
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            try {

                const res = await axios.put(`${getHost()}/api/admin/order`, payload, config)
                setIsValidatingOrder(false)
                setIsOrderSuccess(true)
                
                setMessage(res.data.message)

            }
            catch(err){
                setIsValidatingOrder(false)
                setIsOrderError(true)
                setMessage(err?.response?.data?.err)
            }
    }

   

    const handleValidateGiftCard = async (e)=>{
        e.preventDefault()
    setGiftCardDisabled(true)
        setIsValidatingGiftCard(true)

        const payload = {
            giftCardCode: giftCardCode
        }
        const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        try {
             const res =  await axios.post(`${getHost()}/api/gift-card/validate`, payload, config)
                setGiftCardSuccess(true)
                setIsValidatingGiftCard(false)
                setGiftCardMessage(res.data.message)
            }
        catch (err) {
            setGiftCardError(true)
            setIsValidatingGiftCard(false)
            setGiftCardMessage(err.response.data.message)   
        }


    }

  return (
    <div className=' w-full h-screen flex flex-col gap-12  pt-20 items-center justify-center ' >
            <div>
               <div className='text-center text-3xl'>
               Hi, <span className='text-amber-600 font-bold'>
               Admin
                </span>
                </div> 
                <img className='max-h-48' src={AdminIcon} alt="icon"/>
            </div>
        <form onSubmit={handleValidateOrder}>
            <input onChange={handleOrderChange} className='bg-gray-200 h-full px-4 rounded-xl outline-none' type='number' placeholder='Order Id' name="orderId" />

                
                <button   disabled={orderDisabled} className={` ${isOrderSuccess? 'bg-green-500' : isOrderError? 'bg-red-500': orderDisabled? 'bg-gray-300':  'bg-amber-600 '} mx-[-20px] bg-amber-600 outline-none p-2 rounded-xl text-white`}>
                {isValidatingOrder?
                <div class={`border-gray-300 h-4 w-4 animate-spin rounded-full border-2 border-t-amber-600`} />
                :
               
                
                    isOrderError || isOrderSuccess?
                    message
                    :
                    <>
                      process order
                    </>

            
               
                
                
                }
                
                </button>
        </form>
        <form onSubmit={handleValidateGiftCard}>
            <input onChange={handleGiftCardChange} className='bg-gray-200 h-full px-4 rounded-xl outline-none' type='text' placeholder='Giftcard Id' name="orderId" />

                <button disabled={giftCardDisabled} className={`${giftCardSuccess? 'bg-green-500' : giftCardError ? 'bg-red-500': giftCardDisabled? 'bg-gray-300' :'bg-amber-600 '} mx-[-20px]  bg-amber-600 p-2 rounded-xl text-white`}>
                  {
                    isValidatingGiftCard?
                    <div class="border-gray-300 h-4 w-4 animate-spin rounded-full border-2 border-t-amber-600" />
                    :
                        giftCardError || giftCardSuccess?
                        giftCardMessage
                    :
                    <>
                    
                    validate giftcard
                    </>
                  }
                  
                </button>
        </form>
    </div>
  )
}
