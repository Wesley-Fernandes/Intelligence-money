"use client"
import { Button } from '../ui/button';
import React from 'react'
import { logout } from './action';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    router.push("/")
  }
  return (
    <form className='w-full' action={handleLogout}>
      <Button variant="destructive" type='submit' className='w-full'>
        Desconectar-se
      </Button>
    </form>
  )
}


