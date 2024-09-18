"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Data } from '@/store/search'
import { Info } from 'lucide-react'
import { DateFormat } from '@/util/time'
import { calculateData, toPrice } from '@/util/calculate'
import { LoadingPage } from '@/components/LoadingPage'
import { NotFoundData } from '@/components/NotFoundData'

export default function Page({params:{id}}:{params: {id: string}}) {
  const [data, setData] = useState<Data|null>(null)
  const [loading, setLoading] = useState(true)
  const {back} = useRouter()

  useEffect(()=>{
    const getData = async () =>{
      const request = await fetch(`/api/auth/data/${id}`, {method: 'GET', credentials: "same-origin"});
      const response = await request.json();
      setData(response);
      setLoading(false);
    }

    getData()
  },[id])


  const deleteData = async()=>{
    if(!window.confirm('Deseja excluir esse registro?')){
      return;
    }
    const request = await fetch(`/api/auth/data/${id}`, {method: 'DELETE', credentials: "same-origin"});
    if(request.status === 201){
      back()
    }else{
      alert("Erro ao tentar excluir o registro.")
    }
  }

  if(loading){
    return <LoadingPage/>
  }

  if(!data){
    return(
      <main className='screen'>
        <NotFoundData/>
      </main>
    )
  }

  return (
    <main className='screen bg-gray-100 flex items-center justify-center'>
      <Card className='w-80'>
        <CardHeader>
          <CardTitle className='border p-1 w-fit rounded-xl flex items-center gap-1'>
            <Info size={18} strokeWidth={1}/> <span className='font-light'>{id}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between hover:bg-blue-500/20 hover:cursor-pointer'>
              <span  className='font-bold'>Criado em:</span>
              <span>{DateFormat(data.createdAt)}</span>
            </div>
            <div className='flex items-center justify-between hover:bg-blue-500/20 hover:cursor-pointer'>
              <span  className='font-bold'>Inicio:</span>
              <span>{DateFormat(data.start)}</span>
            </div>
            <div className='flex items-center justify-between hover:bg-blue-500/20 hover:cursor-pointer'>
              <span className='font-bold'>Fim:</span>
              <span>{DateFormat(data.end)}</span>
            </div>
            <div className='flex items-center justify-between hover:bg-blue-500/20 hover:cursor-pointer'>
              <span className='font-bold'>Você fez para:</span>
              <span>{data.operator}</span>
            </div>
            <div className='flex items-center justify-between hover:bg-blue-500/20 hover:cursor-pointer'>
              <span className='font-bold'>Você obteve:</span>
              {data.type === "LUCRO" ? <span className='text-green-600 font-bold'>LUCRO</span>:<span className='text-red-600 font-bold'>PREJUIZO</span>}
            </div>
            <div className='flex items-center justify-between hover:bg-blue-500/20 hover:cursor-pointer'>
              <span className='font-bold'>Valor total:</span>
              <span>{toPrice(calculateData(data))}</span>
            </div>
            <hr className='my-3'/>
            <div className='flex items-center justify-between'>
              <Button variant="outline" onClick={back}>Voltar</Button>
              <Button variant="destructive" onClick={deleteData}>Deletar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
