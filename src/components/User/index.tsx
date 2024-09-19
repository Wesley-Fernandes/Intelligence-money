'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card'
import { useRouter } from 'next/navigation'
import Logout from './Logout'
import { useEffect, useState } from 'react'
import { getUser } from './action'

interface USER {
    id: string;
    name: string;
}

export default function User() {
    const [user, setUser] = useState<USER | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const getUserData = async () => {
            try {
                const cachedUser = localStorage.getItem('cachedUser')
                if (cachedUser) {
                    setUser(JSON.parse(cachedUser))
                    setLoading(false)
                    return
                }

                const userData = await getUser()
                if (!userData) {
                    router.push('/404')
                    return
                }
                setUser(userData)
                localStorage.setItem('cachedUser', JSON.stringify(userData))
            } catch (error) {
                console.error("Failed to fetch user:", error)
            } finally {
                setLoading(false)
            }
        }

        getUserData()
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
                    <Logout />
                </CardFooter>
            </Card> 
        </div>
    )
}