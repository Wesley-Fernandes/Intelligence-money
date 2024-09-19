import React from 'react'
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"

import { buttonVariants } from '../ui/button'
import { Ellipsis } from 'lucide-react'
import { Type } from './Arrow'
import { ConvertDate } from '@/util/time'
import { ConvertToMoney } from '@/util/calculate'
import type { Data as DATA} from '@/store/search'
import Link from 'next/link'

export const Data = ({data}:{data:DATA}) => {
  return (
    <TableRow>
        <TableCell>{ConvertDate(data.startTime)}</TableCell>
        <TableCell>{data.operator}</TableCell>
        <TableCell>{data.quantity}</TableCell>
        <TableCell className='flex items-center justify-start'>
          <Type type={data.type}/>
        </TableCell>
        <TableCell>{ConvertToMoney(data.price)}</TableCell>
        <TableCell className="flex justify-end">
          <Link href={`/auth/data/${data.id}`} className={buttonVariants({size:"icon", variant: "outline"})}>
            <Ellipsis strokeWidth={1} />
          </Link>
        </TableCell>
    </TableRow>
  )
}
