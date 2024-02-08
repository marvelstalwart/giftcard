import React from 'react'

export default function Input (props) {
    const {name, type, placeholder, value, handleChange, disabled} = props
  return (
    <input className='border-2 w-full rounded-lg p-4 bg-gray-100 outline-none' name={name} type={type} placeholder={placeholder} defaultValue={value} onChange={handleChange} required disabled={disabled? disabled: false}/>
  )
}
