import React from 'react'

export const Badge = (props) => {
  return (
    <span className='bg-primary px-4 py-1 rounded-full border text-white'>{props.value}</span>
  )
}
