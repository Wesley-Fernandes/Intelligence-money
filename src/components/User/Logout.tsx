"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';

export const Logout = () => {
    const {push} = useRouter()
    const [loading, setLoading] = useState(false)
    const logout =  async () =>{
        const request = await fetch("/api/auth/user", {method: "GET", credentials: "same-origin"});

        if(request.status !== 200){
            toast.error("Erro ao receber informações do usuario.")
            setLoading(false);
            return;
        }
        toast.success("Desconectado com sucesso!")
        setLoading(false);
        push("/")
        return
    }
  return (
    <Button variant="destructive" className='w-full' onClick={logout} disabled={loading}>
        {loading ? <LoaderCircle size={20}  className='animate-spin'/> : "Desconectar-se"}
    </Button>
  )
}
