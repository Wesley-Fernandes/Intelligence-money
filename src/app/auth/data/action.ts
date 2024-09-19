import { formatISO, parseISO } from "date-fns";
import type { FormEvent } from "react";
import type { toast as TOAST } from "sonner";

interface Props{
    e:FormEvent,
    setLoading: (value: boolean) => void,
    operator: string,
    type: "PREJUIZO"|"LUCRO",
    toast: typeof TOAST
}
export const createNewData = async ({e, setLoading, operator, type, toast}:Props) =>{
    setLoading(true);
    e.preventDefault();
    const target = e.target as typeof e.target & {
      start: {value: string},
      end: {value: string},
    }

    const start = formatISO(parseISO(target.start.value));
    const end = formatISO(parseISO(target.end.value));

    if(!operator||!end||!type||!start){
      toast.error("Todos os campos são obrigatórios.")
      setLoading(false);
      return;
    }

    const request = await fetch('/api/auth/data', {
      method: "POST",
      body: JSON.stringify({start, end, operator, type}),
      headers: {'Content-Type': 'application/json'},
      credentials: "same-origin"
    });

    if(request.status!== 201){
      toast.error("Erro ao tentar cadastrar o registro.")
      setLoading(false);
      return;
    }
    
    toast.success("Registro cadastrado com sucesso.")
    setLoading(false);
    return;
  }