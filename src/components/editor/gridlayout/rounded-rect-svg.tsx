import React from "react"

export const RoundedRectangleSVG = () => {
  return (
    <div className='flex w-full justify-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100'
        height='10'
        viewBox='0 0 80 10'
        fill='none'
        className='x-drag-handle cursor-move'
      >
        <rect width='80' height='10' rx='5' ry='5' fill='#6962D2' />
        <circle cx='30' cy='5' r='3' fill='white' />
        <circle cx='40' cy='5' r='3' fill='white' />
        <circle cx='50' cy='5' r='3' fill='white' />
      </svg>
    </div>
  )
}
