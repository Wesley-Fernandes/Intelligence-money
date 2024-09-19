import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card'
import { notFound} from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import Logout from './Logout';


interface USER{
    id: string;
    name: string;
}


import React from 'react'


export const User = () => {
    
    const [user, setUser] = useState<USER|null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getUser =  async () =>{
            const request = await fetch("/api/auth/user", {method: "GET", credentials: "same-origin"});
    
            if(request.status !== 200){
                return notFound();
            }
    
            const response = await request.json()
            setUser(response)
            setLoading(false)
            return
        }

        getUser()
    }, [])

  return (
    <div className='flex flex-1 items-end'>
        <Card className='min-h-24 h-fit w-full'>
            {
                loading ? <LoaderCircle className='animate-spin text-blue-500' /> :(
                    <>
                        <CardHeader>
                            <CardTitle>{user?.name}</CardTitle>
                            <CardDescription className='text-xs'>{user?.id}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Logout/>
                        </CardFooter>
                    </>
                )
            }
        </Card>
    </div>
  )
}
