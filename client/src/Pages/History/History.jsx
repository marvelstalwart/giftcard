import React, {useState, useEffect} from 'react'
import axios from "axios"
import getHost from '../../customHooks/useUrl'
export default function History() {
const [orders, setOrders] = useState(null)



useEffect(()=> {
    const token = localStorage.getItem('token')
    if (token) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get(`${getHost()}/api/auth/user/orders`, config).then((res)=> {
                setOrders(res.data)
        })
        .catch((err)=>{
            console.log(err.response)
        })
    }

   
       
},[])

  return (
    <div className='pt-20'>
        
        <div className='font-bold text-2xl py-4 px-4'>Order History</div>
        <div className='p-4 '> 

        <div className='bg-gray-100 h-[35rem] rounded-lg overflow-y-auto shadow-md p-2'>
        <table className='w-full  overflow-x-auto'>
            <thead>
                <tr className='text-sm  '>
                    <th className='min-w-24'>STATUS</th>
                    <th className='min-w-24'>ORDER NO</th>
                    <th className='min-w-24'>QUANTITY</th>
                    <th className='min-w-24'>METHOD</th>
                    <th className='min-w-24'>AMOUNT</th>
                    <th className='min-w-24'>DATE</th>
                </tr>
            </thead>
            <tbody>
                    {
                        
                        orders &&   orders.map((order, i)=> {
                                    return <tr className='text-sm text-center'>
                                        <td className={`${order.giftCardId.status === 'completed' ? 'text-green-500 font-bold':'text-amber-600'}`}>
                                                {order.giftCardId.status}
                                                
                                        </td>
                                        <td>
                                                {order.orderId}
                                        </td>
                                        <td> 
                                                1
                                        </td>
                                        <td>
                                               Bank Transfer
                                        </td>
                                        <td>
                                                {'₦' + order.amount}
                                        </td>
                                        <td>
                                                {order.giftCardId.date}
                                        </td>
                                    </tr>
                            })
                    }
            </tbody>
        </table>


        </div>

        </div>
        
        </div>


  )
}
