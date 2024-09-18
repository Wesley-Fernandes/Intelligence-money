import type { ReactNode } from 'react'


interface Props{
  children: ReactNode
}
export const Container = ({children}:Props) => {
  return (
    <nav className='h-14 border-b flex items-center justify-between px-4'>
        <h1 className='font-black text-lg uppercase text-blue-500'>Intelligence</h1>
        {children}
    </nav>
  )
}
