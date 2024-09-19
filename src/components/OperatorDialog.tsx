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

  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import type { SetStateAction, Dispatch } from 'react'
import { Button } from "./ui/button";
import { Label } from "./ui/label"
import { operators } from "@/constant/operators"
  
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
                <Select onValueChange={(e)=>setOperator(e)}>
                <SelectTrigger className="w-[180px]" id='operator'>
                  <SelectValue placeholder="Selecione o operador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {operators.map((operador)=>(<SelectItem key={operador} value={operador}>{operador}</SelectItem>))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
  