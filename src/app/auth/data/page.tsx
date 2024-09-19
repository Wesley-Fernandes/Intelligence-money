"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { formatISO, parseISO } from 'date-fns'
import { OperatorDialog } from '@/components/OperatorDialog'
import { TypeDialog } from '@/components/TypeDialog'


export default function Page() {
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<"PREJUIZO"|"LUCRO"|null>(null);
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
                <OperatorDialog operator={operator} setOperator={setOperator}/>
              </Label>
            </div>
            <div className='mb-4'>
              <Label htmlFor="types" className='flex items-center justify-between gap-[1rem]'>
                <span>Tipos:</span>
                <TypeDialog setType={setType} type={type}/>
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
