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
  
interface Props{
    setType: Dispatch<SetStateAction<"LUCRO"|"PREJUIZO"|null>>
    type: "LUCRO"|"PREJUIZO"|null;
}
export const TypeDialog = ({setType, type}:Props) => {



    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline">{type||"Selecionar o tipo"}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Selecione o tipo</AlertDialogTitle>
            <div>
              <Label htmlFor="operator" className='flex items-center justify-between gap-[1rem]'>
                <span>Tipo:</span>
                <Select onValueChange={(e)=>setType(e as "LUCRO"|"PREJUIZO")}>
                <SelectTrigger className="w-[180px]" id='operator'>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem key="LUCRO" value="LUCRO">LUCRO</SelectItem>
                    <SelectItem key="PREJUIZO" value="PREJUIZO">PREJUIZO</SelectItem>
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
  