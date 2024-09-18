"use client"
import Datas from '@/components/Datas'
import { LoadingPage } from '@/components/LoadingPage';
import { NotFoundData } from '@/components/NotFoundData';
import { Search } from '@/components/Search';
import { useSearch } from '@/store/search'
import { useEffect } from 'react'

export default function page() {
  const {parameters, datas, setData, setLoading, loading} = useSearch();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(()=>{
    const getData = async () =>{
      setLoading(true);
      const request = await fetch(`/api/auth/query?date=${parameters}`, {credentials: "same-origin"});
      const response = await request.json()
      if(request.status===200){
        setData(response)
        setLoading(false);
        return;
      }
      setData([])
      setLoading(false);
      return;
    }

    if(parameters){
      getData();
    }
  },[parameters])

  if(loading){
    return  <LoadingPage/>
  }

  if(!loading && datas.length === 0){
    return (
      <main className='screen flex flex-col'>
        <header className='h-14 flex items-center px-4'>
          <Search />
        </header>
        <NotFoundData/>
    </main>
  )
  }
  return (
    <main>
      <header className='h-14 flex items-center px-4'>
        <Search />
      </header>
      <Datas datas={datas}/>
    </main>
  )
}
