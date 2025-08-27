import React from 'react'

const Button = ({children, className}: {children: React.ReactNode, className: string}) => {
  return (
    <button
  className={`relative z-0 flex items-center gap-2 overflow-hidden  border-[1px] 
        border-[#f99d32] px-4 py-2 font-semibold
        uppercase text-neutral-900 transition-all duration-500
        
        before:absolute before:inset-0
        before:-z-10 before:translate-x-[0%]
        before:translate-y-[0%] before:scale-[2.5]
        before:rounded-[100%] before:bg-[#f99d32]
        before:transition-transform before:duration-1000
        before:content-[&quot;&quot;]

        hover:scale-105 hover:text-[#f99d32]
        hover:before:translate-x-[150%]
        hover:before:translate-y-[150%]
        active:scale-95 ${className}`}>
  <span>{children}</span>
</button>
  )
}

export default Button
