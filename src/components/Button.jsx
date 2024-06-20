import React from 'react'

export default function Button({description, width, height,onClick, type}) {
  return (
    <button type='button' onClick={onClick}  className={`mb-4 rounded-md font-montserrat font-medium text-white ${type === 'primary' ? 'bg-[rgb(7,27,253)]' : 'bg-[rgb(170,170,170)]'}`}style={{ width: `${width}px`, height: `${height}px` }}>{description}</button>
  )
}
