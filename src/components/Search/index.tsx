import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearch } from "@/store/search"
import { LoaderCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Search() {
  const {setParameters, loading} = useSearch();
  const closeButton = useRef<HTMLButtonElement|null>(null);
  const [date, setDate] = useState("")

  const changeParams = () => {
    setParameters(date)
  }
  useEffect(()=>{
    if(!loading){
      closeButton.current?.click();
    }
  }, [loading])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nova pesquisa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fazer pesquisa</DialogTitle>
          <DialogDescription>
            Preencha todos campos e clique em pesquisar...
          </DialogDescription>
        </DialogHeader>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-2">
              Ano e mês da pesquisa
            </Label>
            <Input
              id="name"
              type="month"
              onChange={(e)=>setDate(e.target.value)}
              defaultValue="Pedro Duarte"
              className="col-span-2"
            />
          </div>
        <DialogFooter>
          <Button onClick={changeParams} type="submit" disabled={loading}>
            {loading && <LoaderCircle className="animate-spin text-blue-400" />}
            {!loading && <span>Iniciar pesquisa</span>}
            
          </Button>
          <DialogClose className="hidden" ref={closeButton}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
