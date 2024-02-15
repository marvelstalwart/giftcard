import React from 'react'

export default function GiftCard({selectedCard}) {

  return (
    <div className={`w-full h-48  rounded-xl relative  ${selectedCard.amount === 10 || selectedCard.amount ===100? 'text-black' :'text-white' }`}>
      <div className=' absolute w-full h-full overflow-hidden rounded-xl bg-slate-800 bg-opacity-10 flex flex-col justify-end p-5'>
       
        <div>

        <div className=' text-xs'>Amount</div>
        <div className={`relative font-bold flex gap-4 `}><div className=' absolute top-0 left-0 font-bold '>₦</div><div className='ml-2 text-3xl'>{selectedCard.amount + "K"}</div></div>

          </div>
        
      </div>
      <img src={selectedCard.img} alt='giftcard' className='h-full w-full rounded-xl'/>
    </div>
  )
}
