"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import type { SetStateAction, Dispatch } from 'react'
import { Button } from "./ui/button";
import { Label } from "./ui/label"
import { Input } from "./ui/input";
  
interface Props{
    setOperator: Dispatch<SetStateAction<string>>
    operator: string;
}
export const OperatorDialog = ({setOperator, operator}:Props) => {



    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline">{operator||"Selecionar o operador"}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Selecione o operador</AlertDialogTitle>
            <div>
              <Label htmlFor="operator" className='flex items-center justify-between gap-[1rem]'>
                <span>Operador:</span>
                <Input placeholder="Digite o nome do operador..." onChange={(e)=>setOperator(e.target.value)}/>
              </Label>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Concluir</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    )
  }
  