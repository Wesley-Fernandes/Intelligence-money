import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import React from 'react'
import { Button } from "../ui/button"
import { AlignJustify, ArrowBigDownDash, CalendarSearch, FilePlus } from "lucide-react"
import Link from "next/link"
import User from "../User"

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <AlignJustify strokeWidth={1} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="border-b pb-2">
          <SheetTitle>MENU</SheetTitle>
        </SheetHeader>
        <ul>
          <li>
            <Link href="/auth" className="flex items-center py-1 gap-1 hover:text-blue-500">
              <ArrowBigDownDash strokeWidth={1} size={16}/>
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link href="/auth/data" className="flex items-center py-1 gap-1 hover:text-blue-500">
              <FilePlus strokeWidth={1} size={16}/>
              <span>Adicionar</span>
            </Link>
          </li>
          <li>
            <Link href="/auth/search" className="flex items-center py-1 gap-1 hover:text-blue-500">
              <CalendarSearch strokeWidth={1} size={16}/>
              <span>Procurar</span>
            </Link>
          </li>
        </ul>
        <User/>
      </SheetContent>
    </Sheet>

  )
}
