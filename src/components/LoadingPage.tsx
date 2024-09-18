import { LoaderCircle } from 'lucide-react'
import React from 'react'

export const LoadingPage = () => {
  return (
    <main className='screen flex items-center justify-center'>
        <LoaderCircle className='animate-spin text-blue-500' />
    </main>
  )
}
