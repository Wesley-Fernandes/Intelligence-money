"use client"
import React, { type FormEvent } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation';
export const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const {push} = useRouter();

  const submiter = async (e:FormEvent)=>{
    e.preventDefault();
    const request =  await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({email, password})
    })

    if(request.status !== 200){
      setLoading(false);
      alert("Erro ao tentar fazer login.")
      return;
    }
    const response = await request.json();

    localStorage.setItem("token", response.token);
    push("/auth")
  }
  return (
    <form onSubmit={submiter} className='flex flex-col gap-1 border p-2 rounded-sm shadow-md bg-primary-foreground w-full'>
        <h1 className='font-black text-xl uppercase text-center py-4'>Entrando na sua conta</h1>
        <Input type="email" placeholder="email@email.com" onChange={(e)=> (setEmail(e.target.value))}/>
        <Input type="password" placeholder="Password" onChange={(e)=> (setPassword(e.target.value))}/>
        <hr className='my-2'/>
        <Button type="submit" className='mb-4' disabled={loading}>Continuar</Button>
    </form>
  )
}
