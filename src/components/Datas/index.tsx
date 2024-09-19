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
import { calculateAllDatas, toPrice } from '@/util/calculate'
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
          <TableCell colSpan={5}>Lucro</TableCell>
          <TableCell className="text-right text-green-500">LUCRO</TableCell>
        </TableRow>
        <TableRow className='bg-zinc-700 text-white hover:bg-zinc-800'>
          <TableCell colSpan={5}>Prejuizo</TableCell>
          <TableCell className="text-right text-red-500">PREJU</TableCell>
        </TableRow>
        <TableRow className='bg-zinc-700 text-white hover:bg-zinc-800'>
          <TableCell colSpan={5}>Restante</TableCell>
          <TableCell className="text-right text-blue-400">TOTAL</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
//calculate total {toPrice(calculateAllDatas(datas, "LUCRO")-calculateAllDatas(datas, "PREJUIZO"))}
//calculate gain {toPrice(calculateAllDatas(datas, "LUCRO"))} +
//calculate preju {toPrice(calculateAllDatas(datas, "PREJUIZO"))} 