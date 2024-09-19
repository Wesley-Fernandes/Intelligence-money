"use client"
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export const Logout = () => {
    const {push} = useRouter()

    const jumper = () =>{
      push("/auth/logout")
    }
    return(
    <Button variant="destructive" className='w-full' onClick={jumper}>
        Desconectar-se
    </Button>
    )
}
