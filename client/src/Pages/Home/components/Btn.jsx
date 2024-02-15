import React from 'react'

export default function Btn({card, handleSetCard, selectedCard}) {
  return (
    <button onClick={()=>handleSetCard(card)} className={`w-16 h-14  border-2 rounded-lg font-bold py-2 px-4  border-black border-opacity-5 flex justify-center items-center ${card.amount === selectedCard?.amount? ' border-sky-500 border-opacity-100 text-sky-600' : 'text-gray-600'}`}>{ '₦' + card.amount + "K"}</button>
  )
}
