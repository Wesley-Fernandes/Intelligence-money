import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { Register } from './register'
import {Login} from './login'

export const AuthenticationMethods = () => {
  return (
    <Tabs defaultValue="login" className="w-80">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Registrar</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Login/>
      </TabsContent>
      <TabsContent value="register">
        <Register/>
      </TabsContent>
    </Tabs>
  )
}
