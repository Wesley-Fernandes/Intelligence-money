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
import { useRouter } from "next/navigation"
import React, { useState } from 'react'
import { Button } from "./ui/button";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
  
interface Props{
    id: number;
}
export const DeleteDialog = ({id}:Props) => {
    const [loading, setLoading] = useState<boolean>(false)

    const {back} = useRouter();


    const handleDelete = async () => {
        setLoading(true);
        const request = await fetch(`/api/auth/data/${id}`, {method: 'DELETE', credentials: "same-origin"});
        if(request.status !== 201){
            toast.error("Erro ao tentar excluir o registro.")
            setLoading(false);
            return;
        }
        toast.success(`Arquivo: ${id} excluido.`)
        back()
        return;
    }
    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="destructive">Deletar</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Arquivo {id}</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir o arquivo {id}. Essa ação não pode ser desfeita. Você têm certeza?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
            <Button disabled={loading} onClick={handleDelete}>
                {loading  ? <LoaderCircle className='animate-spin text-blue-500' /> : "Continuar"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    )
  }
  