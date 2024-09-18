import { ArrowDown, ArrowUp } from 'lucide-react'

interface Props{
    type: "PREJUIZO"|"LUCRO"
}
export const Type = ({type}:Props) => {
  return (
    <>
      {type === "PREJUIZO" ? <ArrowDown size={12} className='mr-1 text-red-500'/>:<ArrowUp size={12} className='mr-1 text-green-500'/>}
    </>
  )
}
