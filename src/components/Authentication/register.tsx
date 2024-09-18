import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export function Register() {
  return (
    <form className='flex flex-col gap-1 border p-2 rounded-sm shadow-md bg-primary-foreground w-full'>
        <h1 className='font-black text-xl uppercase text-center py-4'>Criando sua conta</h1>
        <div>
          <Label htmlFor='username'>Nome de usuario:</Label>
          <Input type="text" placeholder="Nome do usuario" id='username'/>
        </div>
        <div>
          <Label htmlFor='email'>E-mail:</Label>
          <Input type="email" placeholder="email@email.com" id='password'/>
        </div>
        <div>
          <Label htmlFor='password'>Password:</Label>
          <Input type="password" placeholder="*********" id='password'/>
        </div>
        <hr className='my-2'/>
        <Button type="submit" className='mb-4'>Continuar</Button>
    </form>
  )
}
