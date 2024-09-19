"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState, type FormEvent } from 'react'
import { operators } from './operators'
import { createNewData } from './action'
import { toast } from 'sonner'


export default function Page() {
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<"PREJUIZO"|"LUCRO">("LUCRO");
  const [operator, setOperator] = useState("");

  const handleSubmit = async (e:FormEvent) =>{
    await createNewData({e, operator,setLoading, type, toast})
  }

  return (
    <main className='screen bg-gray-100 flex items-center justify-center'>
      <Card className='w-80'>
        <CardHeader>
          <CardTitle>Novo registro</CardTitle>
          <CardDescription>Preencha todas informações</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} method="post" className='flex flex-col gap-2'>
            <div>
              <Label htmlFor="start" className='flex items-center justify-between gap-10'>
                <span>Inicio:</span>
                <Input type="datetime-local" id="start" name="start" required />
              </Label>
            </div>
            <div>
              <Label htmlFor="end" className='flex items-center justify-between gap-[3.2rem]'>
                <span>Fim:</span>
                <Input type="datetime-local" id="end" name="end" required />
              </Label>
            </div>
            <div>
              <Label htmlFor="operator" className='flex items-center justify-between gap-[1rem]'>
                <span>Operador:</span>
                <Select onValueChange={(e)=>setOperator(e)}>
                <SelectTrigger className="w-[180px]" id='operator'>
                  <SelectValue placeholder="Selecione o operador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {operators.map((operador)=>(<SelectItem key={operador} value={operador}>{operador}</SelectItem>))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              </Label>
            </div>
            <div>
              <Label htmlFor="types" className='flex items-center justify-between gap-[1rem]'>
                <span>Tipos:</span>
                <Select onValueChange={(e)=>setType(e as "PREJUIZO"|"LUCRO")}>
                <SelectTrigger className="w-[180px]" id='types'>
                  <SelectValue placeholder="Selecione o tipo"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Obteve:</SelectLabel>
                    <SelectItem value="LUCRO">Lucro</SelectItem>
                    <SelectItem value="PREJUIZO">Prejuizo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              </Label>
            </div>
            <hr />
            <Button disabled={loading}>Continuar</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
