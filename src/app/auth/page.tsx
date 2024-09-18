"use client"
import Datas from '@/components/Datas'
import { LoadingPage } from '@/components/LoadingPage';
import { NotFoundData } from '@/components/NotFoundData';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [ data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const getData = async () =>{
      const token = localStorage.getItem('token');
      if(!token){
        return setData([])
      }

      const request = await fetch('/api/auth/data', {method: "GET", headers: {'Content-Type': 'application/json', authorization: token}});
      const response = await request.json();
      setData(response)
      setLoading(false);
      return;
    }

    getData();
  }, [])

  if(loading){
    return <LoadingPage/>
  }

  if(loading===false && data.length === 0){
    return (
      <main className='screen flex flex-col'>
        <NotFoundData/>
      </main>
  )
  }

  return (
    <main>
      <Datas datas={data}/>
    </main>
  )
}
