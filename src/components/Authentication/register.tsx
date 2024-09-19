"use client"
import React, { type FormEvent } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react'

export function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const submiter = async (e:FormEvent)=>{
    e.preventDefault();
    setLoading(true);

    if(!password || !email||!username){
      toast.error("Email, Password e Username são obrigatórios.")
      return;
    }

    const request =  await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({email, password, username})
    })

    if(request.status !== 201){
      setLoading(false);
      toast.error("Erro ao tentar fazer login.")
      return;
    }

    setLoading(false);
    toast.success("Registro efetuado com sucesso.")
  }
  return (
    <form className='flex flex-col gap-1 border p-2 rounded-sm shadow-md bg-primary-foreground w-full' onSubmit={submiter}>
        <h1 className='font-black text-xl uppercase text-center py-4'>Criando sua conta</h1>
        <div>
          <Label htmlFor='username'>Nome de usuario:</Label>
          <Input type="text" placeholder="Nome do usuario" id='username' onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div>
          <Label htmlFor='email'>E-mail:</Label>
          <Input type="email" placeholder="email@email.com" id='password' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
          <Label htmlFor='password'>Password:</Label>
          <Input type="password" placeholder="*********" id='password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <hr className='my-2'/>

        <Button type="submit" className='mb-4' disabled={loading}>
          {loading ? <LoaderCircle size={20}  className='animate-spin'/> : "Continuar"}
        </Button>
    </form>
  )
}
