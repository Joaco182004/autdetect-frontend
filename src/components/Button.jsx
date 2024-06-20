import React from 'react'

export default function Button({description, width, height,onClick}) {
  return (
    <button type='button' onClick={onClick}  className='rounded-md font-montserrat font-medium text-white bg-[rgb(7,27,253)]'style={{ width: `${width}px`, height: `${height}px` }}>{description}</button>
  )
}
