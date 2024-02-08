import React from 'react'

export default function MinatureCard({giftcard, selected, handleSetCard}) {
  return (

    <div onClick={()=> handleSetCard(giftcard)} className={`border-2 p-2 rounded-xl ${selected ? "border-sky-200" : undefined}`}>

          <div className=' w-14 h-10  rounded-xl relative'>
          <div className=' absolute w-full h-full overflow-hidden rounded-xl  flex flex-col justify-end px-1'>
          
            <div>

{/*       
            <div className='relative text-white font-bold flex gap-4  items-center'><div className=' absolute top-0 left-0 font-bold '>$</div><div className='ml-2 text-sm'>{giftcard.amount}</div></div> */}

              </div>
          </div>
            <img alt='gift-card' src={giftcard.img} className='h-full w-full rounded-xl'/>
        </div>

    </div>
  )
}
