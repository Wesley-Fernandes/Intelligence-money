import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Data } from './Data'
import { calculateAllDatas, ConvertToMoney, toPrice } from '@/util/calculate'
import type { Data as DATA } from '@/store/search'
  


export default function Datas({datas}: {datas: DATA[]}) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
              <TableHead>Inicio</TableHead>
              <TableHead>Operador</TableHead>
              <TableHead>Horas</TableHead>
              <TableHead> </TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="text-right">Opção</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
              datas.map(data => (
                <Data key={data.id} data={data} />
              ))
            }
        </TableBody>
        <TableFooter>
        <TableRow className='bg-zinc-700 text-white hover:bg-zinc-800'>
          <TableCell colSpan={4}>Lucro</TableCell>
          <TableCell colSpan={2} className="text-right text-green-500">{ConvertToMoney(calculateAllDatas(datas, "LUCRO"))}</TableCell>
        </TableRow>
        <TableRow className='bg-zinc-700 text-white hover:bg-zinc-800'>
          <TableCell colSpan={4}>Prejuizo</TableCell>
          <TableCell colSpan={2} className="text-right text-red-500">{ConvertToMoney(calculateAllDatas(datas, "PREJUIZO"))}</TableCell>
        </TableRow>
        <TableRow className='bg-zinc-700 text-white hover:bg-zinc-800'>
          <TableCell colSpan={4}>Restante</TableCell>
          <TableCell colSpan={2} className="text-right text-blue-400">{ConvertToMoney(calculateAllDatas(datas, "LUCRO")-calculateAllDatas(datas, "PREJUIZO"))}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
