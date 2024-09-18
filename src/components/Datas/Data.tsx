import React from 'react'
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"

import { buttonVariants } from '../ui/button'
import { Ellipsis } from 'lucide-react'
import { DateBrFormat, formatTime } from '@/util/time'
import { Type } from './Arrow'
import { calculateData, toPrice } from '@/util/calculate'
import type { Data as DATA} from '@/store/search'
import Link from 'next/link'

export const Data = ({data}:{data:DATA}) => {
  return (
    <TableRow>
        <TableCell>{DateBrFormat(data.start)}</TableCell>
        <TableCell>{data.operator}</TableCell>
        <TableCell>{formatTime(data)}</TableCell>
        <TableCell className='flex items-center justify-start'>
          <Type type={data.type}/>
        </TableCell>
        <TableCell>{toPrice(calculateData(data))}</TableCell>
        <TableCell className="flex justify-end">
          <Link href={`/auth/data/${data.id}`} className={buttonVariants({size:"icon", variant: "outline"})}>
            <Ellipsis strokeWidth={1} />
          </Link>
        </TableCell>
    </TableRow>
  )
}
