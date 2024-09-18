import Image from 'next/image'
import React from 'react'

export const NotFoundData = () => {
  return (
    <section className='flex-1 flex flex-col items-center justify-center'>
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <Image src='/nothing.webp' alt='Data not found' width={360} height={360} priority fill/>
        <span className='font-black text-center uppercase text-2xl text-blue-500'>sem dados</span>
      </div>
    </section>
  )
}
