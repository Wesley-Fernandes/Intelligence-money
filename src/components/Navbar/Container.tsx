"use client"
import type { ReactNode } from 'react'


interface Props{
  children: ReactNode
}
export const Container = ({children}:Props) => {
  return (
    <nav className='h-14 border-b flex items-center justify-between px-2'>
        {/* biome-ignore lint/a11y/useAltText: <explanation> */}
        <img src="/icon.png" className='w-12 h-12'/>
        {children}
    </nav>
  )
}
