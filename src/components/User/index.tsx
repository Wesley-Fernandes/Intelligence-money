'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card'
import { useRouter } from 'next/navigation'
import Logout from './Logout'
import { useEffect, useState } from 'react'

interface USER {
    id: string;
    name: string;
}

export default function User() {
    const [user, setUser] = useState<USER | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const request = await fetch("/api/auth/user", {
                    method: "GET",
                    credentials: "same-origin",
                    cache: "no-store"
                });
                if (request.status !== 200) {
                    router.push('/404')
                    return
                }
                const response = await request.json() as USER
                setUser(response)
            } catch (error) {
                console.error("Failed to fetch user:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [router])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return null
    }

    return (
        <div className='flex flex-1 items-end'>
            <Card className='min-h-24 h-fit w-full'>
                <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription className='text-xs'>{user.id}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Logout/>
                </CardFooter>
            </Card> 
        </div>
    )
}