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
import { formatISO, parseISO } from 'date-fns'


export default function Page() {
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<"PREJUIZO"|"LUCRO">("LUCRO");
  const [operator, setOperator] = useState("");

  const handleSubmit = async (e:FormEvent) =>{
    setLoading(true);
    e.preventDefault();
    const target = e.target as typeof e.target & {
      start: {value: string},
      end: {value: string},
    }

    const start = formatISO(parseISO(target.start.value));
    const end = formatISO(parseISO(target.end.value));

    if(!operator||!end||!type||!start){
      toast.error("Todos os campos são obrigatórios.")
      setLoading(false);
      return;
    }

    const request = await fetch('/api/auth/data', {
      method: "POST",
      body: JSON.stringify({start, end, operator, type}),
      headers: {'Content-Type': 'application/json'},
      credentials: "same-origin"
    });

    if(request.status!== 201){
      toast.error("Erro ao tentar cadastrar o registro.")
      setLoading(false);
      return;
    }
    
    toast.success("Registro cadastrado com sucesso.")
    setLoading(false);
    return;

  }

  return (
    <main className='screen bg-gray-100 flex items-center justify-center'>
      <Card className='w-80'>
        <CardHeader>
          <CardTitle>Novo registro</CardTitle>
          <CardDescription>Preencha todas informações</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} method="post" className='flex flex-col gap-4'>
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
            <div className='mb-4'>
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
            <Button disabled={loading} className='mt-4'>Continuar</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
