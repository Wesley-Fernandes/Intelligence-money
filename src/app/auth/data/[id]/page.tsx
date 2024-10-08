"use client"
import type { Data } from '@/store/search'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import { ConvertDate} from '@/util/time'
import { ConvertToMoney } from '@/util/calculate'
import { LoadingPage } from '@/components/LoadingPage'
import { NotFoundData } from '@/components/NotFoundData'
import { DeleteDialog } from '@/components/DeleteDialog'

export default function Page({params:{id}}:{params: {id: string}}) {
  const [data, setData] = useState<Data|null>(null)
  const [loading, setLoading] = useState(true)
  const {back} = useRouter()

  useEffect(()=>{
    const getData = async () =>{
      const request = await fetch(`/api/auth/data/${id}`, {method: 'GET', credentials: "same-origin"});
      const response = await request.json();
      if(request.status!==200){
        setData(null)
        setLoading(false);
        return;
      }
      setData(response);
      console.log(response)
      setLoading(false);
    }

    getData()
  },[id])


  if(loading){
    return <LoadingPage/>
  }

  if(!data){
    return(
      <main className='screen flex'>
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
              <span>{ConvertDate(data.created_at)}</span>
            </div>
            <div className='flex items-center justify-between hover:bg-blue-500/20 hover:cursor-pointer'>
              <span  className='font-bold'>Inicio:</span>
              <span>{ConvertDate(data.startTime)}</span>
            </div>
            <div className='flex items-center justify-between hover:bg-blue-500/20 hover:cursor-pointer'>
              <span className='font-bold'>Fim:</span>
              <span>{ConvertDate(data.endTime)}</span>
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
              <span className='font-bold'>Quantidade de tempo:</span>
              <span>{data.quantity}</span>
            </div>
            <div className='flex items-center justify-between hover:bg-blue-500/20 hover:cursor-pointer'>
              <span className='font-bold'>Valor total:</span>
              <span>{ConvertToMoney(data.price)}</span>
            </div>
            <hr className='my-3'/>
            <div className='flex items-center justify-between'>
              <Button variant="outline" onClick={back}>Voltar</Button>
              <DeleteDialog id={data.id}/>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
